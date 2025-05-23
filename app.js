import express from "express"
import * as db from './util/database.js'

const PORT = 8080
const app = express()
app.use(express.json())

app.get("/recipes", (req, res)=>{
    try {
        const recipes = db.getRecipes()
        if (!recipes){
            res.status(400).json({message: "Failed to get all."})
        }
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.get("/recipes/:id", (req, res)=>{
    try {
        const recipes = db.getRecipesById(req.params.id)
        if (!recipes){
            res.status(404).json({message: "Failed to get."})
        }
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
})

app.post("/recipes", (req, res)=>{
    try {
        const {title, content} = req.body
    if (!title || !content){
        res.status(400).json({message: "Failed to post"})
    }
    const postedRec = db.postRecipes(title, content)
    if(postedRec.changes != 1){
        res.status(422).json({message: "Failed credentials"})
    }
    res.status(200).json({id: postedRec.lastInsertRowid})
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
    
})

app.delete("/recipes/:id", (req, res)=>{
    try {
        const deleted = db.deleteRecipes(req.params.id)
    if(deleted.changes != 1){
        res.status(404).json({message: "Nincs ilyen azonosító"})
    }
    res.status(204).json({message: "Sikeres törlés"})
    } catch (error) {
        res.status(500).json({message: "Error: "+error})
    }
    
})

app.listen(PORT, ()=> console.log("Serever runs on port: "+PORT))

