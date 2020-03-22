import React from 'react';
import { useHistory } from "react-router-dom";
import CategoryList from './CategoryList';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

import './Sidebar.css'

function Sidebar({ categoryTree, className = '' }) {
  const histroy = useHistory();

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
        { categoryTree && (
            <CategoryList categoryTree={categoryTree}/>
        )}
    </div>
  );
}

export default Sidebar;
