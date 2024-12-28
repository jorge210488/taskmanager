import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../interfaces/authState.interface";

const initialState: AuthState = {
  isAuthenticated: !!localStorage.getItem("token"),
  name: localStorage.getItem("name") || null,
  email: localStorage.getItem("email") || null,
  token: localStorage.getItem("token") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: PayloadAction<{ name: string; email: string; token: string }>
    ) {
      state.isAuthenticated = true;
      state.name = action.payload.name;
      state.email = action.payload.email;
      state.token = action.payload.token;

      // Persistir los datos en localStorage
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("name", action.payload.name);
      localStorage.setItem("email", action.payload.email);
    },
    logout(state) {
      state.isAuthenticated = false;
      state.name = null;
      state.email = null;
      state.token = null;

      // Eliminar los datos de localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("name");
      localStorage.removeItem("email");
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
