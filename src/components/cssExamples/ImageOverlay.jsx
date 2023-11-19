import React from "react";

import styles from "./ImageOverlay.module.css";

export default function ImageOverlay({ effect, text }) {
  return (
    <div className={styles[effect]}>
      <p>{text}</p>
    </div>
  );
}
