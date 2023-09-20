import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from './features/store.jsx';
import { TaskSlice } from './features/Task/TaskSlice.jsx';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ListTasksComp from './features/Task/ListTasksComp.jsx';
import AddTaskComp from './features/Task/AddTaskComp.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
        <Provider store={store}>
   
        <App/> 
      
        </Provider>
  </React.StrictMode>
);
