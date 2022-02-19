import React, {useState} from 'react'
import "./Collapsible.css";

function Collapsible(props) {

    var mouseDown;
    const mouseDownCount = () => {
        mouseDown = setTimeout( () => {
            //props.removeTodo(props.todo.todo_id);
        }, 1000);
    }
    const clearMouseDown = () => {
        if (mouseDown){
            clearTimeout(mouseDown)
        }
    }

    return (
        <div className = "collapsible">
            <button 
            className = "toggle todo-title" 
            onClick = {() => props.toggleOpen(props.todo.todo_id)}
            onMouseDown = {() => mouseDownCount()}
            onMouseUp = {() => clearMouseDown()}
            onTouchStart = {() => mouseDownCount()}
            onTouchEnd = {() => clearMouseDown()}
            >
                {props.label}
            </button>
            <div className = {props.todo.isopen ? "content show" : "content"}>
                {props.children}
            </div>
        </div>
    )
}

export default Collapsible
