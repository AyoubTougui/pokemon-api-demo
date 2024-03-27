import React from "react";
import styles from "./Pagination.module.scss";

const Pagination = ({ start, setStart, nbResults, limit = 20 }) => {
  return (
    <div className={styles.pagination}>
      {start > 0 ? (
        <button
          className={styles.btn}
          onClick={() => setStart(start - limit < 0 ? 0 : start - limit)}
        >
          {"Previous"}
        </button>
      ) : (
        <div></div>
      )}
      {start + limit < nbResults ? (
        <button className={styles.btn} onClick={() => setStart(start + limit)}>
          {"Next"}
        </button>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Pagination;
