import React, { useEffect, useState } from 'react'
import {Accordion,AccordionDetails,AccordionSummary,Typography, TextField, FormControl, FormLabel, Radio, InputLabel, Select, MenuItem, Paper,} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFilterTasksQuery } from './TaskSlice';
import { styled } from '@mui/material/styles';

const DemoPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
}));
export default function FilterComp({handleFilterFieldChange,setfilter,filter}) {
useEffect(() => {
 console.log(filter)
}, [filter]);
    return (
<DemoPaper square={false}>
            
                <form className='row' >
                    <TextField
                      id=""
                      label="Search"
                      className='col-md-4 col-sm-6'
 name="search"                     
 onChange={(e) => setfilter(filter=>({...filter,title:e.target.value }))} 
                     />
                   <FormControl   className='col-md-4 col-sm-6'>
  <FormLabel id="demo-radio-buttons-group-label">Status</FormLabel>
  <div className='d-flex'>
    <div>
    ALL
  <Radio
  onChange={() => setfilter(filter=>({...filter,isDone:null }))}
  checked={filter.isDone==null}
  value={null}
  label="All"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'All' }}
/>
</div>
<div>
Done
<Radio
  onChange={() => setfilter(filter=>({...filter,isDone:true }))
}
  checked={filter.isDone==true}
  value={true}
  label="Done"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'Done' }}
/>
</div>
<div>
TODO
<Radio
  onChange={() => setfilter(filter=>({...filter,isDone:false  }))}
  checked={filter.isDone==false}
  value={false}
  label="TODO"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'Not Yet' }}
/>
</div>
    </div>
</FormControl>
<FormControl    className='col-md-4 col-sm-6'>
<InputLabel id="demo-simple-select-label">Priority</InputLabel>

                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={filter.priority}
                    label="Priority"
                    name="priority"
                    onChange={(e) => setfilter(filter=>({...filter,priority:e.target.value }))} 
                  >
                    <MenuItem value={"High"}>High Priority</MenuItem>
                    <MenuItem value={"Medium"}>Medium Priority</MenuItem>
                    <MenuItem value={"Low"}>Low Priority</MenuItem>
                  </Select>
                </FormControl>
                </form>
                </DemoPaper>

  )
}
