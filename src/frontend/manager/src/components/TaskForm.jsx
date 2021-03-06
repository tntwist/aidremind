import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import UpdateIcon from "@material-ui/icons/Update";
import "./TaskForm.css";
import DateFnsUtils from "@date-io/date-fns"; // choose your lib
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TaskApi from "../services/TaskApi";
import { frequencyOptions, getFrequency } from "../services/utils";

export default function TaskForm({ task, categoryId, onTaskSaved, onCloseForm }) {

  let loadedFrequency = null;
  if (task) {
    loadedFrequency = getFrequency(task.frequency);
  }

  const { register, handleSubmit, errors, reset } = useForm();
  const [startDate, setStartDate] = useState(task && task.startDate ? new Date(task.startDate) : null);
  const [endDate, setEndDate] = useState(task && task.endDate ? new Date(task.endDate) : null);
  const [frequency, setFrequency] = useState(loadedFrequency);

  async function onSubmit(data) {
    try {
      const newTask = {
        categoryId: parseInt(categoryId),
        title: data.title,
        description: data.description,
        startDate,
        endDate,
        frequency: frequency ? frequency.value : null
      };

      if (task) {
        newTask.taskId = parseInt(task.taskId);
      }

      await TaskApi.save(newTask);
      reset();
      setStartDate(null);
      setEndDate(null);
      setFrequency(null);
      onTaskSaved();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Paper className="task-form">
      <form onSubmit={handleSubmit(onSubmit)} className="task-form__body">
        <div className="task-form__title">
          
          {task ? `${task.title} bearbeiten` : "Neue Aufgabe anlegen"}
        </div>
        <TextField
          id="title"
          name="title"
          label="Aufgabe"
          variant="outlined"
          inputRef={register({ required: true })}
          error={errors.title ? true : false}
          helperText={
            errors.title && errors.title.type === "required"
              ? "Die Aufgabe benötigt einen Titel"
              : ""
          }
          required
          defaultValue={task ? task.title : null}
        />
        <TextField
          id="description"
          name="description"
          label="Beschreibung"
          variant="outlined"
          inputRef={register()}
          multiline
          rows="6"
          defaultValue={task ? task.description : null}
        />

        <div className="task-form__dates">
          <UpdateIcon />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DateTimePicker
              id="startDate"
              name="startDate"
              label="Start Datum"
              ampm={false}
              autoOk={true}
              minutesStep={5}
              value={startDate}
              disableToolbar={true}
              showTodayButton
              disablePast
              clearable
              inputVariant="outlined"
              format={"dd.MM.yy HH:mm"}
              onChange={setStartDate}
            />

            <DateTimePicker
              id="endDate"
              name="endDate"
              label="End Datum"
              ampm={false}
              autoOk={true}
              minutesStep={5}
              value={endDate}
              disableToolbar={true}
              showTodayButton
              disablePast
              clearable
              minDate={startDate}
              inputVariant="outlined"
              format={"dd.MM.yy HH:mm"}
              onChange={setEndDate}
            />
          </MuiPickersUtilsProvider>

          <Autocomplete
            id="frequency"
            name="frequency"
            label="Wiederhungen"
            options={frequencyOptions}
            getOptionLabel={option => option.label}
            renderInput={params => (
              <TextField {...params} label="Wiederhungen" variant="outlined" />
            )}
            value={frequency}
            onChange={(event, value) => setFrequency(value)}
          />
        </div>

        <div className="task-form__footer">
          <Button variant="contained" color="primary" type="submit">
            {task ? "Aktualisieren" : "Hinzufügen"}
          </Button>
          <Button variant="outlined" color="default" onClick={onCloseForm}>
            Abbrechen
          </Button>
        </div>
      </form>
    </Paper>
  );
}
