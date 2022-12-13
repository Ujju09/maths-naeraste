
import Script from "next/script"
import Image from "next/image"
import NoContent from "./no_content"
import Contribute from "./contribute"


export default function OrbitList({ records }) {

    return (
        <section>
            <Script
        type="module"
        src="https://js.withorbit.com/orbit-web-component.js"
      />
    {records.fields.hasOwnProperty("Question (from Questions)") === false ? (
    <NoContent />
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
        <Contribute />
    </>
  )}
      
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














