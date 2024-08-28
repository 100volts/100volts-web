import { useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import pkg from "../../../package.json";
const urladdress = pkg["volts-server"];

function getUserDataOld() {
        const [email, setEmail] = useState("")
        const [password, setPassword] = useState("")
        const [loading, setLoading] = useState(false)
        const [error, setError] = useState(null)
        const handleSubmit = async (e) => {
          e.preventDefault()
          setLoading(true)
          try {
            const response = await fetch(`http://${urladdress}:8081/api/vi/auth/authenticate`, {
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
              `http://${urladdress}:8081/api/v1/company/by/user`,
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



export default function getUserData() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await fetch(`http://${urladdress}:8081/api/vi/auth/authenticate`, {
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
        `http://${urladdress}:8081/api/v1/company/by/user`,
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
      if (response.ok) {
        console.log(datat);
        location.href = "/";
      }
  }catch (error) {
      //TODO add error handling
  }
  }
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <div className="grid gap-4">
            <div className="grid gap-2">
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <a
                  href="/forgot-password"
                  className="ml-auto inline-block text-sm underline"
                >
                  Forgot your password?
                </a>
              </div>
              <Input 
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)} required 
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading} onClick={handleSubmit}>
              Login
            </Button>

          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <a href="#" className="underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
      <div className="hidden  lg:block">
        <img
          src="../../../public/posters/powerplant.jpg"
          alt="Image"
          width="1920"
          height="100%"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale rounded-tr-3xl rounded-br-3xl"
        />
      </div>
    </div>
  )
}

