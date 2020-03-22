import React from "react";
import Paper from "@material-ui/core/Paper";
import { useForm } from "react-hook-form";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import "./CategoryForm.css";
import CategoryApi from "../services/CategoryApi";

export default function CategoryForm({
  category = null,
  parentCategoryId = null,
  onCategorySaved,
  onCloseForm = null
}) {
  const { register, handleSubmit, errors, reset } = useForm();

  async function onSubmit(data) {
    try {
      const newCategory = {
        pointOfOperationId: 1,
        name: data.categoryName,
        description: data.description,
        parentCategoryId: parentCategoryId
      };

      if (category) {
        newCategory.categoryId = category.categoryId;
        newCategory.parentCategoryId = category.parentCategoryId;
      }

      if (newCategory.parentCategoryId) {
        newCategory.parentCategoryId = parseInt(newCategory.parentCategoryId);
      }

      if (newCategory.categoryId) {
        newCategory.categoryId = parseInt(newCategory.categoryId);
      }

      const response = await CategoryApi.save(newCategory);
      reset();
      onCategorySaved(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <Paper className="category-form">
      <form onSubmit={handleSubmit(onSubmit)} className="category-form__body">
        <div className="category-form__title">
          {category ? `${category.name} bearbeiten` : "Neue Kategorie anlegen"}
        </div>
        <TextField
          id="categoryName"
          name="categoryName"
          label="Name"
          variant="outlined"
          inputRef={register({ required: true })}
          error={errors.categoryName ? true : false}
          helperText={
            errors.categoryName && errors.categoryName.type === "required"
              ? "Die Kategorie benötigt einen Namen"
              : ""
          }
          required
          defaultValue={category ? category.name : null}
        />
        <TextField
          id="description"
          name="description"
          label="Beschreibung"
          variant="outlined"
          inputRef={register()}
          multiline
          rows="6"
          defaultValue={category ? category.description : null}
        />

        <div className="category-form__footer">
          <Button variant="contained" color="primary" type="submit">
            {category ? "Aktualisieren" : "Hinzufügen"}
          </Button>
          {onCloseForm && (
            <Button variant="outlined" color="default" onClick={onCloseForm}>
              Abbrechen
            </Button>
          )}
        </div>
      </form>
    </Paper>
  );
}
