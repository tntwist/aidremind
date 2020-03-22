import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";
import './CategoryForm.css'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CategoryApi from '../services/CategoryApi';
import Alert from '@material-ui/lab/Alert';
import { useParams, useHistory } from 'react-router-dom';

export default function CategoryForm() {
    const { register, handleSubmit, errors, reset } = useForm();
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null);
    const { categoryId } = useParams();
    const history = useHistory();

    useEffect(() => {
        async function refreshCategory(id) {
            try {
                const category = await CategoryApi.getOneById(id);
                setCategory(category);
            } catch (err) {
                setError(err);
            }
        }

        categoryId && refreshCategory(categoryId);
    }, [categoryId]);

    async function onSubmit(data) {
        try {
            const newCategory = {
                name: data.categoryName,
                description: data.description,
                parentId: null,
            };

            if (categoryId) {
                newCategory.id = category.id;
            }

            const response = await CategoryApi.save(newCategory);
            reset();
            history.push(`/category/${response.id}`);
        } catch (err) {
            console.error(err);
        }
    }
    
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="category-form">
            { error && (
                <Alert severity="error" variant="filled">{error.message}</Alert>
            )}
            {categoryId && !category && !error && (
                <div>Loading ...</div>
            )}
            {(!categoryId || category) && (
                <>
                    <h1>{categoryId ? `${category.name} bearbeiten` : 'Neue Kategorie anlegen'}</h1>
                    <div className="category-form__form">
                        <TextField
                            id="categoryName"
                            name="categoryName"
                            label="Name"
                            variant="outlined"
                            inputRef={register({ required: true })}
                            error={errors.categoryName ? true : false}
                            helperText={errors.categoryName && errors.categoryName.type === 'required' ? 'Dies ist ein Pflichtfeld' : ''}
                            required
                            defaultValue={category && category.name}
                        />
                        <TextField
                            id="description"
                            name="description"
                            label="Beschreibung"
                            variant="outlined"
                            inputRef={register()}
                            multiline
                            rows="4"
                            defaultValue={category && category.description}
                        />
        
                        <div className="category-form__footer">
                            <Button variant="contained" color="primary" type="submit">
                                {categoryId ? 'Aktualisieren' : 'Hinzufügen'}
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </form>
    )
}