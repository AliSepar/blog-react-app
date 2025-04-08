import { createSlice } from "@reduxjs/toolkit";

// Initial state for the auth slice
const initialState = {
  status: false, // Tracks if user is logged in (false by default)
  userData: null, // Stores user data when logged in (null initially)
};

// Create a Redux slice for authentication
const authSlice = createSlice({
  name: "auth", // Slice name (used in Redux DevTools)
  initialState, // Initial state defined above
  reducers: {
    // Define actions that modify state
    // Action: login
    login: (state, action) => {
      state.status = true; // Set status to "logged in"
      state.userData = action.payload.userData; // Store user data from payload
    },
    // Action: logout
    logout: (state) => {
      state.status = false; // Set status to "logged out"
      state.userData = null; // Clear user data
    },
  },
});

// Export the generated action creators
export const { login, logout } = authSlice.actions;

// Export the reducer to be included in the Redux store
export default authSlice.reducer;

//
//
// Key Notes for Future Reference:
// initialState
//      Default state before any actions are dispatched.
//      status: false = user is logged out.
//      userData: null = no user data loaded.

// createSlice
//      Automatically generates action creators and action types.
//      name: 'auth': Prefixes action types (e.g., 'auth/login').

// Reducers (Modify State)
// login:
//      Updates status to true.
//      Saves userData from action.payload (e.g., { userData: { id, name, email } }).

// logout:
//      Resets state to initialState.

// Exports
//      Actions: login and logout can be dispatched in components.
//      Reducer: Added to the Redux store (e.g., store.js).
