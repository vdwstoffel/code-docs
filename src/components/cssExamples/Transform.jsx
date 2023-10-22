/**
 * CSS example showing how the css property transform works
 */

import React from "react";

import css_img from "@site/static/img/css.png";
import style from "./Transform.module.css";

export default function Transform(props) {
  const { property } = props;

  return (
    <div className={style.container}>
      <img src={css_img} className={style[property]} />
    </div>
  );
}
