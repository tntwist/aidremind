import React from 'react';
import './CategoryList.css'
import CategoryListItem from './CategoryListItem';

export default function CategoryList({ className = '', categoryTree }) {
  return (
    <div className={`category-list ${className}`}>
        {categoryTree.children.map((categoryNode, i) => (
            <CategoryListItem key={i} categoryNode={categoryNode} />
        ))}
    </div>
  );
}
