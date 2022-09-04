/** @format */

import styles from "../styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";

export default function Resource({ records }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>{records.fields["Chapter Name"]}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>nae raste │ ✍️</h1>
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
          {records.fields["Chapter Name"]}
        </p>
        {records.fields.hasOwnProperty("practiceOnKhanAcademy") === true ? (
          <div className={styles.practiceCard}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Image
                  src="/KhanSVG.svg"
                  width={50}
                  height={50}
                  alt="Khan Academy Logo"
                />
                <h3> Practice on Khan Academy</h3>
              </div>
              <p
                style={{
                  paddingLeft: "0.5rem",
                  fontWeight: "300",
                }}
              >
                Khan Academy contains a lot of practice questions for you to do
                in {records.fields["Chapter Name"]}. They also have explanation
                videos.
              </p>
              <Link href={records.fields["practiceOnKhanAcademy"]}>
                <button className={styles.button}>Practice Now</button>
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}

        <div className={styles.grid}>
          {records.fields.hasOwnProperty("Url") === false ? (
            <></>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <h3>
                Videos on {records.fields["Chapter Name"]}, that we think
                you&apos;ll love.
              </h3>
              {records.fields["Url"].split(";").map((url, index) => (
                <iframe
                  key={index}
                  src={url}
                  title={url}
                  width="100%"
                  height="200"
                  frameBorder="10"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className={styles.iframe}
                ></iframe>
              ))}
            </div>
          )}
        </div>
        <p
          style={{
            color: "grey",
            padding: "1rem",
            fontWeight: "200",
          }}
        >
          This is a work in progress. In future new resources will be added. So
          don&apos;t forget to check often.
        </p>
      </main>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const PUBLIC_API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const res = await fetch(
    `https://api.airtable.com/v0/appL3eEYotbT6ZB0m/Links%20and%20description/${id}`,
    {
      headers: { Authorization: `Bearer ${PUBLIC_API_KEY}` },
    }
  );

  const records = await res.json();

  return {
    props: { records: records }, // will be passed to the page component as props
  };
}
