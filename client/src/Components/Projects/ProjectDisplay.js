import React, {useState, Fragment} from 'react';
import {FaTrashAlt} from 'react-icons/fa'
import ProjectTicketDisplay from './ProjectTicketDisplay';
function ProjectDisplay({projectList, removeProject, addTicket, deleteTicket, toggleTicketIsComplete}) {

    const [showTicket, setShowTicket] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);

    const calculateTimeRemaining = (projectDate) => {
        var date = new Date(projectDate);
        var today = new Date();
        var timeDiff = date.getTime() - today.getTime();
        var dayDiff = timeDiff / (1000 * 3600 * 24);
        dayDiff = Math.ceil(dayDiff);
        if (dayDiff === 0){
            return "Today"
        }

        var timeAppend = " day"
        if (dayDiff > 1){
            timeAppend += "s"
        }
        if (dayDiff < 0){
            dayDiff = Math.abs(dayDiff);
            timeAppend += "s ago"
        }
        return dayDiff += timeAppend;
    }
    const showTicketPage = (project) => {

        return(
            <Fragment>
                <div className = 'ticket-screen darken-screen' onClick = {() => setShowTicket(false)}>
                </div>
                <ProjectTicketDisplay project = {project} addTicket = {addTicket} deleteTicket = {deleteTicket} toggleTicketIsComplete = {toggleTicketIsComplete}/>
            </Fragment>
        )
    }
    const clickOnProject = (project) => {
        setSelectedProject(project);
        setShowTicket(true);
    }
        return(
            <Fragment>
                {showTicket && showTicketPage(selectedProject)}
                <div className = 'project-list'>
                    <table>
                        <thead>
                            <tr>
                                <th className = "col1">Project</th>
                                <th className = "col2">Description</th>
                                <th className = "col3">Deadline</th>
                                <th className = "col4"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {projectList.map( (project, index) => (
                                <tr key = {index}>
                                    <td><p onClick = {() => clickOnProject(project)}>{project.project_name}</p></td>
                                    <td>{project.project_description}</td>
                                    <td>{calculateTimeRemaining(project.project_deadline) }</td>
                                    <td><FaTrashAlt onClick = {() => removeProject(project.project_id)}/></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Fragment>
        )
}


export default ProjectDisplay;
