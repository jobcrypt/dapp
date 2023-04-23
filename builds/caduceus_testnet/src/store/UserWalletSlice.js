import { createSlice } from "@reduxjs/toolkit";


const UserWalletSlice = createSlice({
    name: 'user',
    initialState: {
        wallet: '',
        isConnected: false,
        openMetaMask: false
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
       },
       openMetaMask: (state) =>{
          state.openMetaMask = true;
       },
       closeMetaMask: (state) =>{
        state.openMetaMask = false;
       }
    }
});

export const { connectUser, disconnectUser, openMetaMask, closeMetaMask } = UserWalletSlice.actions;
export default UserWalletSlice.reducer;