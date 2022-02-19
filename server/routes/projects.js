const router = require("express").Router();
const pool = require('../../db');
const authorisation = require("../middleware/authorisation");


// Add a Project
router.post("/",  authorisation, async(req, res) => {
    try {
        const {project_id, project_name, project_description, project_deadline, project_create_date} = req.body;
        const newProject = await pool.query(
            "INSERT INTO projects (project_id, project_name,  project_description, project_deadline, user_id, project_create_date) VALUES($1, $2, $3, $4, $5, $6) RETURNING *",
             [project_id, project_name, project_description, project_deadline, req.user, project_create_date]
             );
        res.json(newProject.rows[0]);
    } catch (error) {
        res.send("Post Failed");
        console.error(error.message) ;       
    }
})

//Get all projects to user

router.get("/",  authorisation, async(req, res) => {
    try {
        const allProjects = await pool.query(
            "SELECT * FROM projects WHERE user_id = $1", [req.user]
            );
        res.json(allProjects.rows);
    } catch (error) {
        console.error(error.message)
    }
})

//Get a Project
router.get("/:id", authorisation, async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query(
            "SELECT * FROM projects WHERE todo_id = $1 AND user_id = $2",
        [id, req.user]
        )
        res.json(todo.rows);
    } catch (error) {
        console.error(error.message)
    }
})

//Update a Project

router.put("/:id", authorisation, async(req, res) => {
    try {
        const {id} = req.params;
        const {description, iscomplete} = req.body;
        const updateTodo = await pool.query(
            "UPDATE projects SET description = $1, iscomplete = $2 WHERE todo_id = $3 and user_id = $4 RETURNING *",
            [description, iscomplete, id, req.user]
            );
        res.json(updateTodo.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

//Delete a Project

router.delete("/:project_id", authorisation, async(req, res) => {
    try {
        const {project_id} = req.params;
        const deleteProject = await pool.query(
            "DELETE FROM projects WHERE project_id = $1 and user_id = $2 RETURNING *",
            [project_id, req.user]    
        )
        res.json(deleteProject.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

module.exports = router;