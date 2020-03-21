import React from 'react';
import './App.css';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import CategoryView from './pages/CategoryView';
import CategoryForm from './pages/CategoryForm';
import HomeView from './pages/HomeView';

function App() {
  return (
    <div className="app">
      <Router>
        <Header className="app__header"></Header>
        
        <Sidebar className="app__sidebar"/>
 
        <div className="app__content">
          <Switch>
            <Route path="/category/add" component={CategoryForm} />
            <Route path="/category/:categoryId" component={CategoryView} />
            <Route path="/" component={HomeView} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
