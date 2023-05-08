
import classes from '../styles/components/Spinner.module.css';

const Spinner = (props) =>{
    const { size, color1, color2 } = props;

    const style ={
        minWidth: size,
        minHeight: size,
        borderTopColor: color1,
        borderRightColor: color1,
        borderBottomColor: color1,
        borderLeftColor: color2,
    }
    return(
        <div style={style} className={classes.spinner}></div>
    )
}

export default Spinner;