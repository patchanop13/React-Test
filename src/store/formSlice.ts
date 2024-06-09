import { createSlice } from "@reduxjs/toolkit";
import { size } from "lodash";
import { v4 as uuidv4 } from "uuid";

export interface IUser {
  id: string;
  nameTitle: { key: string; label: string };
  firstname: string;
  lastname: string;
  dateOfBirth: string | null;
  nationality: { key: string; label: string };
  nationalId1: string;
  nationalId2: string;
  nationalId3: string;
  nationalId4: string;
  nationalId5: string;
  passportNo: string;
  gender: string;
  phonePrefix: { key: string; label: string };
  phoneNumber: string;
  expectedSalary: string;
}

export interface IErrors {
  firstname?: string;
  lastname?: string;
  nameTitle?: string;
  dateOfBirth?: string;
  nationality?: string;
  gender?: string;
  phonePrefix?: string;
  phoneNumber?: string;
  expectedSalary?: string;
  nationalId1?: string;
  nationalId2?: string;
  nationalId3?: string;
  nationalId4?: string;
  nationalId5?: string;
  passportNo?: string;
}

export interface IFormState {
  users: IUser[];
  user: IUser;
  selectedRowKeys: React.Key[];
  isSelectedAll: boolean;
  errors: IErrors;
}

const initialState: IFormState = {
  users: [],
  user: {
    id: "",
    nameTitle: { key: "", label: "" },
    firstname: "",
    lastname: "",
    dateOfBirth: null,
    nationality: { key: "", label: "" },
    nationalId1: "",
    nationalId2: "",
    nationalId3: "",
    nationalId4: "",
    nationalId5: "",
    passportNo: "",
    gender: "",
    phonePrefix: { key: "", label: "" },
    phoneNumber: "",
    expectedSalary: "",
  },
  selectedRowKeys: [],
  isSelectedAll: false,
  errors: {},
};

export const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setDataFromLocalStorage: (state, actions) => {
      if (actions.payload.users) state.users = actions.payload.users;
      if (actions.payload.user) state.user = actions.payload.user;
      if (actions.payload.selectedRowKeys)
        state.selectedRowKeys = actions.payload.selectedRowKeys;
      if (actions.payload.isSelectedAll)
        state.isSelectedAll = actions.payload.isSelectedAll;
    },
    addUsers: (state) => {
      state.users.push({ ...state.user, id: uuidv4() });
      state.errors = {};
      state.user = initialState["user"];
      state.isSelectedAll = false;
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("user", JSON.stringify(state.user));
      localStorage.setItem(
        "isSelectedAll",
        JSON.stringify(state.isSelectedAll)
      );
    },
    editUsers: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index >= 0) state.users[index] = state.user;
      state.user = initialState["user"];
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    editUser: (state, action) => {
      state.user[action.payload.name as "firstname"] = action.payload.value;
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    clearUser: (state) => {
      state.user = initialState["user"];
      state.errors = {};
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    selectEditedUser: (state, action) => {
      const index = state.users.findIndex(
        (user) => user.id === action.payload.id
      );
      if (index >= 0) state.user = state.users[index];
      state.errors = {};
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    selectRow: (state, action) => {
      state.selectedRowKeys = action.payload;
      state.isSelectedAll =
        size(action.payload) === size(state.users) ? true : false;
      localStorage.setItem(
        "isSelectedAll",
        JSON.stringify(state.isSelectedAll)
      );
      localStorage.setItem(
        "selectedRowKeys",
        JSON.stringify(state.selectedRowKeys)
      );
    },
    deleteRow: (state) => {
      state.users = state.users.filter(
        (user) => !state.selectedRowKeys.includes(user.id)
      );
      state.isSelectedAll = false;
      localStorage.setItem("users", JSON.stringify(state.users));
      localStorage.setItem(
        "isSelectedAll",
        JSON.stringify(state.isSelectedAll)
      );
    },
    changeSelectedAll: (state) => {
      state.isSelectedAll
        ? (state.selectedRowKeys = [])
        : (state.selectedRowKeys = state.users?.map((item) => item.id));
      state.isSelectedAll = !state.isSelectedAll;
      localStorage.setItem(
        "isSelectedAll",
        JSON.stringify(state.isSelectedAll)
      );
      localStorage.setItem(
        "selectedRowKeys",
        JSON.stringify(state.selectedRowKeys)
      );
    },
    setErrors: (state, actions) => {
      state.errors = actions.payload;
    },
  },
});

export const {
  addUsers,
  editUsers,
  editUser,
  clearUser,
  selectEditedUser,
  selectRow,
  deleteRow,
  changeSelectedAll,
  setDataFromLocalStorage,
  setErrors,
} = formSlice.actions;

export default formSlice.reducer;
