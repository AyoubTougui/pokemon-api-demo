import React from "react";
import { Outlet } from "react-router-dom";

import styles from "./Layout.module.scss";
import Nav from "./Nav";
import Footer from "./Footer";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <Nav />
      <div className={styles.content}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
