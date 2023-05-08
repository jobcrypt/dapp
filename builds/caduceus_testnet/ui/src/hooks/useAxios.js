import axios from 'axios';
   
export const sendGetRequest = async(url) =>{
        try{
        const response = await axios.get(url, { timeout: 60000 });

        return response.data;
        }catch(err){
            console.log(err);
        }

        return '';
    }


