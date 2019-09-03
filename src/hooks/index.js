import { useState, useEffect } from 'react'; 
import { firebase } from '../firebase';
import { collatedTasksExist } from '../helpers/index'
import moment from 'moment';


export const useTask = (selectedProject) => {
    const[tasks, setTasks] = useState([]);
    const[archivedTask, setArchivedTasks] = useState([]);
    
    useEffect(() => {
        let unsuscribe = firebase
        .firestore()
        .collection('task')
        .where('userId','==','U4gzdNE5PbuwQLuzJax2j3BAnVxNyJ');

        unsuscribe = 
            selectedProject && !collatedTasksExist(selectedProject)
            ? (unsuscribe = unsuscribe.where('projectId','==', selectedProject))
            : selectedProject === 'TODAY'
            ? (unsuscribe = unsuscribe.where(
                'date',
                '==',
                moment().format('DD/MM/YYYY')
            ))
            : selectedProject === 'INBOX' || selectedProject === 0 
            ? (unsuscribe = unsuscribe.where('date','==',''))
            : unsuscribe;

            unsuscribe = unsuscribe.onSnapshot( snapshot => {
                const newTasks = snapshot.docs.map( task => ({
                    id: task.id,
                    ...task.data(),
                }));

                setTasks(
                    selectedProject === 'NEXT_7'
                    ? newTasks.filter(
                        task => moment(task.date, 'DD-MM-YYYY').diff(moment(),'days') <= 7 &&
                        task.archived !==true
                    )
                    :newTasks.filter(task => task.archived !== true)
                );

                setArchivedTasks(newTasks.filter( task => task.archived !== false ));
            });

            return () => unsuscribe();
    },[selectedProject]);

    return { tasks, archivedTask }
};

export const useProjects = () =>{
    const [projects,setProjects] = useState([]);

    useEffect(() => {
        firebase
        .firestore()
        .collection('projects')
        .where('userId','==','U4gzdNE5PbuwQLuzJax2j3BAnVxNyJ')
        .orderBy('projectId')
        .get()
        .then( snapshot => {
            const allProjects = snapshot.docs.map(project => ({
                ...project.data(),
                docId: project.id
            }));

            if(JSON.stringify(allProjects) !== JSON.stringify(projects)){
                setProjects(allProjects);
            }
        });
    },[projects]);
    
    return {projects,setProjects} 
};