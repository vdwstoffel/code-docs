import React from "react";

import BrowserWindow from "../BrowserWindow/BrowserWindow";

import styles from "./Spinner.module.css";

export default function Spinner({style}) {
  return (
    <BrowserWindow>
      <div className={styles[style]}></div>
    </BrowserWindow>
  );
}
