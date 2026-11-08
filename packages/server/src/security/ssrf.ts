import dns from "node:dns/promises";
import ipaddr from "ipaddr.js";
export async function assertPublicHttpUrl(raw: string): Promise<URL> {
  const url = new URL(raw);
  if (!["http:","https:"].includes(url.protocol)) throw new Error("Only HTTP and HTTPS URLs are allowed.");
  if (url.username || url.password) throw new Error("URL credentials are not allowed.");
  if (url.port && !["80","443"].includes(url.port)) throw new Error("Only ports 80 and 443 are allowed.");
  const host = url.hostname.replace(/\.$/,"").toLowerCase();
  if (host === "localhost" || host.endsWith(".localhost") || host.endsWith(".local")) throw new Error("Local network destinations are blocked.");
  const check = (ip: string) => { if (ipaddr.parse(ip).range() !== "unicast") throw new Error("Private and reserved IP ranges are blocked."); };
  if (ipaddr.isValid(host)) check(host);
  else { const records = await dns.lookup(host,{all:true,verbatim:true}); if (!records.length) throw new Error("Hostname did not resolve."); for (const r of records) check(r.address); }
  return url;
}