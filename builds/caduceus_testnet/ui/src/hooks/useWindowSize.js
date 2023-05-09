import { useLayoutEffect, useState } from "react"



const useWindowSize = () =>{
    const [ width, setWidth ] = useState(window.innerWidth);

    useLayoutEffect(()=>{
        function updateWindowWidth(){
            setWidth(window.innerWidth);
        }
        updateWindowWidth();

        window.addEventListener('resize', updateWindowWidth);
        return()=>{
        window.removeEventListener('resize', updateWindowWidth);
        }
    },[]);

    return width;
}

export default useWindowSize;