// Import the Redux Toolkit store configuration function
import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

// Create the Redux store
const store = configureStore({
  reducer: {
    auth: authSlice,
    //TODO: add more slices here for posts
  }, // Add your reducers/slices here (e.g., auth, posts, etc.)
});

// Export the store to be used in your app (e.g., in index.js or main.jsx)
export default store;
