export default function Authentication() {
	return (
		<>
			<h2 className="sign-up-text">Sign Up / Login</h2>
			<p>Sign in to your account!</p>
			<input type="email" name="email" id="email" placeholder="Email" />
			<input type="password" name="password" id="password" placeholder="********" />
			<button>
				<p>Submit</p>
			</button>
			<hr />
			<div className="register-content">
				<p>Don&apos;t have an account? </p>
				<button>
					<p>Sign up</p>
				</button>
			</div>
		</>
	);
}
