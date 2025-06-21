import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/auth/operations";
import { useNavigate } from "react-router-dom";
import styles from "./UserMenu.module.css";

const UserMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className={styles.userMenu}>
      <p className={styles.welcome}>Welcome, {user?.name || "User"}!</p>
      <button className={styles.logout}onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
