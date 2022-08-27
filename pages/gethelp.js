/** @format */

import Head from "next/head";
import styles from "../styles/Home.module.css";

const Help = ({ records }) => {
  const helpText = "Can you help me out?";
  const encoded = encodeURI(helpText);

  return (
    <div className={styles.container}>
      <Head>
        <title>Stuck 🫣</title>
        <meta name="description" content="Superpowered notebooks" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>naeRaste │ 🤝</h1>
        <p
          style={{
            padding: "10px",
          }}
        >
          Just click the photo of the problem you are stuck with and share it
          with us on WhatsApp.
        </p>

        <div className={styles.grid}>
          {records.map((record, index) => (
            <a
              key={index}
              className={styles.helpcard}
              href={`https://wa.me/91${record.fields["Phone"]}?text=${encoded}`}
            >
              <h3>{record.fields["Name"]} &rarr;</h3>
              <p
                style={{
                  color: "#D05E70",
                }}
              >
                Available during{" "}
                <span
                  style={{
                    fontSize: "2.5rem",
                  }}
                >
                  {record.fields["Timings"]}
                </span>
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "10px",
                }}
              >
                {record.fields["Subject"].map((subject, index) => (
                  <p
                    key={index}
                    style={{
                      color: "grey",
                      fontSize: "16px",
                    }}
                  >
                    {subject}
                  </p>
                ))}
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
};

export async function getStaticProps() {
  const API_KEY = process.env.API_KEY;
  const TABLE_KEY = process.env.TABLE_KEY;
  const res = await fetch(
    `https://api.airtable.com/v0/${TABLE_KEY}/Support?maxRecords=10&view=Grid%20view`,
    {
      headers: { Authorization: `Bearer ${API_KEY}` },
    }
  );

  const records = await res.json();

  return {
    props: { records: records.records }, // will be passed to the page component as props
  };
}

export default Help;
