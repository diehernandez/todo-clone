import React, { useEffect } from 'react';
import { useTask } from '../../hooks';
import { collatedTasks } from '../../constants';
import { getTitle, getCollatedTitle, collatedTasksExist } from '../../helpers';
import { useSelectedProjectValue, useProjectsValue } from '../../context';
import { AddTask } from '../AddTask';
import { Task } from './Task';
import { Checkbox } from './Checkbox';
export const Tasks = () => {
    const { selectedProject } = useSelectedProjectValue();
    const { projects } = useProjectsValue();
    const { tasks } = useTask(selectedProject);

    let projectName = '';

    if (
        projects &&
        projects.length > 0 &&
        selectedProject &&
        !collatedTasksExist(selectedProject)
      ) {
        projectName = getTitle(projects, selectedProject).name;
      }

    if(collatedTasksExist(selectedProject) && selectedProject) {
        projectName = getCollatedTitle(collatedTasks, selectedProject).name;
        //console.log('projectName 2: ', projectName);
    }

    useEffect(() => {
        document.title = `${projectName}: Todoist`;
    })

    return (
        <div className="tasks" data-testid="tasks">
            <h2 data-testid="project-name">{projectName}</h2>
            <AddTask/>
            <ul className="tasks__list">
                {tasks.map(task => (
                  <li key={`${task.id}`}>
                      <Checkbox id={task.id} archive={task.archive}/>
                      <Task  id={task.id} name={task.task}/>
                  </li>

                ))}
            </ul>
        </div>
    )
}
