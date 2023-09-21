import {Task} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import { Button, Modal } from 'bootstrap';
import React from 'react'

function EditModal({TaskToUpdate,setTaskToUpdate,UpdateTask}) {
  function handleUpdateTask(e){
setTaskToUpdate(prev=>({...prev,[e.target.name]:e.target.value}))
  }
 async function UpdateSelectedTask(){
    await UpdateTask(TaskToUpdate)
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
              <div class="mb-3">
                <label for="taskTitle" class="form-label">Title</label>
                <input type="text" class="form-control"value={TaskToUpdate?.title} onChange={(e)=>handleUpdateTask(e)} name="title" id="taskTitle" placeholder="Enter task title"/>
              </div>
              <div class="mb-3">
                <label for="taskDescription" class="form-label">Description</label>
                <textarea class="form-control" id="taskDescription" name="description" value={TaskToUpdate?.description} onChange={(e)=>handleUpdateTask(e)} rows="3" placeholder="Enter task description"></textarea>
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