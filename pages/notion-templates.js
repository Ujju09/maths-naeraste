/** @format */
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function NotionTemplates() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: "1rem",
          }}
        >
          <Image src="/Notion-logo.svg" width={50} height={50} alt="Notion" />
          <h1>Notion Pages</h1>
        </div>

        <p className={styles.description}>Built with Notion, for you.</p>
        <div className={styles.grid}>
          <div className={styles.helpcard}>
            <h3>🏐 Maths Tricks and Shortcuts</h3>
            <p>Tricks that save time, and help you solve problems faster.</p>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <a href="https://ujjwaljayswal.notion.site/Maths-tricks-and-Shortcuts-91c4aeaa3c1d41b8b343ddbf7e237426">
                <button className={styles.notionbutton}>I wanna see</button>
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
