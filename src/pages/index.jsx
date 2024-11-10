import React from "react";
import Layout from "@theme/Layout";
import { useHistory } from "react-router-dom";

import styles from "../css/index.module.css";
import codeReference from "../../static/img/logos/reference.png";
import multiLanguage from "../../static/img/logos/multiple.png";

export default function Home() {
  const history = useHistory();

  const handleGetStartedClick = () => {
    history.push("/code-docs/git");
  };

  return (
    <Layout>
      <div className={styles.indexHeader}>
        <h1>Code Docs</h1>
        <button onClick={handleGetStartedClick}>Get Started</button>
      </div>
      <div className={styles.cardsContainer}>
        <div className={styles.card}>
          <img src={codeReference} />
          <h2>Quick Code References</h2>
          <p>
            Welcome to the ultimate resource for quick code references. Whether
            you're a beginner or an experienced developer, you'll find valuable
            snippets and examples to help you with your projects. Dive in and
            explore the wide range of languages and frameworks covered.
          </p>
        </div>
        <div className={styles.card}>
          <img src={multiLanguage} />
          <h2>Covers Multiple Languages and Frameworks</h2>
          <p>
            Our collection includes code snippets for JavaScript, Python, Java,
            C#, and many more. Each example is carefully crafted to demonstrate
            best practices and common use cases, making it easier for you to
            implement solutions quickly and efficiently.
          </p>
        </div>
        <div className={styles.card}>
          <img src={codeReference} />
          <h2>
            Examples use basic self contained examples to quickly get started
          </h2>
          <p>
            Each example is designed to be self-contained, providing you with
            all the necessary code to get started immediately. You won't need to
            sift through extensive documentation or setup procedures. Just copy,
            paste, and run the code to see it in action. This approach ensures
            that you can quickly understand and apply the concepts to your own
            projects.
          </p>
        </div>
      </div>
    </Layout>
  );
}
