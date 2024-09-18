import { CrossCircledIcon } from '@radix-ui/react-icons'
import { Button } from "@/components/ui/button"
import { userData } from "@/pages/store/UserStore";
import { useStore } from '@nanostores/react';
import pkg from "../../../../../package.json";

export default function DeleteButton({production}){
  const urladdress = pkg["volts-server"];
  const $userData=useStore(userData);
  const companyName = $userData.companies[0];//todo remove hard coded call
async function deleteProd(prod_name){   

  const userToken =$userData.tokken
    try{
      const body = JSON.stringify({
        company_name: companyName,
        production_name:prod_name,
      });
      const response = await fetch(
        `http://${urladdress}:8081/water`,
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
  }catch (error) {
} finally {
    window.location.reload();
}
;
}
    return(
    <>
        <Button variant="destructive"  onClick={() =>deleteProd(`${production.name}`)}>
            <CrossCircledIcon key={production} style={{ width: "25px" }}></CrossCircledIcon>
        </Button>
    </>
    )
}