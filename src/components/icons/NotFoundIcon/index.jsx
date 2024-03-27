import React from "react";
import styles from "./NotFound.module.scss";
import DatabaseIcon from "./DatabaseIcon";
import SearchIcon from "./SearchIcon";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.icons}>
        <div className={styles.db}>
          <DatabaseIcon />
        </div>
        <div className={styles.search}>
          <SearchIcon />
        </div>
      </div>
      <p>No data found</p>
    </div>
  );
};

export default NotFound;
