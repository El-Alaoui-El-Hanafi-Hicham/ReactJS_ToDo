import React, { useEffect, useState } from "react";
import {Accordion,AccordionDetails,AccordionSummary,Alert,Button,Checkbox,IconButton,Paper,Skeleton,Snackbar,SpeedDial,SpeedDialIcon,Table,TableBody,TableCell,TableContainer,TableHead,TableRow,Tooltip,Typography, TextField, FormControlLabel, FormControl, FormLabel, RadioGroup, FormHelperText, Radio, Chip,} from "@mui/material";
import { Edit, EditOff, EditTwoTone } from "@mui/icons-material";
import DeleteIcon from "@mui/icons-material/Delete";
import { TaskAltOutlined, TaskAltTwoTone } from "@mui/icons-material";
import {
  useGetTasksQuery,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} from "./TaskSlice";
import FilterComp from "./FilterComp";
import EditModal from "./EditModal";




function ListTasksComp() {

    const [UpdateTask, { isSuccess: UpdateIsSuccess }] = useUpdateTaskMutation();
    const [DeleteTask] = useDeleteTaskMutation();
    const [filter, setfilter] = useState({title:'',isDone:null})
    const { isError, isFetching, isLoading, isSuccess, data,refetch  } =useGetTasksQuery(filter);
    const [TaskToUpdate, setTaskToUpdate] = useState({
      id: "",
      title: "",
      description: "",
      isDone: false,
      date: new Date().toISOString() ,
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
    
    console.log("IT IS " +openSnackBar)
    handleClickOpenSnackBar()
  }

  async function handleDeleteTask(id) {
    await DeleteTask(id);
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
                            {task.priority=="High" &&  <><WarningIcon/> <Chip label="High" color="danger" /></>}
                            {task.priority=="Medium" &&  <><Chip label="Medium" color="success" /></> }
                            {task.priority=="Low" &&   <Chip label="Low" color="danger" />}
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
                                date: task.date,
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
