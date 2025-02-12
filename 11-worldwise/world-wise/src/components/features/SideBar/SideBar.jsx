import styles from "./Sidebar.module.css";
import Logo from "../Logo/Logo";
import { Outlet } from "react-router-dom";
import AppNav from "../AppNav/AppNav";
export default function SideBar() {
  return (
    <>
      <div className={styles.sidebar}>
        <Logo />
        <AppNav />
        {/* The outlet is where the child routes will be rendered */}
        <Outlet />
        <footer className={styles.footer}>
          <p className={styles.copyright}>
            &copy; Copyright by FoM. All rights reserved.
          </p>
        </footer>
      </div>
    </>
  );
}
