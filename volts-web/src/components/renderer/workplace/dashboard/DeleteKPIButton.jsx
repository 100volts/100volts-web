import { CrossCircledIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { userData } from "@/components/datastore/UserStore";
import { useStore } from "@nanostores/react";
import pkg from "../../../../../package.json";

export default function DeleteButton({ kpi }) {
  const urladdress = pkg["volts-server"];
  const $userData = useStore(userData);
  const companyName = $userData.companies[0]; //todo remove hard coded call
  async function deleteKpi(prod_name) {
    const userToken = $userData.tokken;
    console.log("prod_name", prod_name);
    try {
      const body = JSON.stringify({
        company: companyName,
        kpi_name: prod_name,
      });
      const response = await fetch(`http://${urladdress}:8081/kpi`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userToken}`,
        },
        body,
      });
      const datat = await response.json();
      const { success } = datat;
    } catch (error) {
    } finally {
      window.location.reload();
    }
  }
  return (
    <>
      <Button
        disabled
        variant="destructive"
        onClick={() => deleteKpi(`${kpi.name}`)}
      >
        <CrossCircledIcon
          key={kpi}
          style={{ width: "25px" }}
        ></CrossCircledIcon>
      </Button>
    </>
  );
}
