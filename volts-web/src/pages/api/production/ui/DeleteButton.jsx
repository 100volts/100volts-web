import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"

import pkg from "../../../../../package.json";
  
const urladdress = pkg["volts-server"];
const companyName = localStorage.getItem("company_name");
const userToken = localStorage.getItem("volts_token");

async function deleteProd(prod_name){
    console.log("prop name",prod_name)
   
    try{
      const body = JSON.stringify({
        company_name: companyName,
        production_name:prod_name,
      });
      console.log("body",body)
      const response = await fetch(
        `http://${urladdress}:8081/production`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
          body,
        }
      );
      const datat = await response.json();
      const { success } = datat;
      console.log(success);
  }catch (error) {
    console.error('Error submitting form:', error);
} finally {
    console.log('Form submission process completed');
    window.location.reload();
}
;
}

export default function DeleteButton({production}){
    return(
    <>
        <Button variant="destructive" onClick={() =>deleteProd(`${production.name}`)}>
            <CrossCircledIcon></CrossCircledIcon>
        </Button>
    </>
    )
}