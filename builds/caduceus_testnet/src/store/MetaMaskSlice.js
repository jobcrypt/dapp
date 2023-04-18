import { createSlice } from "@reduxjs/toolkit";


const MetaSlice = createSlice({
    name: 'meta',
    initialState: {
        isConnected: false,
        wallet: '',
        isStaked: false
    },
    reducers:{
        connect(state, action){
            const payload = action.payload;
            state.isConnected = true;
            state.wallet = payload.wallet;
            console.log('metamask slice: ', state.isConnected);
        },
        disconnect(state){
            state.isConnected = false;
            state.wallet = '';
        },
        stake(state){
            state.isStaked = true;
        },
        unstake(state){
            state.isStaked = false;
        }
    }
});

export const { connect, disconnect, stake, unstake } = MetaSlice.actions;
export default MetaSlice.reducer;