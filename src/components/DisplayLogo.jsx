/**
 * Used to display logo's in pages in a unified size
 */

import React from "react";

import style from "./DisplayLogo.module.css";

export default function DisplayLogo(props) {
  const { logo } = props;
  return (
    <div className={style.logo_container}>
      <img src={logo} className={style.logo} />
    </div>
  );
}
