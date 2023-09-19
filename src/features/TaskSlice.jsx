import {createSelectorHook} from "react-redux";
import {apiSlice} from "./api/apiSlice";
import {createEntityAdapter,createSelector} from "@reduxjs/toolkit"


const adapter = createEntityAdapter({
    sortComparer:(a,b)=>a.id<b.id,
    selectId: (entity) => entity.entityId, // R
})
const initialState= createEntityAdapter().getInitialState();


export const TaskSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
getTasks :builder.query({
    query:()=>"/task",
    transformResponse:(resp)=>{
adapter.setAll(initialState,resp)
    }
})
    })
})
export const selectResult= TaskSlice.endpoints.getTasks.select();
export const tasks = createSelector(
    selectResult,
    tasksResult=>tasksResult.data
)
export const {selectAll,selectById,selectEntities,selectTotal,selectIds}= adapter.getSelectors(state=>tasks(state) ?? initialState );
export const {useGetTasksQuery} = TaskSlice