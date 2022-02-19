import React, {useState, Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';

function ProjectTicketCreate({project, addTicket}) {

    const [ticketName, setTicketName] = useState('');
    const [ticketDescription, setTicketDescription] = useState('');
    const resetInputs = () => {
        setTicketName('');
        setTicketDescription('');
    }
    const changeTicketName = (e) => {
        setTicketName(e.target.value)
    }
    const changeTicketDescription = (e) => {
        setTicketDescription(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        if (ticketName === ''){
            return;
        }
        var newTicket = {
            ticket_id: uuidv4(),
            ticket_name: ticketName,
            ticket_description: ticketDescription,
            ticket_is_complete: false,
            ticket_date_created: new Date(),
            ticket_date_completed: ''
        }
        addTicket(project, newTicket);
        resetInputs();
    }
  return(
    <div className = 'ticket-create'>
      <form onSubmit = {handleSubmit}>
          <h3>Ticket Name</h3>
          <input
            type = "text"
            value = {ticketName}
            onChange = {changeTicketName}
            >
          </input>
          <h3>Description</h3>
          <textarea
            type = "text"
            value = {ticketDescription}
            onChange = {changeTicketDescription}
            >
          </textarea>
        <button>Add ticket</button>
      </form>
      </div>
  )

  
}

export default ProjectTicketCreate;
