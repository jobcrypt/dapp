import { createSlice } from "@reduxjs/toolkit";


const MetaSlice = createSlice({
    name: 'meta',
    initialState: {
        isConnected: false,
        wallet: ''
    },
    reducers:{
        connect(state, action){
            state.isConnected = true;
        },
        disconnect(state, action){
            state.isConnected = false;
        }
    }
});

export const { connect, disconnect } = MetaSlice.actions;
export default MetaSlice.reducer;