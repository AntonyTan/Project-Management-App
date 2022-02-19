import React, {useState, Fragment} from 'react';
import { v4 as uuidv4 } from 'uuid';

function ProjectCreate({showCreation, addProject}) {

    
    const [name, setName] = useState('a');
    const [description, setDescription] = useState('a');
    const [date, setDate] = useState((new Date()).toLocaleDateString('en-CA'));


    const changeName = (e) => {
        setName(e.target.value);
    }
    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    const changeDeadline = (e) => {
        setDate(e.target.value);
    }
    const resetInputs = () => {
        setName('');
        setDescription('');
        setDate(new Date());
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name === '' || description === '' || date === ''){
            return;
        }

        var newProject = {
            project_id: uuidv4(),
            project_name: name,
            project_description: description,
            project_create_date: (new Date().toISOString().split('T')[0]),
            project_deadline: date,
            project_tickets: []
        }

        addProject(newProject)
        resetInputs();
        showCreation(false);
    }

    
  return(
      <Fragment>
      <div className = 'darken-screen' onClick = {() => showCreation(false)}> 

      </div>
      <div className = 'project-create-screen'>
          <form onSubmit = {handleSubmit}>
            <h2>New Project</h2>

            <h3>Project Name</h3>
            <input
                type = "text" 
                placeholder ="Build a website" 
                value = {name} 
                name = "name" 
                onChange= {changeName}
                className = "project-input"
            ></input>
            <h3>Description</h3>
            <textarea
                type = "text" 
                placeholder ="Displays and visualises project" 
                value = {description} 
                name = "description" 
                onChange= {changeDescription}
                className = "project-textarea"
            ></textarea>
            <h3>Deadline</h3>
            <input 
                type = "date"
                value= {date}
                name = "deadline"
                onChange = {changeDeadline}
                className = "project-dateinput"
                >
            </input>

            <button>
                Submit
            </button>
          </form>
    </div>
      </Fragment>
  )
}

export default ProjectCreate;
