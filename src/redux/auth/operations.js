import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { authAxiosInstance, setAuthAxios } from "../api/authAxios";

export const register = createAsyncThunk(
  "auth/register",
  async (userData, thunkAPI) => {
    try {
      const response = await authAxiosInstance.post("/users/signup", userData);
      return response.data;
    } catch (error) {
      console.error("REGISTER Error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userData, thunkAPI) => {
    try {
      const response = await authAxiosInstance.post("/users/login", userData);
      const token = response.data.token;

      if (token) {
        setAuthAxios(token);
      }

      return response.data;
    } catch (error) {
      console.error("LOGIN Error:", error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const state = thunkAPI.getState();
    let token = state.auth.token;

    if (!token) {
      console.warn("🚨 Logout işlemi için geçerli bir token bulunamadı!");
      return thunkAPI.rejectWithValue("Token bulunamadı.");
    }

    if (typeof token === "object") {
      token = Object.values(token).join("");
    }

    token = token.replace(/"/g, "");

    authAxiosInstance.defaults.headers.common.Authorization = `Bearer ${token}`;

    await authAxiosInstance.post("/users/logout");

    localStorage.removeItem("persist:auth");

    setAuthAxios(null);

    return;
  } catch (error) {
    console.error("❌ LOGOUT Error:", error.response?.data || error.message);
    return thunkAPI.rejectWithValue(error.message);
  }
});
