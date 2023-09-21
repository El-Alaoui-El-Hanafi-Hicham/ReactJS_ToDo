import React, { useEffect, useState } from "react";
import {Accordion,AccordionDetails,AccordionSummary,Alert,Button,Checkbox,IconButton,Paper,Skeleton,Snackbar,SpeedDial,SpeedDialIcon,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Tooltip,Typography, TextField, FormControlLabel, FormControl, FormLabel, RadioGroup, FormHelperText, Radio, Chip,} from "@mui/material";
import { Edit, EditOff, EditTwoTone } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskAltOutlined, TaskAltTwoTone } from "@mui/icons-material";
import Swal from 'sweetalert2';

import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "./TaskSlice";
import FilterComp from "./FilterComp";
import EditModal from "./EditModal";




function ListTasksComp() {

    const [UpdateTask, { isSuccess: UpdateIsSuccess }] = useUpdateTaskMutation();
    const [DeleteTask,{isSuccess:isDeleted}] = useDeleteTaskMutation();
    const [filter, setfilter] = useState({title:'',isDone:null,  priority:"" })
    const { isError, isFetching, isLoading, isSuccess, data,refetch  } =useGetTasksQuery(filter);
    const [TaskToUpdate, setTaskToUpdate] = useState({
      id: "",
      title: "",
      description: "",
      isDone: false,
      priority:"Medium" ,
    })



async function handleFilterFieldChange(b){
 
  }
  const handleClickOpenSnackBar = () => {
    setOpenSnackBar(true);
  };

  const handleCloseSnackBar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackBar(false);
  };

  async function handleUpdateTask(task) {
    task = { ...task, isDone: !task.isDone };
    await UpdateTask(task);
    if(task.isDone){

    
    Swal.fire({
      icon: 'success', // Can be 'success', 'error', 'warning', 'info', etc.
      title: 'Task Done',
      text: 'Task Status changed To Done',
      toast: true, // This makes it a toast notification
      position: 'top-end', // You can change the position
      showConfirmButton: false, // Hide the "OK" button
      timer: 3000 // Auto close after 3 seconds
    });
  }else{
    Swal.fire({
      icon: 'success', // Can be 'success', 'error', 'warning', 'info', etc.
      title: 'Task To Do',
      text: 'Task Status changed To TODO',
      toast: true, // This makes it a toast notification
      position: 'top-end', // You can change the position
      showConfirmButton: false, // Hide the "OK" button
      timer: 3000 // Auto close after 3 seconds
    });
  }
    handleClickOpenSnackBar()
  }

  async function handleDeleteTask(id) {
    await DeleteTask(id);
    if(isDeleted){
      Swal.fire({
        icon: 'success', // Can be 'success', 'error', 'warning', 'info', etc.
        title: 'Task Deleted',
        text: 'Task Deleted Successfuly',
        toast: true, // This makes it a toast notification
        position: 'top-end', // You can change the position
        showConfirmButton: false, // Hide the "OK" button
        timer: 3000 // Auto close after 3 seconds
      });
    }
  }

  return (
    <div>

      <div className="task-list d-flex gap-3 flex-column">
      <FilterComp handleFilterFieldChange={handleFilterFieldChange} setfilter={setfilter} filter={filter}/>

        {isLoading && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">&nbsp;</TableCell>
                  <TableCell align="left">id</TableCell>
                  <TableCell align="left">title&nbsp;</TableCell>
                  <TableCell align="left">description&nbsp;</TableCell>
                  <TableCell align="left">Priority&nbsp;</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell align="left">
                    <Checkbox
                      icon={<TaskAltOutlined />}
                      checkedIcon={<TaskAltOutlined />}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {" "}
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {" "}
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
                <TableRow
                  sx={{
                    "&:last-child td, &:last-child th": {
                      border: 0,
                    },
                  }}
                >
                  <TableCell align="left">
                    <Checkbox
                      icon={<TaskAltOutlined />}
                      checkedIcon={<TaskAltOutlined />}
                    />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {" "}
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {" "}
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Skeleton animation="wave" />
                  </TableCell>
                  <TableCell align="left">
                    <Tooltip title="Delete">
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        )}
        {isError && <p>Error loading data.</p>}
        {isSuccess && (
          <>
            <div>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="left">&nbsp;</TableCell>
                      <TableCell align="left">Title&nbsp;</TableCell>
                      <TableCell align="left">Description&nbsp;</TableCell>
                      <TableCell align="left">Priority&nbsp;</TableCell>
                      <TableCell align="left">Actions&nbsp;</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {isSuccess &&
                      data.map((task) => (
                        <TableRow
                          key={task.id}
                          sx={{
                            "&:last-child td, &:last-child th": {
                              border: 0,
                            },
                          }}
                        >
                          <TableCell align="left">
                            <Checkbox
                              icon={<TaskAltOutlined />}
                              checked={task.isDone}
                              onChange={() => handleUpdateTask(task)}
                              checkedIcon={<TaskAltOutlined />}
                            />
                          </TableCell>
                        
                          <TableCell component="th" scope="row">
                            {" "}
                            {task.title}
                          </TableCell>
                          <TableCell align="left">
                            {task.description.substring(0, 100)}
                          </TableCell>
                       
                          <TableCell component="th" scope="row">
                            {" "}
                            {task.priority=="High" &&  <> <Chip label="High" color="error" /></>}
                            {task.priority=="Medium" &&  <><Chip label="Medium" color="success" /></> }
                            {task.priority=="Low" &&   <Chip label="Low" color="primary" />}
                          </TableCell>
                          <TableCell align="left">
                          <Tooltip title="Edit">
                              <IconButton
                               data-bs-toggle="modal" data-bs-target="#modifyTaskModal"
                              onClick={()=>setTaskToUpdate({
                                id: task.id,
                                title: task.title,
                                description: task.description,
                                isDone: task.isDone,
                                priority: task.priority,
                              })}
                              >
                                <Edit />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Delete">
                              <IconButton
                                onClick={() => handleDeleteTask(task.id)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
            </div>
           
          </>
        )}
    <EditModal TaskToUpdate={TaskToUpdate} setTaskToUpdate={setTaskToUpdate} UpdateTask={UpdateTask}/>  
      </div>
    </div>
  );
}

export default ListTasksComp;
