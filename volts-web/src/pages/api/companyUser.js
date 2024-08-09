let userFirstName;
let userLstName;
let userEmail;

async function getUserData(){
  const userToken=localStorage.getItem("volts_token")
  const response = await fetch(
    "http://localhost:8081/api/v1/company/user",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "authentication":userToken
      },
    }
  );
  const datat = await response.json();
  const { first_name } = datat;
  const { last_name } = datat;
  const { email } = datat;
  userFirstName=first_name;
  userLstName=last_name;
  userEmail=email;
};

await getUserData()
console.log("fist name:",userFirstName)
console.log("last name:",userLastName)
console.log("emai:",userEmail)
