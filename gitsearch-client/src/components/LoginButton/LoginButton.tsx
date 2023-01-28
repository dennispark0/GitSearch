import { useEffect, useState } from "react";
import { UserData } from "../../models/user-data.model";
import authService from "../../services/auth.service";
import classes from "./LoginButton.module.css";

//TODO: move these to an env file.
const authUrl = `https://github.com/login/oauth/authorize`;
const clientId = `Iv1.9ea6762a29bbce2e`;
const redirectUrl = `https://git-librarian.surge.sh/login`;
export default function LoginButton() {
  const [userInfo, setUserInfo] = useState<UserData | null>(null);
  const getUserInfo = async () => {
    const { data } = await authService.getUser();
    setUserInfo(data);
  };

  const logout = async () => {
    await authService.logout();
    setUserInfo(null);
  }

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div >
      {userInfo ? (
        <button onClick={logout} className={classes.loginContainer}>
          <img className={classes.userIcon} src={userInfo.avatar_url} /> <span>Logout</span>
        </button>
      ) : (
        <a className={classes.loginContainer} href={`${authUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}`}>Login</a>
      )}
    </div>
  );
}
