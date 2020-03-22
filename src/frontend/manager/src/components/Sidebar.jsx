import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import CategoryApi from '../services/CategoryApi';
import CategoryList from './CategoryList';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { generateTree } from '../services/utils';

import './Sidebar.css'

function Sidebar({ className = '' }) {
  const [error, setError] = useState(null);
  const [categoryTree, setCategoryTree] = useState(null);
  const histroy = useHistory();

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

  function addNewCategory() {
    histroy.push('/category/add');
  }

  return (
    <div className={`sidebar ${className}`}>
        <div className="sidebar__title">
            Kategorien
            <Button
              size="small"
              variant="outlined"
              startIcon={<AddIcon/>}
              onClick={addNewCategory}
            >
              Kategorie hinzufügen
            </Button>
        </div>
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
