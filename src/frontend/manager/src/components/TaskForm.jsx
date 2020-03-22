import React from 'react';
import Paper from '@material-ui/core/Paper';
import { useForm } from "react-hook-form";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import './TaskForm.css';

// import ExpansionPanel from '@material-ui/core/ExpansionPanel';
// import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
// import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

export default function TaskForm({ categoryId, onTaskCreated }) {
    const { register, handleSubmit, errors, reset } = useForm();

    async function onSubmit() {
        console.log('Save task');
    }

    // return (
    //     <ExpansionPanel>
    //         <ExpansionPanelSummary
    //             expandIcon={<ExpandMoreIcon />}
    //             id="panel-header"
    //         >
    //             Neue Aufgabe hinzufügen
    //         </ExpansionPanelSummary>
    //         <ExpansionPanelDetails>
    //             Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
    //             sit amet blandit leo lobortis eget.
    //         </ExpansionPanelDetails>
    //     </ExpansionPanel>
    // );

    // TODO: Continue

    return (
        <Paper className="task-form">
            <form onSubmit={handleSubmit(onSubmit)} className="task-form__body">
                <TextField
                    id="categoryName"
                    name="categoryName"
                    label="Name"
                    variant="outlined"
                    inputRef={register({ required: true })}
                    error={errors.categoryName ? true : false}
                    helperText={errors.categoryName && errors.categoryName.type === 'required' ? 'Dies ist ein Pflichtfeld' : ''}
                    required
                />
                <TextField
                    id="description"
                    name="description"
                    label="Beschreibung"
                    variant="outlined"
                    inputRef={register()}
                    multiline
                    rows="4"
                />

                <div className="category-form__footer">
                    <Button variant="contained" color="primary" type="submit">
                        {categoryId ? 'Aktualisieren' : 'Hinzufügen'}
                    </Button>
                </div>
            </form>
        </Paper>
    );
}