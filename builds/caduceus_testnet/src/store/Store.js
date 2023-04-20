import { configureStore } from '@reduxjs/toolkit';
import ContractReducer from './ContractSlice';
import UserReducer from './UserWalletSlice';

export default configureStore({
    reducer: { contracts: ContractReducer, user: UserReducer }
})