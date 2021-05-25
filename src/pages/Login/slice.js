import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import STATUS from "../../constants/status";
import {
  ENDPOINT,
  SIGNUP_STATUS_INFO,
  UNKNOWN_ERROR_MESSAGE,
} from "../../api/constants";
import http from "../../api/http";

export const login = createAsyncThunk(
  "login/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await http.post(ENDPOINT.LOGIN, {
        body: { email, password },
      });

      const { accessToken, message } = await response.json();

      if (response.status === 200) {
        return accessToken;
      }

      if (response.status in SIGNUP_STATUS_INFO) {
        return rejectWithValue(SIGNUP_STATUS_INFO[response.status].MESSAGE);
      }

      return rejectWithValue(message);
    } catch (error) {
      console.error(error);

      return rejectWithValue(UNKNOWN_ERROR_MESSAGE);
    }
  }
);

// TODO: accessToken localStorage 최초로드 (1시간 지났으면 null으로 세팅)
const initialState = {
  status: STATUS.IDLE,
  accessToken: null,
  message: "",
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = STATUS.LOADING;
    },
    [login.fulfilled]: (state, action) => {
      state.status = STATUS.SUCCEED;
      state.message = SIGNUP_STATUS_INFO[200].MESSAGE;
      state.accessToken = action.payload;

      // TODO: accessToken localStorage 저장 (시간도 같이)
    },
    [login.rejected]: (state, action) => {
      state.status = STATUS.FAILED;
      state.message = action.payload;
      state.error = action.error;
    },
  },
});

export const { reset } = loginSlice.actions;

export default loginSlice.reducer;
