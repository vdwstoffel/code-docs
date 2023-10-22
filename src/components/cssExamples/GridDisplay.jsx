/**
 * Used in the css.md to show gid display examples
 * Add placement={true} as props to add grid-colum and row properties
 */

import React from "react";

import style from "./GridDisplay.module.css";

export default function GridDisplay(props) {
  return (
    <div className={style.container}>
      <div className={props.placement ? `${style.box} ${style.one}` : style.box}>One</div>
      <div className={style.box}>Two</div>
      <div className={props.placement ? `${style.box} ${style.three}` : style.box}>Three</div>
      <div className={style.box}>Four</div>
      <div className={style.box}>Five</div>
      <div className={style.box}>Six</div>
      <div className={style.box}>Seven</div>
    </div>
  );
}
