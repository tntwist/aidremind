import React from 'react';
import { useParams } from 'react-router-dom';

export default function CategoryView() {
    const { categoryId } = useParams();
    
    return (
        <div>Cartegory View ({ categoryId })</div>
    )
}