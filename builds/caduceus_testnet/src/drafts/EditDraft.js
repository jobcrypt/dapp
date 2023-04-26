

import classes from '../styles/popups/PostJobPopup.module.css';
import backIcon from '../assets/back.png'
import dropdownIcon from '../assets/dropdown.png';

const EditDraft = (props) =>{
    const { setDispatch } = props;


    return(
        <main className={classes.box} onClick={(e)=>e.stopPropagation()}>
        <section className={classes.backSection}>
            <img src={backIcon} alt=''  onClick={()=>setDispatch({ TYPE: 'CREATE_DRAFT' })} />
        </section>
        <section className={classes.contentSection}>
            <h1 className={classes.draftTxt}>Edit Draft Job Posting</h1>
            <p className={classes.note}>Note: Listings duration only start after posting(Pay later).</p>
            <p className={classes.jobPostingTxt}>Select Draft Job Posting To Edit*</p>
            <span className={classes.dropDownView}>
                {/* <p>Title :: Status :: Draft :: Txn :: 0xgY78GFb8Fjm...6JkujbTTWHIFE563fT</p> */}
                <p>Title :: Status :: Draft :: Txn</p>
                <img src={dropdownIcon} alt='' />
            </span>
            <div className={classes.btnContainer}>
            <button className={classes.linearGradBtn} onClick={()=>setDispatch({ TYPE: 'CREATE_FORM' })}>Continue Posting</button>
            <button className={classes.normalBtn} onClick={()=>setDispatch({ TYPE: 'CREATE_FORM' })}>Edit Draft Job Posting</button>
            <p>Warning: This action incurs gas fee</p>
        </div>
        </section>
        </main>
    )
}

export default EditDraft;