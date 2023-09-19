import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useGetTasksQuery,useAddTaskMutation } from './features/api/apiSlice' 
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from '@mui/material'

function App() {
  const [count, setCount] = useState(0)
  const {isError,isFetching,isLoading,isSuccess,data } = useGetTasksQuery();
  const  [TaskForm, setTaskForm] = useState({id:'',title:"",description:"",isDone:'false',date:''});
  const [addTask, { isLoading:isLoading2,isSuccess:mutationIsSuccecc }] = useAddTaskMutation();
  const [tasks, setTasks] = useState([]); // Initialize tasks state

  useEffect(() => {
    if (isSuccess) {
      // Update tasks state when data changes
      setTasks(data);
    }
  }, [data, isSuccess]);
  function FillTaskInfo(e){
setTaskForm(prev=>({...prev,[e.target.title]:e.target.value}))
  }
  function handleAddTask(e) {
    e.preventDefault();
    setTaskForm(prev=>({...prev, date: new Date().toISOString()}))
    // console.log(TaskForm)
    addTask(TaskForm);

  }

  
  return (
    <>

  <form onSubmit={(event) => handleAddTask(event)}>
  <div className="mb-3">
    <label htmlFor="exampleInputTitle" className="form-label">Title</label>
    <input type="text" className="form-control" name='title' onChange={(e)=>FillTaskInfo(e)} id="exampleInputTitle" aria-describedby="TitleHelp"/>
    <div id="TitleHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
    <input type="text" className="form-control" name='description' onChange={(e)=>FillTaskInfo(e)}  id="exampleInputDescription"/>
  </div>
 
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
<div className="task-list">
        <h2>Task List</h2>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading data.</p>}
        {isSuccess && (
          <ul>
            {data.map((task) => (
              <li key={task.id}>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                {/* You can display other task properties here */}
              </li>
            ))}
          </ul>
        )}
        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">id</TableCell>
            <TableCell align="right">title&nbsp;(g)</TableCell>
            <TableCell align="right">description&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { isSuccess && data.map((task) => (
            <TableRow
              key={task.title}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {task.title}
              </TableCell>
              <TableCell align="right">{task.description}</TableCell>
              <TableCell align="right">{task.isDone}</TableCell>
         
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </div>
    </>
  )
}

export default App
