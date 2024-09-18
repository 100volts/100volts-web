import { ChevronDown, User, Settings, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { isLogedIn,userData } from "@/components/datastore/UserStore";
import { useStore } from '@nanostores/react';


export default function ProfileIconHeader() {
  const [email, setEmail] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const $isLogedIn=useStore(isLogedIn);
  const $userData=useStore(userData);

  useEffect(() => {
    const token = localStorage.getItem("volts_token");
    if (token) {
      const payload = parseJwt(token);
      if (payload && payload.sub) {
        setEmail(payload.sub);
      }
    }
  }, []);

  function parseJwt(token) {
    if (!token) return null;

    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  }

  function deleteToken() {
    const tokenKey = "volts_token";
    localStorage.removeItem(tokenKey);
    localStorage.removeItem("user_state");
    localStorage.removeItem("user_islogedIn");
    $isLogedIn.set(false)
    $userData.set()
  }
  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-center items-center gap-x-1.5 rounded-md  px-3 py-2   shadow-sm ring-1 ring-inset ring-gray-300   "
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={toggleDropdown}
        >
          <span className="ml-2">{$userData.email}</span>
          <ChevronDown
            className="-mr-1 h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="py-1" role="none">
            <a
              href="/acount"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-0"
            >
              <User className="mr-3 h-5 w-5 text-gray-400" aria-hidden="true" />
              Your Profile
            </a>
            <a
              href="/Settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-1"
            >
              <Settings
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Settings
            </a>
            <a
              href="./"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
              role="menuitem"
              tabIndex={-1}
              id="menu-item-2"
              onClick={deleteToken}
            >
              <LogOut
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Sign out
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
