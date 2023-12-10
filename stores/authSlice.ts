import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthState } from "@/models/auth";

const initialState: AuthState = {
	isLoggedin: false,
	first_name: "",
	last_name: "",
	email: "",
	avatar: "",
	role: "",
	user_id: null,
};

/*export const loginUser = createAsyncThunk(
    'auth/login',
    async ({ email, password }: LoginWithPwPayload, thunkAPI) => {
        try {
            const response = await authApi.login({ email, password });
            return response.data;
          } catch (error:any) {
            return thunkAPI.rejectWithValue(error.response.data); 
        }
    });
  
*/

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		login: (state, action: PayloadAction<AuthState>) => {
			(state.isLoggedin = true),
				(state.role = action.payload.role),
				(state.avatar = action.payload.avatar),
				(state.email = action.payload.email),
				(state.last_name = action.payload.last_name),
				(state.first_name = action.payload.first_name),
				(state.user_id = action.payload.user_id);
		},
		logout: (state) => {
			(state.isLoggedin = false),
				(state.first_name = ""),
				(state.last_name = ""),
				(state.email = ""),
				(state.avatar = ""),
				(state.role = ""),
				(state.user_id = null);
		},
	},
});
export const { logout, login } = authSlice.actions;
export default authSlice.reducer;
