/** @format */

import Head from "next/head";
import styles from "../styles/Home.module.css";

export default function Exams() {
  return (
    <div className={styles.container}>
      <Head>
        <title>🙀 Exams</title>
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>Exams</h1>
        <p
          style={{
            fontSize: "1.5rem",
            fontWeight: "bold",
            marginBottom: "1rem",
            marginTop: "1rem",
            textAlign: "center",
            color: "#D05E70",
          }}
        >
          Exams.....Coming soon.....
        </p>
      </main>
    </div>
  );
}
