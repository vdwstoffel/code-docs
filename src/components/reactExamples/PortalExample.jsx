import React, { useState } from "react";
import { createPortal } from "react-dom";

import styles from "./PortalExample.module.css"

export default function PortalExample() {
  const [isOpen, setIsOpen] = useState(false);

  function openModel() {
    setIsOpen(true);
  }

  function closeModel() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={styles.modalContainer}>
        <h1>Modal</h1>
        <div>
          <button onClick={openModel}>Click To Open</button>

          {/* Non Portal Modal. Will be positioned within its container */}
          {isOpen && (
            <div className="modal">
              <p>This is a modal</p>
              <p>Scroll to top to see portal modal</p>
              <button onClick={closeModel}>close</button>
            </div>
          )}

          {/* Portal Modal Will be positioned within the body */}
          {isOpen &&
            createPortal(
              <div className={styles.modal}>
                <p>This is a modal</p>
                <button onClick={closeModel}>close</button>
              </div>,
              document.body
            )}
        </div>
      </div>
    </>
  );
}
