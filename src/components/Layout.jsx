import { useState } from "react";
import Authentication from "./Authentication";
import Modal from "./Modal";

/* eslint-disable react/prop-types */
export default function Layout({ children }) {
	const [showModal, setShowModal] = useState(false);

	const header = (
		<header>
			<div>
				<h1 className="text-gradient">CAFFIEND</h1>
				<p>For Coffee Insatiates</p>
			</div>
			<button onClick={() => setShowModal(true)}>
				<p>Sign up free</p>
				<i className="fa-solid fa-mug-hot"></i>
			</button>
		</header>
	);

	const footer = (
		<footer>
			<p>
				<span className="text-gradient">Caffiend</span> was designed by{" "}
				<a href="https://www.smoljames.com" target="_blank">
					Smoljames
				</a>{" "}
				using the{" "}
				<a href="https://www.fantacss.smoljames.com" target="_blank">
					FantaCSS
				</a>{" "}
				design library.
			</p>
		</footer>
	);

	return (
		<>
			{showModal && (
				<Modal handleCloseModal={() => setShowModal(false)}>
					<Authentication />
				</Modal>
			)}
			{header}
			<main>{children}</main>
			{footer}
		</>
	);
}
