import reactFlowSlice from "./flow-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{ flow: reactFlowSlice.reducer }
})

export default store