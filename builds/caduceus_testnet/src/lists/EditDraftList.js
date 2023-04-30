

import classes from '../styles/lists/List.module.css';
import { isNull } from '../utils/Util';
import Wrapper from '../components/Wrapper';
import Spinner from '../components/Spinner';
import { useContext } from 'react';
import { FormContext } from '../App';


const EditDraftList = (props) =>{
    const { setSelectedDraft, setIsEditing, draftArray, isLoading, message } = props;
    const { setEmployerPostingAddress } = useContext(FormContext);



    const selection = (titleTxt, status, postingAddress, name) =>{
        const value ="Title :: " + titleTxt + " :: status :: " + status + " :: " + postingAddress + " :: "+ name;
        setSelectedDraft({ text: value, isVisible: false, address: postingAddress });
        setIsEditing('EDITING DRAFT :: '+postingAddress);
        setEmployerPostingAddress(postingAddress);
       
    }

    const display = (titleTxt, status, postingAddress, name)=>{
      return "Title :: " + titleTxt + " :: status :: " + status + " :: " + postingAddress + " :: "+ name;
    }

    return(
        <ul className={classes.ul}>
            {isNull(draftArray) && <Wrapper height='fit-content'>
                 {isLoading &&<Spinner size={40} color1='#2c2231' />}
                 {(isNull(draftArray) && !isLoading) &&<p className={classes.txt}>{message}</p>}
                </Wrapper>}
            {(!isNull(draftArray) && draftArray.map(item=>(
               <li key={item.draftPostingAddress} onClick={()=>selection(item.jobTitle, item.status, item.draftPostingAddress, item.name)}>{display(item.jobTitle, item.status, item.draftPostingAddress, item.name)}</li>
            )))}
            
        </ul>
    )
}

export default EditDraftList;