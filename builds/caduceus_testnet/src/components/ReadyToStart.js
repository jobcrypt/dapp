

import classes from '../styles/components/ReadyToStart.module.css';


const ReadyToStart = () =>{
    return(
        <article className={classes.readyToStartContainer}>
            <h1>Ready To Start</h1>
            <p>Get the latest jobs directly to your inbox</p>
            <div className={classes.emailContainer}>
                <input type='text' placeholder='Enter your email address' />
                <button>Join Alert List</button>
            </div>
        </article>
    )
}

export default ReadyToStart;