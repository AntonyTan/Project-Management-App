import React, {useState} from 'react'

function TodoSubmit({addTodo}) {
    const [input, setInput] = useState('');

    const handleChange = (e) => {
        setInput(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input === ''){
            return;
        }
        addTodo({
            description: input,
            iscomplete: false,
            isedit: false,
            isopen: false
        });
        setInput('');
    }
    
    return (
        <form className ="todo-form" onSubmit = {handleSubmit}>
            <input 
                type = "text" 
                placeholder ="Add a todo" 
                value = {input} 
                name = "description" 
                className = "todo-form-input"
                onChange={handleChange}
                >
            </input>
            <button className = 'todo-form-button'>
                +
            </button>

        </form>
    )
}

export default TodoSubmit
