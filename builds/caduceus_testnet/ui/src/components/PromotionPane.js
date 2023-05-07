import { useState } from 'react';



import classes from '../styles/components/PromotionPane.module.css';
import vector1 from '../assets/Vector1.png';
import vector2 from '../assets/Vector2.png';

const PromotionPane = () =>{
    const [promoArray] = useState([ vector1, vector2, vector1, vector2, vector1, vector2, vector1, vector2 ]);


    return(
        <section className={classes.promotionPane}>
        {promoArray.map((item, idx)=>(
         <div key={idx} className={classes.jobList}>
           <img src={promoArray[idx]} alt='' />
           <h1>WEB 3 JOBS</h1>
         </div>
        ))}
       </section>
    )
}

export default PromotionPane;