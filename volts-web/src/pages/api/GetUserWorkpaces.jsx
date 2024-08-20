
export default async function getUserData() {
        try{
            const userToken = localStorage.getItem("volts_token");
            const response = await fetch(
              `http://localhost:8081/api/v1/company/by/user`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
            const datat = await response.json();
            const { company_name } = datat;
            //localStorage.setItem("volts_user_role", role);

            document.getElementById('company_name').innerText = company_name

            const now = new Date();
            const timestamp = now.getTime(); // Returns the timestamp in milliseconds
            //console.log(`Current timestamp: ${timestamp}`);

            document.getElementById('company_name').innerText = CompanyButton({companyName:company_name,companyUrl:company_name,layout:Company });
        }catch (error) {//TODO add error handling
        }
    }

    /*
    function CompanyButton({ companyName, companyUrl, layout }) {
        return (
            <button onClick={layout}>
                <a id="company_name" href={companyUrl} target="_blank">{companyName}</a>
            </button>
        );
    }

    */
    await getUserData();