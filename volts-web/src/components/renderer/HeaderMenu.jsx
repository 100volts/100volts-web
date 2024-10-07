import ProfileIconHeader from "./ProfileIconHeader";
import { useStore } from "@nanostores/react";
import { isLogedIn, userData } from "@/components/datastore/UserStore";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";

const langs = {
  en: { nativeName: "English" },
  bg: { nativeName: "Bulgarian" },
};

export default function HeaderMenu() {
  const { t, i18n } = useTranslation();
  const langbutton = (
    <>
      <div>
        {Object.keys(langs).map((lng) => (
          <button
            type="submit"
            key={lng}
            onClick={() => i18n.changeLanguage(lng)}
            disabled={i18n.resolvedLanguage === lng}
          >
            {lng}
          </button>
        ))}
      </div>
    </>
  );

  if (localStorage.getItem("user_state")) {
    userData.set(JSON.parse(localStorage.getItem("user_state")));
  } else {
    userData.setKey("firstName", "anonymous");
    userData.setKey("lastName", "anonymous");
    userData.setKey("email", "anonymous");
    userData.setKey("tokken", "anonymous");
    userData.setKey("companies", ["anonymous"]);
  }
  if (localStorage.getItem("user_islogedIn")) {
    isLogedIn.set(localStorage.getItem("user_islogedIn"));
  } else {
    isLogedIn.set(false);
  }
  const $isLogedIn = useStore(isLogedIn);
  if ($isLogedIn) {
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
//<langbutton /> removed for now for demo inforn of nenov
/*
        <div>
          {Object.keys(langs).map((lng) => (
            <button
              className="m-2"
              type="submit"
              key={lng}
              onClick={() => i18n.changeLanguage(lng)}
              disabled={i18n.resolvedLanguage === lng}
            >
              {lng}
            </button>
          ))}
        </div>
*/