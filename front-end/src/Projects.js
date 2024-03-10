import React from "react";
import Project from "./Project";

function Projects() {
        return (
            <div>
                <Project project_name = "Project Name 1" project_quantity = {100} project_users = {["list", "of", "valid", "users"]}/>
                <Project project_name = "Project Name 2" project_quantity = {100} project_users = {["list", "of", "valid", "users"]}/>
                <Project project_name = "Project Name 3" project_quantity = {100} project_users = {["list", "of", "valid", "users"]}/>
            </div>
        );
}

export default Projects;