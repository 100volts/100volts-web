import ProfileIconHeader from "./ProfileIconHeader";

export default function HeaderMenu() {
  //style='color: var(--black); border-bottom: 4px solid transparent; text-decoration: none;'
  if (localStorage.getItem("volts_token")) {
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
