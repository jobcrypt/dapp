import { createSlice } from "@reduxjs/toolkit";


const UserWalletSlice = createSlice({
    name: 'user',
    initialState: {
        wallet: '',
        isConnected: false
    },
    reducers:{
       connectUser: (state, action)=>{
         const payload = action.payload;
         const wallet = payload.wallet;
         state.wallet = wallet;
         state.isConnected = true;
         console.log('Store connected: ', state.isConnected)
       },
       disconnectUser: (state)=>{
        state.wallet = '';
        state.isConnected = false;
       }
    }
});

export const { connectUser, disconnectUser } = UserWalletSlice.actions;
export default UserWalletSlice.reducer;