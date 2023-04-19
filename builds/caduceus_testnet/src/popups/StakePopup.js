import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';


import classes from '../styles/popups/StakePopup.module.css';
import thumbsIcon from '../assets/thumbs_up.png';
import { stake } from '../store/ContractSlice';
import { readContracts, useAccount, useContractRead } from 'wagmi';
import iJCStakeManagerAbi from '../abi/i_jc_stake_manager_abi';
import iOpenRegisterAbi from '../abi/i_open_register_abi';
import { isNull } from '../utils/Util';


const StakePopup = (props) =>{
    const { setOpenStakePopup } = props;
    const navigate = useNavigate();
    // const { data: address } = useContractRead({
    //     address: '0xEfdeAC0C0778DED8eA0a72be3D93258F44Ff9627',
    //     abi: iOpenRegisterAbi,
    //     functionName: 'getAddress',
    //     args: ['RESERVED_JOBCRYPT_STAKE_MANAGER_CORE'],
    //     onSuccess: (data) =>{
    //         console.log('result ', data)
    //     },
    //     onError: (err)=>{
    //         // console.log('error occured: ',err)
    //     },
    //     onSettled: () =>{
            
    //     }
    //     // chainId: 111155111
    // });

    // useEffect(()=>{
    //     if(isNull(address))return;
    //     console.log(address);
    // },[address]);


    useEffect(()=>{
        (async()=>{
            const data = await readContracts({
                contracts: [
                    {
                    address: '0xEfdeAC0C0778DED8eA0a72be3D93258F44Ff9627',
                    abi: iOpenRegisterAbi,
                    functionName: 'getAddress',
                    args: ['RESERVED_JOBCRYPT_STAKE_MANAGER_CORE'],
                    },
                ],
                overrides: {from: 'nnnnnn'}
            })
            console.log('result: ',data)
        })();
    },[]);

    const stakeHandler = () =>{
        // navigate('/browse-job'); 
        // setOpenStakePopup(false);
        // dispatch(stake());
    }


    return(
        <section className={classes.parent} onClick={()=>setOpenStakePopup(false)}>
            <div className={classes.box} onClick={(e)=>e.stopPropagation()}>
                <img src={thumbsIcon} alt='' className={classes.thumbsIcon} />
                <h1>Transaction Approved</h1>
                <p>Your metamask funded, you can now apply for jobs</p>
                <button onClick={stakeHandler}>Apply Now</button>
            </div>
        </section>
    )
}

export default StakePopup;