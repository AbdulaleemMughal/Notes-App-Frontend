import { UserType } from "@/types/user.type";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type UserState = {
  user: UserType | null;
  isLoading: boolean;
};
const initialState: UserState = {
  user: null,
  isLoading: true,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<UserType>) => {
      state.user = action.payload;
      state.isLoading = false;
    },
    removeUser: (state, action: PayloadAction) => {
      state.user = null;
      state.isLoading = false;

    },
  },
});

export const { addUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
