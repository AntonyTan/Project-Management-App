import React, {Fragment} from 'react';
import ProjectTicketCreate from './ProjectTicketCreate';
import {FaTrashAlt} from 'react-icons/fa'

function ProjectTicketDisplay({project, addTicket, deleteTicket, toggleTicketIsComplete}) {

  
  const displayTickets = () => {  
    return (
      <Fragment>
        {(project.project_tickets).map((ticket, index) => (
          <tr key = {index} 
            className = {ticket.ticket_is_complete ? 'ticket-row complete' : 'ticket-row'}
            onClick = {() => toggleTicketIsComplete(project.project_id, ticket)}  
            >
            <td>{ticket.ticket_name}</td>
            <td>{ticket.ticket_description}</td>
            <td><FaTrashAlt onClick = {() => deleteTicket(project.project_id, ticket.ticket_id)}></FaTrashAlt></td>
            <td></td>
        </tr>
        ))}
        </Fragment>
    )
  }
  return (
    <Fragment>
      <div className = "project-page">
        <div className = 'project-info-list'>
            {/* <h1>{project.project_name}</h1>
            <h2>Description</h2>
            <p>{project.project_description}</p>
            <h2>Deadline</h2>
            <p>Due on {project.project_deadline}</p> */}
            <h1>Ticket Creation</h1>
            <ProjectTicketCreate project = {project} addTicket = {addTicket}/>
          </div>
        <div className="tableFixHead">
            <table>
                <thead>
                    <tr>
                        <th className ="col1">Ticket Name</th>
                        <th className ="col2">Ticket Description</th>
                        <th className ="col3"></th>
                        <th className ="col4"></th>
                    </tr>
                </thead>
                <tbody>
                  {displayTickets()}
                </tbody>
            </table>
        </div>
      </div>
    </Fragment>
  )
}

export default ProjectTicketDisplay;
