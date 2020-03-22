import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';
import './CategoryListItem.css'

export default function CategoryListItem({ className = '', categoryNode }) {
    const routePath = `/category/${categoryNode.item.categoryId}`;
    const isActive = !!useRouteMatch(routePath);

    const classes = [
        'category-list-item',
        className,
        isActive ? 'category-list-item--active' : '',
    ].join(' ').trim();

    return (
        <div className={classes}>
            <NavLink to={routePath} activeClassName="category-list-item__trigger--active" className="category-list-item__trigger">
                {categoryNode.item.name}
            </NavLink>
            { categoryNode.children.length > 0 && (
                <div className="category-list-item__list">
                    {categoryNode.children.map((childNode, i) => (
                        <CategoryListItem key={i} categoryNode={childNode} />
                    ))}
                </div>
            )}
        </div>
    );
}