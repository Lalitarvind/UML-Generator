import reactFlowSlice from "./flow-slice";
import chatSlice from "./chat-slice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer:{
        flow: reactFlowSlice.reducer,
        chat: chatSlice.reducer,
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store