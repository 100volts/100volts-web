const form = document.querySelector("form");
//var cors = require('cors');

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);

  const response = await fetch(
    "http://localhost:8081/api/vi/auth/authenticate",
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

  console.log(response);
  if (response.ok) {
    console.log(datat);
    location.href = "/";
  }

  const result = document.querySelector("#result");

  console.log(result);
  console.log(data.get("email"));
  console.log(data.get("pass"));
});
