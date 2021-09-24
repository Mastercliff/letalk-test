import axios from "axios";
import { API_URL } from "./Constants";

const LoanService = {} as any;


LoanService.simulatePost  = async (data: any) =>{
   return await axios.post(
    `${API_URL}/loan/simulate`, 
    data,
    {
        headers:{
        'content-type': 'application/json',
        },
    }
   );
};

LoanService.post  = async (data: any) =>{
    return await axios.post(
     `${API_URL}/loan`, 
     data,
     {
         headers:{
         'content-type': 'application/json',
         },
     }
    );
 };


export default LoanService;