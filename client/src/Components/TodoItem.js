import React, {useState} from 'react'
import Collapsible from "./Collapsible"


function TodoItem({todoList, completeTodo, removeTodo, toggleEditMode, updateTodo, toggleOpen}) {
    const [newValue, setNewValue] = useState("");

    const handleSubmit = (e, todo) => {
        e.preventDefault();
        updateTodo({
                todo_id: todo.todo_id,
                description: newValue,
                iscomplete: todo.iscomplete
            });
        setNewValue('');
    }
    const handleChange = (e) => {
        setNewValue(e.target.value);
    }
    const showEditInput = (todo) => {
        return (
            <form onSubmit = {(e) =>{handleSubmit(e, todo);}}>
                <input
                    type = "text"
                    placeholder = "Edit your todo"
                    name = "todo input edit"
                    className = "todo-input-edit"
                    value = {newValue}
                    onChange = {handleChange}>
                </input>
            </form>
        )
    }

    const showTodo = (todo) => {
        return (
            <div className = 'todo-full'>
                <Collapsible 
                    label = {todo.description} 
                    removeTodo = {removeTodo} 
                    todo = {todo} 
                    toggleOpen = {toggleOpen}>
                </Collapsible>
            </div>

        )

    }

    return(
        <div className ='todo-list'>
            {todoList.map( (todo,index) => (
                <div 
                    key = {index} 
                //     // onClick = {() => completeTodo(todo)}
                //     // onDoubleClick = {() => toggleEditMode(todo.todo_id)}
                //     // className = {todo.iscomplete === true? 'todo-row complete' : 'todo-row'}>
                    >
                    {todo.isEdit? showEditInput(todo): showTodo(todo)}

                     {/* <button className = 'todo-delete-button' onClick = {() => removeTodo(todo.todo_id)}>
                //     X
                //     </button> */}

                </div>
                
                // <div className="icons">
                //     <RiCloseCircleLine
                //         onClick = {() => removeTodo(todo.todo_id)}
                //         className='delete-icon'/>
                //     <AiFillEdit
                //         onClick = {() => toggleEditMode(todo.todo_id)}
                //         className = 'edit-icon'/>
                // </div>
            ))}


        </div>

    )


} 

export default TodoItem
