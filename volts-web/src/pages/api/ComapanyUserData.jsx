
export default async function getUserData() {
        try{
            const userToken = localStorage.getItem("volts_token");
            const response = await fetch(
              `http://localhost:8081/api/v1/company/user`,
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
            
        }

        return(
          <>
              <div id="user-data">
                Name: <a id="first_name"></a><br />
                Last name: <a id="last_name"></a><br />
                Email: <a id="email"></a><br />
              </div>
          </>
        )
    }


    
    getUserData();