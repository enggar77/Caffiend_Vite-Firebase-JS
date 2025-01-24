import Layout from "./components/Layout";
import Hero from "./components/Hero";
import CoffeeForm from "./components/CoffeeForm";
import Stats from "./components/Stats";
import History from "./components/History";
import { useAuth } from "./context/authContext";

function App() {
	const { globalUser, globalData } = useAuth();
	const isAuthenticated = globalUser;
	const isData = globalData && !!Object.keys(globalData || {}).length;

	const authenticatedContent = (
		<>
			<Stats />
			<History />
		</>
	);
	return (
		<Layout>
			<Hero />
			<CoffeeForm isAuthenticated={isAuthenticated} />
			{isAuthenticated && isData && authenticatedContent}
		</Layout>
	);
}

export default App;
