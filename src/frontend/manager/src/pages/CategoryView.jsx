import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useHistory } from "react-router-dom";
import CategoryApi from '../services/CategoryApi';
import Alert from '@material-ui/lab/Alert';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import TaskForm from '../components/TaskForm';
import Paper from '@material-ui/core/Paper';
import './CategoryView.css'


export default function CategoryView() {
    const { categoryId } = useParams();
    const [error, setError] = useState(null);
    const [category, setCategory] = useState(null);
    const histroy = useHistory();

    useEffect(() => {
        async function refreshCategory(id) {
            try {
                const category = await CategoryApi.getOneById(id);
                setCategory(category);
            } catch (err) {
                setError(err);
            }
        }

        refreshCategory(categoryId);
    }, [categoryId]);

    function editCategory() {
        histroy.push(`/category/${category.id}/edit`);
    }

    
    return (
        <div className="category-view">
            { error && (
                <Alert severity="error" variant="filled">{error.message}</Alert>
            )}
            {!category && !error && (
                <div>Loading ...</div>
            )}
            {category && (
                <>
                    <Paper className="category-view__head">
                        <div>
                            <h1 className="category-view__name">{ category.name }</h1>
                            <div className="category-view__description">{ category.description }</div>
                        </div>
                        <Button
                            size="small"
                            variant="outlined"
                            startIcon={<EditIcon/>}
                            onClick={editCategory}
                            >
                            Kategorie bearbeiten
                        </Button>
                    </Paper>
                    <TaskForm />
                </>
            )}
        </div>
    )
}