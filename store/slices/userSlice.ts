import { UserType } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user: UserType | null;
};
const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
    },
    removeUser: (state, action: PayloadAction) => {
      state.user = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
