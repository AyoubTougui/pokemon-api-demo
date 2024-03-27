import React from "react";
import styles from "./NotFoundPage.module.scss";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className={styles.page}>
      Opps looks like you got lost...
      <Link to={"/"}>Go back home</Link>
    </div>
  );
};

export default NotFoundPage;
