import {Task} from '@mui/icons-material';
import { Box, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Button, Modal } from 'bootstrap';
import React from 'react'
import Swal from 'sweetalert2';

function EditModal({TaskToUpdate,setTaskToUpdate,UpdateTask}) {
  function handleUpdateTask(e){
setTaskToUpdate(prev=>({...prev,[e.target.name]:e.target.value}))
  }
 async function UpdateSelectedTask(){
   console.log(TaskToUpdate)
    await UpdateTask(TaskToUpdate)
      Swal.fire({
        icon: 'success', // Can be 'success', 'error', 'warning', 'info', etc.
        title: 'Task Updated',
        text: `Task ${TaskToUpdate.title} Added Succesfully`,
        toast: true, // This makes it a toast notification
        position: 'top-end', // You can change the position
        showConfirmButton: false, // Hide the "OK" button
        timer: 3000 // Auto close after 3 seconds
      });


  }
    
    return (
      <div class="modal fade" id="modifyTaskModal" tabindex="-1" aria-labelledby="modifyTaskModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="modifyTaskModalLabel">Modify Task</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
            
              <div className="mb-3 d-flex flex-column align-items-start col-md-6 col-sm-12">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    name="title"
                    value={TaskToUpdate?.title} onChange={(e)=>handleUpdateTask(e)} 
           label="Title"
                    variant="outlined"
                  />
                </FormControl>
              </div>
              <div className="mb-3">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    name="description"
                    value={TaskToUpdate?.description} onChange={(e)=>handleUpdateTask(e)}
                    label="Description"
                    variant="outlined"
                  />
                </FormControl>
              </div>
              <div className="mb-3">
              <FormControl fullWidth>
  <InputLabel id="demo-simple-select-label">
    Priority
  </InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    label="Age"
    name="priority"
    value={TaskToUpdate.priority}
    required // Add the required attribute
    onChange={(e) => handleUpdateTask(e)}
  >
    <MenuItem value="High">High Priority</MenuItem>
    <MenuItem value="Medium">Medium Priority</MenuItem>
    <MenuItem value="Low">Low Priority</MenuItem>
  </Select>
</FormControl>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary"  aria-label="Close"  data-bs-dismiss="modal" onClick={()=>UpdateSelectedTask()}>Save changes</button>
          </div>
        </div>
      </div>
    </div>
    );
}

export default EditModal