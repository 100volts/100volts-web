import { useState, useEffect } from "react";
import pkg from "../../../../package.json";
const urladdress = pkg["volts-server"];

const ComapanyUserData = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    try {
      const userToken = localStorage.getItem("volts_token");
      const response = await fetch(
        `http://${urladdress}/api/v1/company/user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
      const datat = await response.json();
      setData(datat);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return (
    <>
      <div id="user-data">
        Name: <a id="first_name">{data.first_name}</a>
        <br />
        Last name: <a id="last_name">{data.last_name}</a>
        <br />
        Email: <a id="email">{data.email}</a>
        <br />
      </div>
    </>
  );
};

export default ComapanyUserData;
