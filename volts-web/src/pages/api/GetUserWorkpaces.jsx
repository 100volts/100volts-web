
export default async function getUserData() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);


  const getWorkplaceData = async () => {
    try {
      const userToken = localStorage.getItem('volts_token');
      const companyName = localStorage.getItem('company_name');
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

      setData(company_name);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkplaceData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (<>

    <a href="/workplaces-dashboar">
      <img src="/workplaces/Markeli.png"></img>
    </a>
  </>);
}