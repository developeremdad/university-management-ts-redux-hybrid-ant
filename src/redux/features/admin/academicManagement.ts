import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: 'POST',
        body: data
      }),
    }),
  }),
});


export const {useAddAcademicSemesterMutation} = academicManagementApi