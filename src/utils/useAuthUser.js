import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { delToken, getToken, getUserFromToken } from "./auth";

export function useAuthUser() {
  const reduxUser = useSelector((state) => state.auth?.user);
  const [user, setUser] = useState(getUserFromToken());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (reduxUser) {
      setUser(reduxUser);
    } else {
      const token = getToken();
      if (token) {
        try {
          const payload = JSON.parse(atob(token.split(".")[1]));
          setUser({
            username: payload.sub || payload.login || payload.email || "USER",
          });
        } catch (e) {
          setUser({ username: "USER" });
        }
      } else {
        setUser(null);
      }
    }
  }, [reduxUser]);

  const handleLogout = (e) => {
    e?.preventDefault?.();
    delToken();
    dispatch({ type: "LOGOUT" });
    setUser(null);
    navigate("/");
  };

  return { user, setUser, handleLogout };
}
