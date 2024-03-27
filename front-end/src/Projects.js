import React from "react";
import Project from "./Project";
import TextField from '@mui/material/TextField';

function Projects() {
        return (
            <div>
                <header className="App-header"><b>PROJECTS</b>
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