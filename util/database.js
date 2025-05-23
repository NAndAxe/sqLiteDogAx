import Database from "better-sqlite3";

const db = new Database ("./data/database.sqlite")
db.prepare("CREATE TABLE IF NOT EXISTS recipes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, content TEXT)").run()

export const getRecipes = () => db.prepare("SELECT * FROM recipes").all()
export const getRecipesById = (id) => db.prepare("SELECT * FROM recipes WHERE id = ?").get(id)
export const postRecipes = (title, content) => db.prepare("INSERT INTO recipes (title, content), (?,?) ").run(title, content)
export const deleteRecipes = (id) => db.prepare("DELETE FROM recipes WHERE id = ? ").run(id)

const recipes = [{id: 1, title: "REC1", content:"CON1" },{id: 2, title: "REC2", content:"CON2" },{id: 3, title: "REC3", content:"CON3" },{id: 4, title: "REC4", content:"CON4" }]