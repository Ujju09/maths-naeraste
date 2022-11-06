/** @format */

import styles from "../styles/Home.module.css";
import Image from "next/image";
import Head from "next/head";
import Link from "next/link";
import Script from "next/script";

export default function Resource({ records }) {
  const helpText = `I want to share ${records.fields["Chapter Name"]} questions with you.`;
  const encoded = encodeURI(helpText);
  return (
    <div className={styles.container}>
      <Script
        type="module"
        src="https://js.withorbit.com/orbit-web-component.js"
      />
      <Head>
        <title>{records.fields["Chapter Name"]}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
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
                videos in Hindi and English.
              </p>
              <Link href={records.fields["practiceOnKhanAcademy"]}>
                <button className={styles.button}>Practice Now</button>
              </Link>
            </div>
          </div>
        ) : (
          <></>
        )}
        {records.fields.hasOwnProperty("Question (from Questions)") === false ? (
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
                  src="/orbit.svg"
                  width={50}
                  height={50}
                  alt="Orbit Logo"
                />
                <h3> Chance to win exciting rewards </h3>
              </div>
              <p
                style={{
                  paddingLeft: "0.5rem",
                  fontWeight: "300",
                }}
              >
                Orbit helps you remember important facts and formulas.
                Currently,{records.fields["Chapter Name"]} contains no
                questions. Contribute questions and answers and win exciting
                gifts. 🎁
              </p>
              <button className={styles.button}>
                <a
                  href={`https://wa.me/919755992478?text=${encoded}`}
                  style={{
                    color: "white",
                    textDecoration: "none",
                  }}
                >
                  Share Qs on WhatsApp
                </a>
              </button>
            </div>
          </div>
        ) : (
          <>
            <div
              style={{
                display: "flex",
                marginBottom: "1rem",
              }}
            >
              <Image
                src="/orbit.svg"
                alt="Orbit image"
                width={100}
                height={100}
              />
              <h3>
                Deeply internalize ideas and facts through periodic review.
              </h3>
            </div>
            <orbit-reviewarea
              color="orange"
              style={{
                width: "100%",
              }}
            >
              {records.fields["Question (from Questions)"].map(
                (question, index) => (
                  <orbit-prompt
                    question={question}
                    answer={records.fields["Answer (from Questions)"][index]}
                    key={index}
                  ></orbit-prompt>
                )
              )}
            </orbit-reviewarea>
            Want to Contribute Questions ?
            <button className={styles.button}>
              <a
                href={`https://wa.me/919755992478?text=${encoded}`}
                style={{
                  color: "white",
                  textDecoration: "none",
                }}
              >
                Share Qs on WhatsApp
              </a>
            </button>
          </>
        )}
        {
          <div className={styles.practiceCard}>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
              }}
            >
              <h3
                style={{
                  textDecoration: "none",
                  color: "green",
                  cursor: "pointer",
                  paddingLeft: "0.5rem",
                }}
              >
                NCERT Exemplar PDF {""}
              </h3>
              <p
                style={{
                  paddingLeft: "0.5rem",
                  fontWeight: "300",
                }}
              >
                NCERT Exemplar contains very good question sets. They help you
                prepare better for exams, boost confidence and more.
              </p>
              <Link href={records.fields["ncertExemplar"]}>
                <button className={styles.button}>
                  Download Now. It&apos;s free!
                </button>
              </Link>
            </div>
          </div>
        }

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
