import styles from "../styles/Home.module.css";
import NoContent from "./no_content";

export default function VideosList({ records }) {
    return (
        <section>
        <div className={styles.grid}>
        {records.fields.hasOwnProperty("Url") === false ? (
    <NoContent />
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
      <div className= {styles.videoGrid}>
      {records.fields["Url"].split(";").map((url, index) => (
        <iframe
          key={index}
          src={url}
          title={url}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className={styles.iframe}
        ></iframe>
      ))}
      </div>
      
    </div>
  )}
          
        </div>
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








