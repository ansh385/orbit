import { describe, expect, it } from "vitest";
import { reviewCode, analyzeError } from "./dev.js";
import { planWebsite, specComponent } from "./studio.js";
import { assertPublicHttpUrl } from "../security/ssrf.js";
describe("ORBIT Dev",()=>{
 it("finds hard-coded credentials and eval",()=>{const r=reviewCode('const api_key = "super-secret-token";\neval(input);',"js");expect(r.findings.some(f=>f.rule==="hardcoded-secret")).toBe(true);expect(r.findings.some(f=>f.rule==="dynamic-eval")).toBe(true);});
 it("maps common errors",()=>{expect(analyzeError("ECONNREFUSED").recommendedActions.length).toBeGreaterThan(0);});
});
describe("ORBIT Studio",()=>{
 it("plans website pages",()=>{const r=planWebsite({name:"Portfolio",purpose:"Show work",audience:"Recruiters",pages:["home"]});expect(r.pages[0].sections).toContain("Hero and primary action");});
 it("specifies accessible components",()=>{expect(specComponent({name:"Button",purpose:"Submit"}).accessibility.length).toBeGreaterThan(0);});
});
describe("SSRF guard",()=>{
 it("blocks localhost",async()=>{await expect(assertPublicHttpUrl("http://localhost:3000")).rejects.toThrow();});
 it("blocks private IP literals",async()=>{await expect(assertPublicHttpUrl("http://192.168.1.1")).rejects.toThrow();});
});