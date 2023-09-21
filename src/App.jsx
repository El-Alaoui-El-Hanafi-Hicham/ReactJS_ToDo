import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import ListTasksComp from "./features/Task/ListTasksComp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AddTaskComp from "./features/Task/AddTaskComp";
import Button from '@mui/material/Button'




function App() {

  
  const [tasks, setTasks] = useState([]); // Initialize tasks state



  function handleEditTask(task){
    
  }

 

  return (
    <div className="p-3 d-flex flex-column gap-5">

          <AddTaskComp />
     <ListTasksComp />
          
    </div>
  );
}

export default App;
