import React from "react";
import Project from "./Project";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CustomButton from "./CustomButton";
import { useEffect, useState } from "react";

function Projects() {


    let projects = [1]
    const navigate = useNavigate();
    const goBack = () => {
        navigate("/join");
    };


    const [list, setlist] = useState([])

    useEffect(() => {
        const fetchData = async () => {

            const requestOptions = {
                method: "GET"
            }
            // alert('yes')
            await fetch("/getprojects/", requestOptions)   //backend method 
                .then(response => response.json())
                .then(getprojects);
        }
        fetchData()

    }, [])

    // useEffect(() => {
    //     alert("yes")
    // }, [])



    const getprojects = (data) => {
        // alert(data.response)
        projects = data.response
        setlist(projects)
        // alert(projects)
    }

    if (list.includes('2')) {
        return (
            <div>
                <header className="App-header"><b>PROJECTS</b>
                    <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project"> </CustomButton>
                    <div>
                        <Project project_name="Project Name 1" project_quantity={100} project_users={["list", "of", "valid", "users"]} />
                        <Project project_name="Project Name 2" project_quantity={100} project_users={["list", "of", "valid", "users"]} />
                    </div>
                </header>
            </div>
        );
    }
    else if (list.includes('1')) {
        return (
            <div>
                <header className="App-header"><b>PROJECTS</b>
                    <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project"> </CustomButton>
                    <div>

                        <Project project_name="Project Name 1" project_quantity={100} project_users={["list", "of", "valid", "users"]} />
                    </div>
                </header>
            </div>
        );

    }
    else {
        return (
            <div>
                <header className="App-header"><b>PROJECTS</b>
                    <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project"> </CustomButton>
                    <div>
                        {/* 
                        <Project project_name="Project Name 1" project_quantity={100} project_users={["list", "of", "valid", "users"]} />
                        <Project project_name="Project Name 2" project_quantity={100} project_users={["list", "of", "valid", "users"]} />
                        <Project project_name="Project Name 3" project_quantity={100} project_users={["list", "of", "valid", "users"]} /> */}
                    </div>
                </header>
            </div>
        );

    }


}

export default Projects;