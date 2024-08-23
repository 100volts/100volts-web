
export default function GetUserWorkpaces() {
  const companyName = localStorage.getItem('company_name');
  return (<>
    <h1>{companyName}</h1>
    <br/>
    <a href="/workplaces-dashboar">
      <img src="/workplaces/Markeli.png"></img>
    </a>
  </>);
}