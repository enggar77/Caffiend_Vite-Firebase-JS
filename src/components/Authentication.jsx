import { useState } from "react";
import { useAuth } from "../context/authContext";

// eslint-disable-next-line react/prop-types
export default function Authentication({ handleCloseModal }) {
	const [isRegistration, setIsRegistration] = useState(false);
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isAuthenticating, setIsAuthenticating] = useState(false);
	const [error, setError] = useState(null);

	const { signUp, logIn } = useAuth();

	async function handleAunthenticate() {
		if (!email || !password || password.length < 6 || isAuthenticating) return;

		try {
			setIsAuthenticating(true);
			setError(null);

			if (isRegistration) {
				// register user
				await signUp(email, password);
			} else {
				// login user
				await logIn(email, password);
			}
			handleCloseModal();
		} catch (err) {
			console.log(err.message);
			setError(err.message);
		} finally {
			setIsAuthenticating(false);
		}
	}

	return (
		<>
			<h2 className="sign-up-text">{isRegistration ? "Sign Up" : "Login"}</h2>
			{error && <p>❌ {error}</p>}
			<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
			<input
				type="password"
				placeholder="********"
				value={password}
				onChange={(e) => setPassword(e.target.value)}
			/>
			<button onClick={handleAunthenticate}>
				<p>{isAuthenticating ? "Authenticating..." : "Submit"}</p>
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
