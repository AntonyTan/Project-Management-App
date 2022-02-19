import React, {useState, useEffect, Fragment} from 'react'
import ProjectMain from './Projects/ProjectMain.js';
import MainChart from './Chart/MainChart.js'

function Mainpage({setAuth}) {
    const [name, setName] = useState("");
    const [projectList, setProjectList] = useState([]);
    const [completeUpdate, setCompleteUpdate] = useState(false); //Only purpose is to render screen again when the user clicks on complete
    const logOut = (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        setAuth(false);
    }

    //proxy gets ignored in deployment, uses heroku domain instead
    const getDetails = async() => {
        try {
            const response = await fetch("/dashboard/", {
                method: "GET",
                headers: {token: localStorage.token}
            })
            const userDetails = await response.json()
            setName(userDetails.user_name);
        } catch (error) {
            console.error(error.message)
        }
    }

    const getTodos = async() => {
        try {
            const response = await fetch("/todo/", {
                method: "GET",
                headers: {token: localStorage.token}
            });
            const json = await response.json();
            setProjectList(json.reverse());
        } catch (error) {
            console.error(error.message);
        }
    }

    // Adds a new Todo into database, and calls GetTodo() to update local ProjectList
    const addTodo = async (todo) => {
        try {
            const response = await fetch("/todo/", {
                method: "POST",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(todo)
            });
            // getTodos();
        } catch (error) {
            console.error(error.message);
        }
    }
    const removeTodo = async (id)=> {
        try {
            const response = await fetch(`/todo/${id}`, {
                method: "DELETE",
                headers: {token: localStorage.token}
            });
            const removeArr = projectList.filter(todo => todo.todo_id !== id)
            setProjectList(removeArr);
        } catch (error) {
            console.error(error.message);
        }
    }

    const completeTodo = async (todoToUpdate) => {
        try {
            const response = await fetch(`/todo/${todoToUpdate.todo_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(
                    {
                        description: todoToUpdate.description,
                        iscomplete: !todoToUpdate.iscomplete
                    }
                )
            })
            projectList.forEach(todo => {
                if (todo.todo_id === todoToUpdate.todo_id){
                    todo.iscomplete = !todo.iscomplete;
                    setCompleteUpdate(!completeUpdate);
                }
            });
        } catch (error) {
            console.error(error.message);
        }
    }
    const toggleEditMode = (id) => {
        projectList.forEach(todo => {
            if (todo.todo_id === id){
                if (todo.isEdit === null){
                    todo.isEdit = true;
                }else{
                    todo.isEdit = !todo.isEdit;
                }
            }
            setCompleteUpdate(!completeUpdate);
            return todo;
        });
    }
    const updateTodo = async (updatedTodo) => {
        try {
            const response = await fetch(`/todo/${updatedTodo.todo_id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "Application/json",
                    token: localStorage.token
                },
                body: JSON.stringify(
                    {
                        description: updatedTodo.description,
                        iscomplete: updatedTodo.iscomplete
                    }
                )
            })
            projectList.forEach(todo => {
                if (todo.todo_id === updatedTodo.todo_id){
                    todo.description = updatedTodo.description;
                    todo.isEdit = !todo.isEdit;
                }
                setCompleteUpdate(!completeUpdate);
            });
        } catch (error) {
            
        }
    }
    useEffect(() => {
        getDetails()
    }, []);

    return (
        <Fragment>
            <div className = 'main-page'>
                <div className = 'project-bar'>
                    <p>Project Manager</p>
                    <img src = "https://cdn-icons-png.flaticon.com/512/1705/1705213.png"></img>
                    
                    <div className = 'nav-links'>
                        {/* <p>Dashboard</p>
                        <p>Settings</p> */}
                    </div>
                    <p onClick = {logOut} id = "logout" className = "toggleAuth">Log Out</p>
                </div>

                <div className = 'main-page-background-container'>
                    <ProjectMain projectList = {projectList} setProjectList = {setProjectList}/>
                    <div className = 'main-page-banner'>
                        <h1>Hello, {name}.</h1>
                    </div>

                    <div className = 'main-page-background'>
                        {/* Main Page Background */}
                    </div>

                    <MainChart projectList = {projectList}>

                    </MainChart>

                </div>
                
                
                {/* <div className = 'dashboard'>
                    <h1>Hello, {name}.</h1>

                    <TodoSubmit addTodo = {addTodo}/>
                    <TodoItem 
                        projectList = {projectList}
                        removeTodo = {removeTodo}
                        completeTodo={completeTodo}
                        toggleEditMode={toggleEditMode}
                        updateTodo = {updateTodo}/>
                </div> */}
            </div>
        </Fragment>
    )
}

export default Mainpage