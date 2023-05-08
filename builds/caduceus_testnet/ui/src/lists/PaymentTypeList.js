
import classes from '../styles/lists/List.module.css';


const PaymentTypeList = (props) =>{
    const { setPaymentType } = props;


    const selection = (type) =>{
        setPaymentType({ text: type, isValid: true });
    }

    return(
        <ul className={classes.ul}>
            <li onClick={()=>selection('Cryptocurrency')}>Cryptocurrency</li>
            <li onClick={()=>selection('Fiat')}>Fiat</li>
            <li onClick={()=>selection('Mixed Mode')}>Mixed Mode</li>
        </ul>
    )
}

export default PaymentTypeList;