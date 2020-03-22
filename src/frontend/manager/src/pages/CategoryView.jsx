import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import CategoryApi from "../services/CategoryApi";
import Alert from "@material-ui/lab/Alert";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import TaskForm from "../components/TaskForm";
import Paper from "@material-ui/core/Paper";
import "./CategoryView.css";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TaskApi from "../services/TaskApi";
import format from "date-fns/format";
import { getFrequencyLabel } from "../services/utils";
import DeleteIcon from "@material-ui/icons/Delete";
import CategoryForm from "../components/CategoryForm";

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white
  },
  body: {
    fontSize: 16
  }
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.background.default
    }
  }
}))(TableRow);

function formatDate(date) {
  if (!date) return null;
  return format(new Date(date), "dd.MM.yy HH:mm");
}

export default function CategoryView({ onTriggerRefresh }) {
  const { categoryId } = useParams();
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(null);
  const histroy = useHistory();
  const [activeForm, setActiveForm] = useState(null);

  const [tasks, setTasks] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(new Date());

  function onTaskCreated() {
    setActiveForm(null);
    setRefreshTrigger(new Date());
  }

  function onCategorySaved() {
    onTriggerRefresh();

    setActiveForm(null);
    setRefreshTrigger(new Date());
  }

  useEffect(() => {
    async function refreshCategory(id) {
      try {
        const category = await CategoryApi.getOneById(id);
        setCategory(category);
      } catch (err) {
        setError(err);
      }
    }

    async function refreshTasks(categoryId) {
      console.log("Refresh tasks");
      try {
        const result = await TaskApi.getAllByCategoryId(categoryId);
        setTasks(result);
      } catch (err) {
        setError(err);
      }
    }

    refreshCategory(categoryId);
    refreshTasks(categoryId);
  }, [categoryId, refreshTrigger]);

  async function deleteTask(t) {
    try {
      await TaskApi.delete(t.taskId);
      setRefreshTrigger(new Date());
    } catch (err) {
      setError(err);
    }
  }

  async function deleteCategory() {
    try {
      await CategoryApi.delete(categoryId);
      histroy.push(
        category.parentCategoryId
          ? `/category/${category.parentCategoryId}`
          : "/"
      );
      onTriggerRefresh();
    } catch (err) {
      setError(err);
    }
  }

  return (
    <div className="category-view">
      {error && (
        <Alert severity="error" variant="filled">
          {error.message}
        </Alert>
      )}
      {!category && !error && <div>Loading ...</div>}
      {category && (
        <>
          {activeForm !== "edit" && (
            <Paper className="category-view__head">
              <div>
                <h1 className="category-view__name">{category.name}</h1>
                <div className="category-view__description">
                  {category.description}
                </div>
              </div>
              <div className="category-view__actions">
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setActiveForm("edit")}
                >
                  Bearbeiten
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  startIcon={<DeleteIcon />}
                  color="secondary"
                  onClick={deleteCategory}
                >
                  Entfernen
                </Button>
              </div>
            </Paper>
          )}
          {activeForm === "edit" && (
            <CategoryForm
              category={category}
              onCategorySaved={onCategorySaved}
              onCloseForm={() => setActiveForm(null)}
            />
          )}

          {!activeForm && (
            <div className="category-view__main-actions">
              <Button
                variant="contained"
                color="primary"
                onClick={() => setActiveForm("task")}
              >
                Aufgabe hinzufügen
              </Button>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => setActiveForm("subcategory")}
              >
                Unterkategorie hinzufügen
              </Button>
            </div>
          )}

          {activeForm === "task" && (
            <TaskForm
              categoryId={categoryId}
              onTaskCreated={onTaskCreated}
              onCloseForm={() => setActiveForm(null)}
            />
          )}

          {activeForm === "subcategory" && (
            <CategoryForm
              parentCategoryId={categoryId}
              onCategorySaved={onCategorySaved}
              onCloseForm={() => setActiveForm(null)}
            />
          )}
        </>
      )}

      {tasks && tasks.length > 0 && (
        <TasksTable tasks={tasks} deleteTask={deleteTask} />
      )}
    </div>
  );
}

function TasksTable({ tasks, deleteTask }) {
  return (
    <TableContainer component={Paper} className="category-view__table">
      <Table>
        <TableHead>
          <TableRow>
            <StyledTableCell>Aufgabe</StyledTableCell>
            <StyledTableCell>Start</StyledTableCell>
            <StyledTableCell>End</StyledTableCell>
            <StyledTableCell>Frequency</StyledTableCell>
            <StyledTableCell>Aktion</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map(task => (
            <StyledTableRow key={task.id}>
              <StyledTableCell component="th" scope="row">
                <div className="category-view__task-title">{task.title}</div>
                <div className="category-view__task-description">
                  {task.description}
                </div>
              </StyledTableCell>
              <StyledTableCell>{formatDate(task.startDate)}</StyledTableCell>
              <StyledTableCell>{formatDate(task.endDate)}</StyledTableCell>
              <StyledTableCell>
                {getFrequencyLabel(task.frequency)}
              </StyledTableCell>
              <StyledTableCell>
                <IconButton size="small" onClick={() => deleteTask(task)}>
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
