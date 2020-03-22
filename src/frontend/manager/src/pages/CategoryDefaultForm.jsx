import React from 'react';
import './CategoryDefaultForm.css'
import CategoryForm from '../components/CategoryForm';
import { useHistory } from 'react-router-dom';

export default function CategoryDefaultForm() {
    const history = useHistory();

    function onCategorySaved(category) {
        history.push(`/category/${category.id}`);
    }

    return (
        <CategoryForm
            onCategorySaved={onCategorySaved}
        />
    )
}