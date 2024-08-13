const form = document.querySelector("form");
import pkg from '../../../package.json' assert { type: 'json' };
import Company from "../../../components/Company.astro"
    const address = pkg["volts-server"];
//var cors = require('cors');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);


  const response = await fetch(
    `http://${address}:8081/api/vi/auth/authenticate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    }
  );
  const datat = await response.json();
  const { access_token } = datat;
  const { role } = datat;

  localStorage.setItem("volts_token", access_token);
  localStorage.setItem("volts_user_role", role);
  await getUserData();
  
  if (response.ok) {
    console.log(datat);
    location.href = "/";
  }
  /*
  console.log(response);
  const result = document.querySelector("#result");

  console.log(result);
  console.log(data.get("email"));
  console.log(data.get("pass"));
    */
});


    async function getUserData() {
        try{
            const userToken = localStorage.getItem("volts_token");
            const response = await fetch(
              `http://${address}:8081/api/v1/company/by/user`,
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

            localStorage.setItem("company_name", company_name);
            //document.getElementById('company_name').innerText = company_name
            //document.getElementById('company_name').innerText = CompanyButton({companyName:company_name,companyUrl:company_name,layout:Company });
        }catch (error) {
            document.getElementById('company_name').innerText = 'Failed to fetch data: ' + error.message;
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
