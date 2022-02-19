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

    useEffect(() => {
        getDetails()
    }, []);

    return (
        <Fragment>
            <div className = 'main-page'>
                <div className = 'project-bar'>
                    <p>Project Manager</p>
                    <img src = "https://cdn-icons-png.flaticon.com/512/1705/1705213.png"></img>
                    
                    {/* <div className = 'nav-links'>
                        <p>Dashboard</p>
                        <p>Settings</p>
                    </div> */}
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

                    {projectList.length ? <MainChart projectList = {projectList}/> : null}

                </div>
            
            </div>
        </Fragment>
    )
}

export default Mainpage