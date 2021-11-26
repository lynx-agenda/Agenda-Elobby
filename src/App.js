import "bootstrap/dist/css/bootstrap.min.css";
import {UserContextProvider} from './context/UserContext'
import Home from "./components/Home/Home";

function App() {
	return (
		<UserContextProvider>
			<Home />
		</UserContextProvider>
	);
}

export default App;
