import React from "react";

import style from "./GridPlacement.module.css";

export default function GridPlacement() {
  return (
    <div className={style.container}>
      <div className={`${style.box} ${style.one}`}>One</div>
      <div className={`${style.box} ${style.two}`}>Two</div>
      <div className={style.box}>Three</div>
      <div className={style.box}>Four</div>
    </div>
  );
}
