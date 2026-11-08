import { useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight, Check, CircleAlert, Code2, Command, FolderKanban, Layers3,
  ListTodo, LoaderCircle, LockKeyhole, Palette, Plus, RefreshCw, Settings2,
  Workflow, Zap
} from "lucide-react";

type Project = { id: string; name: string; description: string; task_count: number; created_at: string };
type Task = { id: string; title: string; description: string; status: string; priority: string; project_id: string | null };
type Overview = { projects: number; tasks: number; completedTasks: number; workflows: number };

const api = async (path: string, token: string, options: RequestInit = {}) => {
  const response = await fetch(path, { ...options, headers: {
    "Content-Type": "application/json", "Authorization": `Bearer ${token}`, ...(options.headers ?? {})
  }});
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error ?? `Request failed (${response.status})`);
  return data;
};

export default function App() {
  const [token, setToken] = useState(sessionStorage.getItem("orbit-token") ?? "");
  const [tokenInput, setTokenInput] = useState("");
  const [overview, setOverview] = useState<Overview | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [projectName, setProjectName] = useState("");
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState("");
  const [active, setActive] = useState("Overview");

  const load = async () => {
    if (!token) return;
    setLoading(true); setError("");
    try {
      const [o, p, t] = await Promise.all([api("/api/overview", token), api("/api/projects", token), api("/api/tasks", token)]);
      setOverview(o); setProjects(p); setTasks(t);
    } catch (e) { setError(e instanceof Error ? e.message : "Could not load ORBIT."); }
    finally { setLoading(false); }
  };
  useEffect(() => { void load(); }, [token]);
  const completed = useMemo(() => tasks.filter(t => t.status === "done").length, [tasks]);
  const connect = () => {
    if (tokenInput.trim().length < 32) { setError("Enter the ORBIT API token (at least 32 characters)."); return; }
    sessionStorage.setItem("orbit-token", tokenInput.trim()); setToken(tokenInput.trim());
  };
  const addProject = async (e: React.FormEvent) => {
    e.preventDefault(); if (!projectName.trim()) return;
    try { await api("/api/projects", token, { method: "POST", body: JSON.stringify({ name: projectName }) }); setProjectName(""); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Project creation failed."); }
  };
  const addTask = async (e: React.FormEvent) => {
    e.preventDefault(); if (!taskTitle.trim()) return;
    try { await api("/api/tasks", token, { method: "POST", body: JSON.stringify({ title: taskTitle, projectId: selectedProject || undefined }) }); setTaskTitle(""); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Task creation failed."); }
  };
  const completeTask = async (task: Task) => {
    try { await api(`/api/tasks/${task.id}`, token, { method: "PATCH", body: JSON.stringify({ status: task.status === "done" ? "todo" : "done" }) }); await load(); }
    catch (e) { setError(e instanceof Error ? e.message : "Task update failed."); }
  };
  if (!token) return <main className="connect-screen"><div className="connect-card">
    <div className="brand-mark"><Command size={26}/></div><div className="eyebrow">OPEN-SOURCE CAPABILITY HUB</div>
    <h1>Meet <span>ORBIT.</span></h1><p>Connect your self-hosted ORBIT instance. Your API token stays in this browser tab's session storage.</p>
    <form onSubmit={e => { e.preventDefault(); connect(); }}><label>ORBIT API token</label>
      <input type="password" value={tokenInput} onChange={e => setTokenInput(e.target.value)} placeholder="Paste your ORBIT_API_TOKEN" autoComplete="off"/>
      {error && <div className="error">{error}</div>}<button className="primary full"><LockKeyhole size={16}/> Connect workspace</button>
    </form><small>Need a token? Set ORBIT_API_TOKEN in your server's .env file.</small>
  </div></main>;
  return <div className="app-shell">
    <aside className="sidebar"><div className="brand"><div className="brand-mark"><Command size={21}/></div><div><b>ORBIT</b><small>CAPABILITY HUB</small></div></div>
      <div className="workspace"><span className="status-dot"/> SELF-HOSTED WORKSPACE</div>
      <nav>{[["Overview",Layers3],["Projects",FolderKanban],["Tasks",ListTodo],["Workflows",Workflow]].map(([label,Icon]: any) =>
        <button key={label} className={active === label ? "nav-item active" : "nav-item"} onClick={() => setActive(label)}><Icon size={17}/>{label}</button>)}</nav>
      <div className="side-spacer"/><div className="engine-label">CAPABILITY ENGINES</div>
      <div className="engine-link"><ListTodo size={16}/> <span>Flow</span><i>ACTIVE</i></div>
      <div className="engine-link"><Code2 size={16}/> <span>Dev</span><i>TOOLS</i></div>
      <div className="engine-link"><Palette size={16}/> <span>Studio</span><i>TOOLS</i></div>
      <div className="engine-link"><Zap size={16}/> <span>Automate</span><i>TOOLS</i></div>
      <div className="sidebar-bottom"><button onClick={() => { sessionStorage.removeItem("orbit-token"); setToken(""); }}><Settings2 size={16}/> Disconnect</button><span>v0.1.0 · MIT</span></div>
    </aside>
    <main className="main"><header className="topbar"><div><div className="eyebrow">YOUR AI. MORE CAPABLE.</div><h2>{active}</h2></div>
      <div className="top-actions"><span className="live"><span className="status-dot"/> SYSTEM ONLINE</span><button className="icon-button" onClick={() => void load()} title="Refresh"><RefreshCw size={17}/></button></div>
    </header>
    {error && <div className="notice"><CircleAlert size={17}/>{error}<button onClick={() => setError("")}>Dismiss</button></div>}
    {loading && <div className="loading"><LoaderCircle className="spin"/> Syncing workspace…</div>}
    {active === "Overview" && <>
      <section className="hero"><div><div className="eyebrow lime">ORBIT / SYSTEM OVERVIEW</div><h1>One hub.<br/><em>Four engines.</em></h1><p>Tools that help ChatGPT turn intent into useful work.</p></div>
        <div className="orbit-art"><div className="ring r1"/><div className="ring r2"/><div className="ring r3"/><div className="core"><Command size={34}/></div><span className="node n1"><ListTodo/></span><span className="node n2"><Code2/></span><span className="node n3"><Palette/></span><span className="node n4"><Zap/></span></div></section>
      <section className="stats"><Stat label="Projects" value={overview?.projects ?? 0} icon={<FolderKanban/>}/><Stat label="Total tasks" value={overview?.tasks ?? 0} icon={<ListTodo/>}/><Stat label="Completed" value={completed} icon={<Check/>}/><Stat label="Workflows" value={overview?.workflows ?? 0} icon={<Workflow/>}/></section>
      <section className="engine-grid"><Engine icon={<ListTodo/>} name="ORBIT Flow" desc="Projects, tasks and research." status="CONNECTED"/><Engine icon={<Code2/>} name="ORBIT Dev" desc="Repository analysis, code review and API checks." status="READY"/><Engine icon={<Palette/>} name="ORBIT Studio" desc="Design briefs, web plans and content packs." status="READY"/><Engine icon={<Zap/>} name="ORBIT Automate" desc="Validated workflows across engines." status="READY"/></section>
      <section className="panel"><div className="panel-head"><div><div className="eyebrow">FLOW ENGINE</div><h3>Recent tasks</h3></div><button className="text-button" onClick={() => setActive("Tasks")}>View all <ArrowUpRight size={15}/></button></div><TaskList tasks={tasks.slice(0,5)} onToggle={completeTask}/></section>
    </>}
    {active === "Projects" && <section className="panel"><div className="panel-head"><div><div className="eyebrow">FLOW ENGINE</div><h3>Your projects</h3></div></div>
      <form className="inline-form" onSubmit={addProject}><input value={projectName} onChange={e => setProjectName(e.target.value)} placeholder="New project name"/><button className="primary"><Plus size={16}/> Create project</button></form>
      <div className="project-grid">{projects.map(p => <article className="project-card" key={p.id}><FolderKanban/><h4>{p.name}</h4><p>{p.description || "No description yet."}</p><small>{p.task_count} tasks · {new Date(p.created_at).toLocaleDateString()}</small></article>)}</div>
      {!projects.length && <Empty text="No projects yet. Create your first project above."/>}</section>}
    {active === "Tasks" && <section className="panel"><div className="panel-head"><div><div className="eyebrow">FLOW ENGINE</div><h3>Task board</h3></div></div>
      <form className="inline-form" onSubmit={addTask}><input value={taskTitle} onChange={e => setTaskTitle(e.target.value)} placeholder="Add a task…"/><select value={selectedProject} onChange={e => setSelectedProject(e.target.value)}><option value="">No project</option>{projects.map(p => <option value={p.id} key={p.id}>{p.name}</option>)}</select><button className="primary"><Plus size={16}/> Add task</button></form><TaskList tasks={tasks} onToggle={completeTask}/></section>}
    {active === "Workflows" && <section className="panel"><div className="panel-head"><div><div className="eyebrow">AUTOMATE ENGINE</div><h3>Saved workflows</h3></div></div>
      <p className="muted">Workflows are created and executed through ChatGPT's ORBIT Automate tools. Only allowlisted ORBIT actions can run.</p>
      <div className="workflow-note"><Workflow/><div><b>Workflow execution is guarded</b><span>No shell commands, arbitrary scripts, or unrestricted external actions are supported.</span></div></div>
      <p className="muted">Connect ORBIT to ChatGPT and ask it to create a workflow. Refresh this page to see your saved workflows.</p></section>}
    <footer>ORBIT v0.1.0 <span>OPEN SOURCE · BUILT FOR CHATGPT</span></footer></main></div>;
}
function Stat({label,value,icon}: any) { return <article className="stat-card"><div className="stat-icon">{icon}</div><span>{label}</span><strong>{value}</strong></article>; }
function Engine({icon,name,desc,status}: any) { return <article className="engine-card"><div className="engine-icon">{icon}</div><div className="engine-status">{status}</div><h3>{name}</h3><p>{desc}</p></article>; }
function Empty({text}:{text:string}) { return <div className="empty">{text}</div>; }
function TaskList({tasks,onToggle}:{tasks:Task[];onToggle:(task:Task)=>void}) {
  if (!tasks.length) return <Empty text="No tasks yet. Create one to get started."/>;
  return <div className="task-list">{tasks.map(task => <div className="task-row" key={task.id}><button className={task.status === "done" ? "check checked" : "check"} onClick={() => onToggle(task)}>{task.status === "done" && <Check size={13}/>}</button><div className={task.status === "done" ? "task-title done" : "task-title"}>{task.title}<small>{task.description}</small></div><span className={`priority ${task.priority}`}>{task.priority}</span></div>)}</div>;
}