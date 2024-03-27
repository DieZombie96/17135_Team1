import React from "react";
import Project from "./Project";
import TextField from '@mui/material/TextField';
import { useNavigate } from 'react-router-dom';
import CustomButton from "./CustomButton";

function Projects() {
        const navigate = useNavigate();
        const goBack = () => {
            navigate("/join"); 
        };
        return (
            <div>
                <header className="App-header"><b>PROJECTS</b>
                <CustomButton disabled={false} clicked={goBack} width={125} fontsize={14} name="Join Project"> </CustomButton>
            <div>

                <Project project_name = "Project Name 1" project_quantity = {100} project_users = {["list", "of", "valid", "users"]}/>
                <Project project_name = "Project Name 2" project_quantity = {100} project_users = {["list", "of", "valid", "users"]}/>
                <Project project_name = "Project Name 3" project_quantity = {100} project_users = {["list", "of", "valid", "users"]}/>                
            </div>
            </header>
            </div>
        );
}

export default Projects;