import Axios from "axios";
import { environment } from "../../../environment/environment";

    export const getFaculty = () => {
       let result;
        Axios.get(`${environment.url}/faculty/all`,
        {headers: {
            Authorization: `Bearer ${(localStorage.getItem('KeyToken'))}`
          }})
       .then(res => {
           result = res.data;
       })
       .catch((error) => {
            console.error(error);
        });
        return result;

   }
  



// public async verifyMail(verifyMail : VerifyMailDTO){
//     let result = await http.post('/api/InfoLogin/ConfirmMail', verifyMail);
//     return result.data;
// }