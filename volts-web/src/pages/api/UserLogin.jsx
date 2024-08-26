const form = document.querySelector("form");
import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

//import pkg from '../../../package.json' assert { type: 'json' };
//const address = pkg["volts-server"];
//var cors = require('cors');
/*
 form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);


  const response = await fetch(
    `http://localhost:8081/api/vi/auth/authenticate`,
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
    
});
*/

export default  function getUserData() {
  /*
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

            localStorage.setItem("company_name", company_name);
            //document.getElementById('company_name').innerText = company_name
            //document.getElementById('company_name').innerText = CompanyButton({companyName:company_name,companyUrl:company_name,layout:Company });
        }catch (error) {
            //TODO add error handling
        }
            */
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const handleSubmit = async (e) => {
          e.preventDefault()
          setLoading(true)
          try {
            const response = await fetch("http://localhost:8081/api/vi/auth/authenticate", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email,
                password,
              }),
            })
            if (!response.ok) {
              throw new Error("Network response was not ok")
            }
            const datat = await response.json();
            const { access_token } = datat;

            localStorage.setItem("volts_token", access_token);
            const data = await response.json()
            console.log(data)
            setLoading(false)

            
          } catch (err) {
            setError(err.message)
            setLoading(false)
          }
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

            localStorage.setItem("company_name", company_name);
            //document.getElementById('company_name').innerText = company_name
            //document.getElementById('company_name').innerText = CompanyButton({companyName:company_name,companyUrl:company_name,layout:Company });
            if (response.ok) {
              console.log(datat);
              location.href = "/";
            }
        }catch (error) {
            //TODO add error handling
        }
        }
        return (
          <div className="flex items-center justify-center h-screen bg-background">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
                <CardDescription>Enter your email and password to access your account.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" disabled={loading} onClick={handleSubmit}>
                  {loading ? "Loading..." : "Sign In"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )
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
