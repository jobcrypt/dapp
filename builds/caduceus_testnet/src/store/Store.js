import { configureStore } from '@reduxjs/toolkit';
import MetaMaskReducer from './MetaMaskSlice';


export default configureStore({
    reducer: { meta: MetaMaskReducer }
})