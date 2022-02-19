import React, { useState, useEffect, Fragment } from 'react';
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import ProjectDisplay from './ProjectDisplay';
import ProjectCreate from './ProjectCreate';


function ProjectMain({projectList, setProjectList}) {
    const [pageNumber, setPageNumber] = useState(0);
    //const [projectList, setProjectList] = useState([]);
    const [showCreateProject, setShowCreateProject] = useState(false);
    const [completeUpdate, setCompleteUpdate] = useState(false); //Only purpose is to render screen again when the user clicks on complete

    const handlePageNav = (number) => {
        if (number * 3 >= projectList.length || number < 0) {
            return;
        }
        setPageNumber(number);
    }

    const showTableButtons = () => {
        return (
            <div className='page-buttons'>
                <button className='nav-button' onClick={() => handlePageNav(pageNumber - 1)}>
                    <AiOutlineArrowLeft className='arrow' />
                </button>
                <span className='page-number'>
                    <p>{pageNumber + 1}</p>
                </span>
                <button className='nav-button' onClick={() => handlePageNav(pageNumber + 1)}>
                    <AiOutlineArrowRight className='arrow' />
                </button>
            </div>
        )
    }
    const showCreation = (bool) => {
        setShowCreateProject(bool)
    }

    const getTickets = async (project_id) => {
        try {
            const response = await fetch(`/tickets/${project_id}`, {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const json = await response.json();
            return json;
        } catch (error) {
            console.error(error.message);
        }
    }

    const getProjects = async () => {
        try {
            const response = await fetch("/projects/", {
                method: "GET",
                headers: { token: localStorage.token }
            });
            const json = await response.json();

            json.map(async (project) => (
                project.project_tickets = await getTickets(project.project_id)
            ))
            //Call Projects
            setProjectList(json);
        } catch (error) {
            console.error(error.message);
        }
    }

    const addProject = async (project) => {
        try {
            const response = await fetch("/projects/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(project)
            });
            setProjectList([...projectList, project]);
        } catch (error) {
            console.error(error.message);
        }
    }
    const addTicket = async (project, ticket) => {
        try {
            const ticketSend = ticket;
            ticketSend.project_id = project.project_id;
            const response = await fetch("/tickets", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(ticketSend)
            })
            project.project_tickets.push(ticket);
            setCompleteUpdate(!completeUpdate);

        } catch (error) {

        }
    }

    const removeProject = async (project_id) => {
        try {
            const response = await fetch(`/projects/${project_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            });
            const removeArr = projectList.filter(project => project.project_id !== project_id)
            setProjectList(removeArr);
        } catch (error) {
            console.error(error.message);
        }
    }
    const deleteTicket = async (project_id, ticket_id) => {
        try {
            for (var i = 0; i < projectList.length; i++) {
                let currProject = projectList[i];
                if (currProject.project_id === project_id) {
                    let currTicketList = currProject.project_tickets;
                    for (var j = 0; j < currTicketList.length; j++) {
                        let currTicket = currTicketList[j];
                        if (currTicket.ticket_id === ticket_id) {
                            currTicketList.splice(j, 1);
                            setCompleteUpdate(!completeUpdate);
                        }
                    }
                }
            }
            const response = await fetch(`/tickets/${project_id}&${ticket_id}`, {
                method: "DELETE",
                headers: { token: localStorage.token }
            })
        } catch (error) {
            console.error(error);
        }
    }

    const toggleTicketIsComplete = async (project_id, ticket) => {
        try {
            ticket.ticket_is_complete = !(ticket.ticket_is_complete)
            setCompleteUpdate(!completeUpdate);
            const response = await fetch(`/tickets/${project_id}&${ticket.ticket_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(ticket)
            })
        } catch (error) {

        }
    }
    const showProjectList = () => {
        return (
            <div className='project-display'>
                <div className='project-header'>
                    <h2 className='project-header-name'>Projects</h2>
                    
                    <button className="project-add-button" onClick={() => showCreation(true)}>Add Project</button>
                </div>
                <ProjectDisplay
                    projectList={projectList.slice((pageNumber) * 3, (pageNumber * 3) + 3)}
                    removeProject={removeProject}
                    addTicket={addTicket}
                    deleteTicket={deleteTicket}
                    toggleTicketIsComplete={toggleTicketIsComplete}
                />
                {showTableButtons()}
            </div>
        )
    }
    const showAddProject = () => {
        return (
            <ProjectCreate showCreation={showCreation} addProject={addProject} />
        )
    }
    useEffect(() => {
        getProjects()
    }, []);

    return (
        <Fragment>
            {showCreateProject && showAddProject()}
            {showProjectList()}
        </Fragment>
    );
}

export default ProjectMain;
