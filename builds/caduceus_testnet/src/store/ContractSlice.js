import { createSlice } from "@reduxjs/toolkit";


const ContractSlice = createSlice({
    name: 'contracts',
    initialState: {
        contract_addresses: [{ key: '', value: '' }],
        stakeERC20Currency: '',
        stakeCurrencySymbol: '',
        minStakeAmount: 0,
        stakeStatus: false,
        stakedAmount: 0
    },
    reducers:{
       saveContracts(state, action){
         const payload = action.payload;
         const contracts = payload.contracts;
         state.contract_addresses = contracts;
       },
       saveStakeData(state, action){
        const payload = action.payload;
        state.stakeERC20Currency = payload.stakeERC20Currency;
        state.stakeCurrencySymbol = payload.stakeCurrencySymbol;
        state.minStakeAmount = payload.minStakeAmount;
        state.stakeStatus = payload.stakeStatus;
        state.stakedAmount = payload.stakedAmount;
       }
    }
});

export const { saveContracts, saveStakeData } = ContractSlice.actions;
export default ContractSlice.reducer;