import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home() {
	const [myLink, setMyLink] = useState("");
	const [link, setLink] = useState("");
	const [cardShadow, setCardShadow] = useState(false);
	const [show, setShow] = useState(false);
	const [showShortUrl, setShowShortUrl] = useState(false);
	const [edit, setEdit] = useState("");
	const [success, setSuccess] = useState(false);

	function restart() {
		setShow(() => false);
		setCardShadow(() => false);
		setShowShortUrl(() => false);
		setSuccess(false);
	}

	async function customUrl() {
		setEdit(() => link.replace(/http(s)?(:)?(\/\/)?(www\.)?/g, ""));
		setCardShadow(() => !cardShadow);
		setShow(() => !show);
	}

	async function shortUrl(e) {
		setCardShadow(() => !cardShadow);
		setShowShortUrl(() => !showShortUrl);
		e.preventDefault();
		const res = await fetch("/api/shortUrl", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ link }),
		});
		const data = await res.text();
		setSuccess(true);
		setMyLink(data);
	}

	async function sendCustomLink(e) {
		const res = await fetch("/api/editUrl", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ edit, link }),
		});
		const data = await res.text();
		if (data === edit) setSuccess(true);
	}

	return (
		<div className={styles.container}>
			<Head>
				<title>My Links</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href="https://0one.vercel.app/">My links!</a>
				</h1>

				<p className={styles.description}>Personaliza tus links</p>
				<div className={styles.grid}>
					<div
						className={
							cardShadow ? `${styles.card} ${styles.cardShadow}` : styles.card
						}>
						<input onChange={(e) => setLink(e.target.value)}></input>
						<button onClick={customUrl}>Editar url</button>
						<button onClick={shortUrl}>Acortar link</button>
					</div>

					<div
						className={styles.cardEdit}
						style={{ display: show ? "" : "none" }}>
						<h2>Editar url:</h2>
						<p className={styles.mylink}>
              0one.vercel.app/
							<input
								className={styles.edited}
								value={edit}
								onChange={(e) => setEdit(e.target.value)}></input>
						</p>
						<button onClick={sendCustomLink}>Enviar</button>
						{success && (
              <button onClick={() => navigator.clipboard.writeText("0one.vercel.app/"+edit)}>
								Copy
							</button>
						)}
            <button onClick={restart}>X</button>
					</div>

					<div
						className={styles.cardEdit}
						style={{ display: showShortUrl ? "" : "none" }}>
						<h2>Short Link:</h2>
						<p className={styles.mylink}>
              0one.vercel.app/
							<input className={styles.edited} defaultValue={myLink}></input>
						</p>
						{success && (
              <button onClick={() => navigator.clipboard.writeText("0one.vercel.app/"+myLink)}>
								Copy
							</button>
						)}
            <button onClick={restart}>X</button>
					</div>
				</div>
			</main>

			<footer className={styles.footer}>
				<a
					href="https://myportfolio003.netlify.app/"
					target="_blank"
					rel="noopener noreferrer">
					<code>
						<p style={{ fontSize: "1rem" }}>
							{"{"}Developed by Jhean{"}"}
						</p>
					</code>
				</a>
			</footer>
		</div>
	);
}
