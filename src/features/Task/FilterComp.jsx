import React, { useState } from 'react'
import {Accordion,AccordionDetails,AccordionSummary,Typography, TextField, FormControl, FormLabel, Radio,} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useFilterTasksQuery } from './TaskSlice';

export default function FilterComp({handleFilterFieldChange,setfilter,filter}) {

    return (
    <div>

<Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Filter</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <form className='d-flex gap-3 align-items-center justify-content-center flex-wrap' >
                    <TextField
                      id=""
                      label="Search"
 name="search"                     
 onChange={(e) => setfilter(filter=>({...filter,title:e.target.value }))} 
                    />
                   <FormControl>
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
Not Yet
<Radio
  onChange={() => setfilter(filter=>({...filter,isDone:false  }))}
  checked={filter.isDone==false}
  value={false}
  label="Not Yet"
  name="radio-buttons"
  inputProps={{ 'aria-label': 'Not Yet' }}
/>
</div>
    </div>
</FormControl>
                </form>
              </AccordionDetails>
            </Accordion>

    </div>
  )
}
