import { useState } from "react";

export default function Authentication() {
	const [isRegistration, setIsRegistration] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAuthenticating, setIsAuthenticating] = useState(false);

	async function handleAunthenticate() {}

	return (
		<>
			<h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
			<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input
				type="password"
				placeholder="********"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleAunthenticate}>
				<p>Submit</p>
			</button>
			<hr />
			<div className="register-content">
				<p>{isRegistration ? "Already have an account? " : "Don't have an account?"}</p>
				<button onClick={() => setIsRegistration(!isRegistration)}>
					<p>{isRegistration ? "Sign In" : "Sign Up"}</p>
				</button>
			</div>
		</>
	);
}
