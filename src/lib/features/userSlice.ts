import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Gists {
  id: string;
  createdAt: string;
  title: string;
  content: string;
  updatedAt: string;
  user: string;
}

export interface UserState {
  id: string;
  createdAt: string;
  email: string;
  picture: string;
  name: string;
  gists: Gists[];
}

const initialState: UserState = {
  id: "",
  createdAt: "",
  email: "",
  picture: "",
  name: "",
  gists: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      Object.assign(state, action.payload);
    },
    removeUser: (state) => {
      // Object.keys(state).forEach((key) => {
      //   state[key as keyof UserState] = "";
      // });
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
