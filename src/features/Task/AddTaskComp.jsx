import React, { useEffect, useState } from "react";
import { useAddTaskMutation } from "./TaskSlice";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

function AddTaskComp() {
  const [TaskForm, setTaskForm] = useState({
    id: "",
    title: "",
    description: "",
    isDone: false,
    priority: "",
  });

  const [addTask, { isLoading: isLoading, isSuccess: AddTaskIsSuccess }] =
    useAddTaskMutation();

  function FillTaskInfo(e) {
    setTaskForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleAddTask(e) {
    e.preventDefault();
    setTaskForm((prev) => ({ ...prev, date: new Date().toISOString() }));
    let { title, description } = TaskForm;
    if (title != "" || description != "") {
      await addTask(TaskForm);
    }
  }
  useEffect(() => {
    if (AddTaskIsSuccess) {
      setTaskForm((prev) => ({ ...prev, title: "", description: "" }));
    }
  }, [AddTaskIsSuccess]);
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>ADD Task</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {AddTaskIsSuccess && (
          <Alert className="my-3" variant="filled" severity="success"> Task Added Successfully</Alert>
        )}

        <form onSubmit={(event) => handleAddTask(event)}>
          {isLoading ? (
            <>
              <div className="mb-3 d-flex flex-column align-items-start">
                <Skeleton
                  variant="text"
                  className="w-100"
                  sx={{ fontSize: "2rem" }}
                />
                <Skeleton
                  variant="text"
                  className="w-100"
                  sx={{ fontSize: "2rem" }}
                />
              </div>
              <div className="mb-3  d-flex flex-column align-items-start">
                <Skeleton
                  variant="text"
                  className="w-100"
                  sx={{ fontSize: "2rem" }}
                />
                <Skeleton
                  variant="text"
                  className="w-100"
                  sx={{ fontSize: "2rem" }}
                />
              </div>
            </>
          ) : (
            <div className="row">
              <div className="mb-3 d-flex flex-column align-items-start col-md-6 col-sm-12">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    name="title"
                    value={TaskForm.title}
                    onChange={(e) => FillTaskInfo(e)}
                    label="Title"
                    variant="outlined"
                  />
                </FormControl>
              </div>
              <div className="mb-3  d-flex flex-column align-items-start col-md-6 col-sm-12">
                <FormControl fullWidth>
                  <TextField
                    type="text"
                    id="outlined-basic"
                    name="description"
                    value={TaskForm.description}
                    onChange={(e) => FillTaskInfo(e)}
                    label="Description"
                    variant="outlined"
                  />
                </FormControl>
              </div>
              <div className="mb-3  d-flex flex-column align-items-start col-md-6 col-sm-12">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Priority
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={TaskForm.priority}
                    label="Age"
                    name="priority"
                    onChange={(e) => FillTaskInfo(e)}
                  >
                    <MenuItem value={"High"}>High Priority</MenuItem>
                    <MenuItem value={"Medium"}>Medium Priority</MenuItem>
                    <MenuItem value={"Low"}>Low Priority</MenuItem>
                  </Select>
                </FormControl>
              </div>
            </div>
          )}
          {isLoading ? (
            <LoadingButton loading variant="outlined">
              <span>Submit</span>
            </LoadingButton>
          ) : (
            <Button type="submit" variant="outlined" size="large">
              ADD TASK
            </Button>
          )}
        </form>
      </AccordionDetails>
    </Accordion>
  );
}

export default AddTaskComp;
