import { createSelectorHook } from "react-redux";
import { apiSlice } from "../api/apiSlice";
import { createEntityAdapter, createSelector } from "@reduxjs/toolkit";

// const adapter = createEntityAdapter({
//     sortComparer:(a,b)=>a.id<b.id,
//     selectId: (entity) => entity.entityId, // R
// })
// const initialState= createEntityAdapter().getInitialState();

export const TaskSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getTasks: builder.query({
      query: ({ title, isDone,priority }) => {
        let queryUrl = "/task";
        if (title != "") {
          queryUrl += `?title=${title}`;
        }
        if (priority !== '') {
          queryUrl += title ? `&priority=${priority}`:`?priority=${priority}`;
        }
        if (isDone !== null) {
          queryUrl += title || priority? `&isDone=${isDone}` : `?isDone=${isDone}`;
        }
        console.log(queryUrl)
        return queryUrl;
      },
      providesTags: (result = [], error, arg) => [
        "Tasks",
        ...result.map(({ id }) => ({ type: "Tasks", id })),
      ],
    }),

    addTask: builder.mutation({
      query: (data) => ({
        url: "/task",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    UpdateTask: builder.mutation({
      query: (data) => ({
        url: "/task/" + data.id,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Tasks"],
    }),
    EditTask: builder.mutation({
      query: (data) => ({
        url: "/task/" + data.id,
        method: "PATCH",
        body: data,
      }),
    }),

    DeleteTask: builder.mutation({
      query: (id) => ({
        url: "/task/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});
// export const {selectAll,selectById,selectEntities,selectTotal,selectIds}= adapter.getSelectors()
export const {
  useGetTasksQuery,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
  useFilterTasksQuery,
} = apiSlice;
