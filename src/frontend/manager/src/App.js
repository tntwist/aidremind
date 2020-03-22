import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Alert from '@material-ui/lab/Alert';
import CategoryView from './pages/CategoryView';
import CategoryDefaultForm from './pages/CategoryDefaultForm';
import HomeView from './pages/HomeView';
import CategoryApi from './services/CategoryApi';
import { generateTree } from './services/utils';

function App() {

  const [error, setError] = useState(null);
  const [categoryTree, setCategoryTree] = useState(null);
  const [refreshTrigger, setRefreshTrigger] = useState(new Date());

  function triggerRefesh() {
    setRefreshTrigger(new Date());
  }

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
  }, [refreshTrigger]);

  return (
    <div className="app">
      <Router>
        <Header className="app__header"></Header>
        { error && (
            <div className="app__error">
              <Alert severity="error" variant="filled">{error.message}</Alert>
            </div>
        )}
        
        <Sidebar categoryTree={categoryTree} className="app__sidebar"/>
 
        <div className="app__content">
          <Switch>
            <Route path="/category/add">
              <CategoryDefaultForm onTriggerRefresh={triggerRefesh} />
            </Route>
            <Route path="/category/:categoryId">
              <CategoryView onTriggerRefresh={triggerRefesh}/>
            </Route>
            <Route path="/" component={HomeView} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
