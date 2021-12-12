import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { message } from "antd";
import axios from "axios";
import { trackPromise } from "react-promise-tracker";

import i18n from "&config/i18n";
import { Employees, EmployeeRecord } from "./index.d";

const BASE_URL =
  "https://employee-1827f-default-rtdb.europe-west1.firebasedatabase.app";

const initialState: Employees = {
  data: [],
  initialValues: {
    id: undefined,
    email: "",
    firstName: "",
    lastName: "",
    phone: { code: "961", number: "" },
    customField1: undefined,
    customField2: undefined,
  },
  isModalVisible: false,
};

const getEmployees = createAsyncThunk(
  "employees/getEmployeesStatus",
  async (_, { rejectWithValue }) => {
    try {
      const pathname = "/employees.json";

      /** make api call */
      const response = await trackPromise(axios.get(BASE_URL.concat(pathname)));

      return response.data;
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const addEmployee = createAsyncThunk(
  "employees/addEmployeeStatus",
  async (
    { email, firstName, lastName, ...employeeBody }: EmployeeRecord,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const pathname = "/employees.json";

      /** Construct body */
      const body = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        ...employeeBody,
      };

      /** make api call */
      await trackPromise(axios.post(BASE_URL.concat(pathname), body, {}));

      return dispatch(getEmployees());
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const updateEmployee = createAsyncThunk(
  "employees/updateEmployeeStatus",
  async (
    { id, email, firstName, lastName, ...employeeBody }: EmployeeRecord,
    { rejectWithValue, dispatch }
  ) => {
    try {
      const pathname = `/employees/${id}.json`;

      /** Construct body */
      const body = {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: email.toLowerCase().trim(),
        ...employeeBody,
      };

      /** make api call */
      await trackPromise(axios.put(BASE_URL.concat(pathname), body));

      return dispatch(getEmployees());
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const deleteEmployee = createAsyncThunk(
  "employees/deleteEmployeeStatus",
  async (id: string, { rejectWithValue, dispatch }) => {
    try {
      const pathname = `/employees/${id}.json`;

      /** make api call */
      await trackPromise(axios.delete(BASE_URL.concat(pathname)));

      await dispatch(getEmployees());
    } catch (e: any) {
      return rejectWithValue(e.response?.data);
    }
  }
);

const employeesSlice = createSlice({
  name: "employees",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    setModalVisible: (state, { payload }) => {
      state.isModalVisible = payload;
    },
    setFormValues: (state, { payload }) => {
      state.initialValues = { ...payload };
    },
    resetFormValues: (state) => {
      state.initialValues = initialState.initialValues;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmployees.rejected, (state) => {
        message.error(i18n.t("employees:EMPLOYEE_GET_ERROR"));
      })
      .addCase(getEmployees.fulfilled, (state, { payload }) => {
        if (payload)
          state.data = Object.entries(payload).map((emp: [string, any]) => {
            return { id: emp[0], ...emp[1] } as EmployeeRecord;
          });
      });

    builder
      .addCase(addEmployee.fulfilled, (state) => {
        message.success(i18n.t("employees:EMPLOYEE_ADDED"));
      })
      .addCase(addEmployee.rejected, (state) => {
        message.error(i18n.t("employees:EMPLOYEE_ADDED_ERROR"));
      });

    builder
      .addCase(updateEmployee.fulfilled, (state) => {
        message.success(i18n.t("employees:EMPLOYEE_UPDATED"));
      })
      .addCase(updateEmployee.rejected, (state) => {
        message.error(i18n.t("employees:EMPLOYEE_UPDATED_ERROR"));
      });

    builder
      .addCase(deleteEmployee.fulfilled, () => {
        message.success(i18n.t("employees:EMPLOYEE_DELETED"));
      })
      .addCase(deleteEmployee.rejected, (state) => {
        message.error(i18n.t("employees:EMPLOYEE_DELETED_ERROR"));
      });
  },
});

export const employeesReducer = employeesSlice.reducer;

export const employeesActions = {
  ...employeesSlice.actions,
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
};
