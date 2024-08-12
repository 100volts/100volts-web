const form = document.querySelector("form");
import pkg from '../../../package.json' assert { type: 'json' };
//var cors = require('cors');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const address=pkg["volts-server"]; 

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

  // Access the "name" field from package.json
  console.log(pkg.version); 

  localStorage.setItem("volts_token", access_token);
  localStorage.setItem("volts_user_role", role);
  
  
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
