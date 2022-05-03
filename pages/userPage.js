import Head from "next/head";
import { useState } from "react";
import AddEvent from "../components/AddEvent/AddEvent";
import Event from "../components/EventPost/Event";
import AddItem from "../components/AddItem/AddItem";
import styles from "../styles/Home.module.css";
import { getLatestEvents } from "../scripts/common/API";
export default function Home({ posts }) {
  const [isShowingForm, showForm] = useState(false);
  let Events;
  if (posts.data) {
    Events = posts.data.map(
      ({ title, description, img_link, author, options }, i) => {
        return (
          <Event
            key={"Event" + i}
            title={title}
            description={description}
            img_link={
              img_link
                ? img_link
                : "https://lugoldedc.com/wp-content/uploads/2020/10/dvc-logo.png"
            }
            author={author}
            date={options}
          />
        );
      }
    );
  }
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <EventsSection Events={Events} />

        <AddItem showForm={showForm} />
        {isShowingForm ? <AddEvent showForm={showForm} /> : null}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

const EventsSection = ({ Events }) => {
  return (
    <>
      <div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1559135197-8a45ea74d367?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2148&q=80")',
        }}
      >
        <h1
          style={{
            width: "100vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "4rem",
            margin: 0,
            padding: "1.7rem 0rem",
            fontWeight: "800",
            color: "white",
            backdropFilter: "blur(5px)",
          }}
        >
          Events
        </h1>
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
          }}
        />
      </div>

      <div
        style={{
          overflowX: "auto",
          width: "100vw",
          display: "flex",
          flexDirection: "row",
        }}
      >
        {Events}
      </div>
    </>
  );
};

export async function getServerSideProps() {
  // Call an external API endpoint to get posts.
  // You can use any data fetching library
  const posts = await getLatestEvents(10);

  // By returning { props: { posts } }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts: posts,
    },
  };
}
