import React from "react";
import styles from "../../styles/loader.module.css";

const Loader = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loader}>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
