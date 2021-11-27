import "bootstrap/dist/css/bootstrap.min.css";
import {UserContextProvider} from './context/UserContext'
import Home from "./components/Home/Home";

function App() {
	return (
		<UserContextProvider>
		{/* Ahore la APP solo tiene el componente Home que es el componente que contiiene toda nuestra APP
			Para que los contextos sobrevivan en toda nuestra app -> contexto = UserContextProvider */}
			<Home />                
		</UserContextProvider>
	);
}

export default App;
