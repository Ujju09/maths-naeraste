import Image from "next/image";
import Link from 'next/link';
import styles from "../styles/Home.module.css";

export default function QuestionSets({ records }) {
    return (
        <section>
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
                  padding: "0.5rem",
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
        </section>
    )
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