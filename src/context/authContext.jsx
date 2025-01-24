import { createContext, useContext, useState, useEffect } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
	return useContext(AuthContext);
}

// eslint-disable-next-line react/prop-types
export function AuthProvider({ children }) {
	const [globalUser, setGlobalUser] = useState(null);
	const [globalData, setGlobalData] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	function signUp(email, password) {
		return createUserWithEmailAndPassword(auth, email, password);
	}

	function logIn(email, password) {
		return signInWithEmailAndPassword(auth, email, password);
	}

	function logOut() {
		setGlobalUser(null);
		setGlobalData(null);
		return signOut(auth);
	}

	const value = { globalUser, globalData, isLoading, setGlobalData, logIn, logOut, signUp };

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (user) => {
			console.log("current user:", user);
			setGlobalUser(user);

			// if there's no user, then empty the user state and just return
			if (!user) {
				console.log("No active user");
				return;
			}
			// if there's a user, then check if the user has data in database, and if they do, fetch the data and update the global state
			try {
				setIsLoading(true);

				// first we create a reference of the document (labelled json object), then we get the doc, then snapshot it to see if there's anything there
				const docRef = doc(db, "users", user.uid);
				const docSnap = await getDoc(docRef);

				let firebaseData = {};
				if (docSnap.exists()) {
					console.log("Found user data");
					firebaseData = docSnap.data();
				}
				setGlobalData(firebaseData);
			} catch (error) {
				console.log(error.message);
			} finally {
				setIsLoading(false);
			}
		});

		return unsubscribe;
	}, []);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
