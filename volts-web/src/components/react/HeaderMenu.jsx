import ProfileIconHeader from "./ProfileIconHeader";
import { useStore } from '@nanostores/react';
import { isLogedIn,userData } from "@/pages/store/UserStore";

export default function HeaderMenu() {
  //style='color: var(--black); border-bottom: 4px solid transparent; text-decoration: none;'
  if(localStorage.getItem("user_state")){
  userData.set(JSON.parse(localStorage.getItem("user_state")))
  }else{
    userData.setKey("firstName","anonymous");
    userData.setKey("lastName","anonymous");
    userData.setKey("email","anonymous");
    userData.setKey("tokken","anonymous");
    userData.setKey("companies",["anonymous"]);
  }
  if(localStorage.getItem("user_islogedIn")){
  isLogedIn.set(localStorage.getItem("user_islogedIn"))
  }else{
    isLogedIn.set(false)
  }
  const $isLogedIn=useStore(isLogedIn);
  const $userData=useStore(userData);

  //console.log("$isLogedIn",$isLogedIn)
  //console.log("$userData",userData.get())

  if ($isLogedIn){//localStorage.getItem("volts_token")) {
    return (
      <>
        <a href="/wokrplace">Workplaces</a>
        <ProfileIconHeader />
      </>
    );
  } else {
    return (
      <>
        <a href="/login">Login</a>
      </>
    );
  }
}
