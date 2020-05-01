import { firebase } from '../../firebase';
import React from 'react';

export const Checkbox = ({id,archive}) => {
    const archiveTask = () => {
        firebase
            .firestore()
            .collection('task')
            .doc(id)
            .update({
                archive: !archive,
            });
};

return (
    <div className="checkbox-holder"
    data-testid="checkbox-action"
    onClick={()=> archiveTask()}>
    <span className="checkbox"/>
    </div>
);
}
