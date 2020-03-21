import React, { useState, useEffect } from 'react';
import CategoryApi from '../services/CategoryApi';
import './Sidebar.css'
import CategoryList from './CategoryList';
import { generateTree } from '../services/utils';

function Sidebar({ className = '' }) {
  const [error, setError] = useState(null);
  const [categoryTree, setCategoryTree] = useState(null);

  async function refreshCategories() {
    try {
      const categories = await CategoryApi.getAll();
      console.log(categories);
      const tree = generateTree(categories);
      setCategoryTree(tree);
    } catch (err) {
      setError(err);
    }
  }

  useEffect(() => {
    refreshCategories();
  }, []);

  return (
    <div className={`sidebar ${className}`}>
        <div className="sidebar__title">Kategorien</div>
            { error && (
                <div className="sidebar__error">Error: {error.message}</div>
            )}
            { categoryTree && (
                <CategoryList categoryTree={categoryTree}/>
            )}
    </div>
  );
}

export default Sidebar;
