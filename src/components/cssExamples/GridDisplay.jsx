/**
 * Used in css file to show grid size properties
 */

import React from "react";

import style from "./GridDisplay.module.css";

export default function GridDisplay() {
  return (
    <div className={style.container}>
      <div className={style.box}>One</div>
      <div className={style.box}>Two</div>
      <div className={style.box}>Three</div>
      <div className={style.box}>Four</div>
      <div className={style.box}>Five</div>
      <div className={style.box}>Six</div>
      <div className={style.box}>Seven</div>
    </div>
  );
}
