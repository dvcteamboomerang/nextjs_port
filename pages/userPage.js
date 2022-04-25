import Head from "next/head";
import { useState } from "react";
import AddEvent from "../components/AddEvent/AddEvent";
import AddItem from "../components/AddItem/AddItem";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [isShowingForm, showForm] = useState(false);
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@600&display=swap"
          rel="stylesheet"
        />
      </Head>

      <main className={styles.main}>
        <AddItem showForm={showForm} />
        {isShowingForm ? <AddEvent showForm={showForm} /> : null}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}
