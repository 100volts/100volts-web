import pkg from "../../../package.json" assert { type: "json" };
    const address = pkg["volts-server"];

    async function getUserData() {
        try{
            const userToken = localStorage.getItem("volts_token");
            const response = await fetch(
              `http://${address}:8081/api/v1/company/user`,
              {
                method: "GET",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${userToken}`,
                },
              }
            );
            const datat = await response.json();
            const { first_name } = datat;
            const { last_name } = datat;
            const { email } = datat;
            document.getElementById('email').innerText = email;
            document.getElementById('last_name').innerText = last_name;
            document.getElementById('first_name').innerText = first_name;
        }catch (error) {
            document.getElementById('result').innerText = 'Failed to fetch data: ' + error.message;
        }
    }

    getUserData();