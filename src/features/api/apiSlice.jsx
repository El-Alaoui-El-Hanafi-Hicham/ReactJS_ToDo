import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';


export const apiSlice = createApi({
    reducerPath :"api",
    baseQuery :fetchBaseQuery({baseUrl:"http://localhost:3000"}),
    tagTypes: ['Tasks'],
        endpoints:(builder)=>({
            getTasks :builder.query({
                query:()=>"/task",
                providesTags: (result = [], error, arg) => [
                    'Tasks',
                    ...result.map(({ id }) => ({ type: 'Tasks', id }))
                  ]
                }),
           
            addTask :builder.mutation({
                query:(data)=>({
                    url :"/task",
                    method:'POST',
                    body:data
                }),
                invalidatesTags:['Tasks']
            }) 
        }),

})
export const {useGetTasksQuery,useAddTaskMutation} = apiSlice;