import React from "react";

import style from "./Transition.module.css";

export default function Transition(props) {
  const { value } = props;
  return <div className={style[value]}></div>;
}
