/** @format */
import styles from "../styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";

export default function BeBetter() {
  return (
    <div className={styles.container}>
      <Head>
        <title>📖 Blogs</title>
        <meta name="description" content="Handpicked from the Internet" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>naeRaste │ ☀️</h1>
        <div className={styles.grid}>
          <p
            style={{
              textAlign: "center",
            }}
          >
            Selected blogs that will help you become better.
          </p>
          <Image src="/rocket.svg" alt="Rocket" width={200} height={200} />
        </div>
      </main>
    </div>
  );
}
