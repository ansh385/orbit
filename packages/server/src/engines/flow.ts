import { pool } from "../db/pool.js";
export async function createProject(userId:string,input:{name:string;description?:string}) {
 const r=await pool.query(`INSERT INTO projects(user_id,name,description) VALUES($1,$2,$3) ON CONFLICT(user_id,name) DO UPDATE SET description=EXCLUDED.description,updated_at=now() RETURNING *`,[userId,input.name.trim(),input.description??""]); return r.rows[0];
}
export async function listProjects(userId:string) {
 const r=await pool.query(`SELECT p.*,COUNT(t.id)::int AS task_count FROM projects p LEFT JOIN tasks t ON t.project_id=p.id AND t.user_id=p.user_id WHERE p.user_id=$1 GROUP BY p.id ORDER BY p.updated_at DESC`,[userId]); return r.rows;
}
export async function createTask(userId:string,input:{title:string;description?:string;projectId?:string;priority?:string;dueAt?:string}) {
 if(input.projectId){const owned=await pool.query("SELECT id FROM projects WHERE id=$1 AND user_id=$2",[input.projectId,userId]);if(!owned.rowCount)throw new Error("Project not found for this user.");}
 const r=await pool.query("INSERT INTO tasks(user_id,project_id,title,description,priority,due_at) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[userId,input.projectId??null,input.title.trim(),input.description??"",input.priority??"medium",input.dueAt??null]);return r.rows[0];
}
export async function listTasks(userId:string,projectId?:string) {
 const r=await pool.query("SELECT * FROM tasks WHERE user_id=$1 AND ($2::uuid IS NULL OR project_id=$2::uuid) ORDER BY CASE priority WHEN 'urgent' THEN 0 WHEN 'high' THEN 1 WHEN 'medium' THEN 2 ELSE 3 END,created_at DESC LIMIT 200",[userId,projectId??null]);return r.rows;
}
export async function updateTask(userId:string,id:string,patch:{title?:string;description?:string;status?:string;priority?:string;dueAt?:string|null}) {
 const q=await pool.query("SELECT * FROM tasks WHERE id=$1 AND user_id=$2",[id,userId]);if(!q.rowCount)throw new Error("Task not found.");const o=q.rows[0];
 const r=await pool.query("UPDATE tasks SET title=$3,description=$4,status=$5,priority=$6,due_at=$7,updated_at=now() WHERE id=$1 AND user_id=$2 RETURNING *",[id,userId,patch.title??o.title,patch.description??o.description,patch.status??o.status,patch.priority??o.priority,patch.dueAt===undefined?o.due_at:patch.dueAt]);return r.rows[0];
}
export async function saveResearch(userId:string,input:{title:string;content:string;projectId?:string;sourceUrl?:string;tags?:string[]}) {
 const r=await pool.query("INSERT INTO research_items(user_id,project_id,title,content,source_url,tags) VALUES($1,$2,$3,$4,$5,$6) RETURNING *",[userId,input.projectId??null,input.title,input.content,input.sourceUrl??null,input.tags??[]]);return r.rows[0];
}
export async function searchResearch(userId:string,query:string) {
 const r=await pool.query("SELECT id,title,content,source_url,tags,created_at FROM research_items WHERE user_id=$1 AND (title ILIKE $2 OR content ILIKE $2) ORDER BY created_at DESC LIMIT 50",[userId,`%${query}%`]);return r.rows;
}