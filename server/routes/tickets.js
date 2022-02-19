const router = require("express").Router();
const pool = require('../../db');
const authorisation = require("../middleware/authorisation");

//Add a ticket

router.post("/",  authorisation, async(req, res) => {
    try {
        const {ticket_id, ticket_name, ticket_description, ticket_is_complete, project_id} = req.body;
        const newTicket = await pool.query(
            "INSERT INTO tickets (ticket_id, ticket_name,  ticket_description, ticket_is_complete, project_id) VALUES($1, $2, $3, $4, $5) RETURNING *",
             [ticket_id, ticket_name, ticket_description, ticket_is_complete, project_id]
             );
        res.json(newTicket.rows[0]);
    } catch (error) {
        res.send("Post Failed");
        console.error(error.message) ;       
    }
})

//Get all tickets of a project
router.get("/:project_id",  authorisation, async(req, res) => {
    try {
        const {project_id} = req.params;
        const allProjects = await pool.query(
            "SELECT * FROM tickets WHERE project_id = $1", [project_id]
            );
        res.json(allProjects.rows);
    } catch (error) {
        console.error(error.message)
    }
})


//Delete a Ticket
router.delete("/:project_id&:ticket_id", authorisation, async(req, res) => {
    try {
        const {project_id, ticket_id} = req.params;
        const deleteTicket = await pool.query(
            "DELETE FROM tickets WHERE ticket_id = $1 and project_id = $2 RETURNING *",
            [ticket_id, project_id]    
        )
        res.json(deleteTicket.rows[0]);
    } catch (error) {
        console.error(error.message)
    }
})

//Update a ticket
router.put("/:project_id&:ticket_id", authorisation, async(req, res) => {
    try {
        const {project_id, ticket_id} = req.params;
        const {ticket_name, ticket_description, ticket_is_complete} = req.body;
        const updateTicket = await pool.query(
            "UPDATE tickets SET ticket_name = $1, ticket_description = $2, ticket_is_complete = $3 WHERE project_id = $4 and ticket_id = $5 RETURNING *",
            [ticket_name, ticket_description, ticket_is_complete, project_id, ticket_id]
        )
        console.log(updateTicket.rows[0]);
        res.json(updateTicket.rows[0]);
    } catch (error) {
        
    }
})

module.exports = router;