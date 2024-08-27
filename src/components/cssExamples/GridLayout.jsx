import React from "react";

import styles from "./gridLayout.module.css";

export default function GridLayout() {
  return (
    <div className={styles.outer_container}>
      <div className={`${styles.container} ${styles.header}`}>
        <h1>Header</h1>
      </div>
      <div className={`${styles.container} ${styles.sidebar}`}>
        <h1>Sidebar</h1>
      </div>
      <div className={`${styles.container} ${styles.main}`}>
        <h1>Main</h1>
      </div>

      <div className={`${styles.container} ${styles.footer}`}>
        <h1>Footer</h1>
      </div>
    </div>
  );
}
