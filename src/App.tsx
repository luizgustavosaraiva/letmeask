import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeSwitch } from "./components/ThemeSwitch";

import { AuthContextProvider } from "./context/AuthContext";
import { ThemeContextProvider } from "./context/ThemeContext";
import { AdminRoom } from "./pages/AdminRoom";

import { Home } from "./pages/Home";
import { NewRoom } from "./pages/NewRoom";
import { Room } from "./pages/Room";

function App() {
	return (
		<BrowserRouter>
			<ThemeContextProvider>
				<ThemeSwitch />
				<AuthContextProvider>
					<Switch>
						<Route path="/" exact component={Home} />
						<Route path="/rooms/new" component={NewRoom} />
						<Route path="/rooms/:id" component={Room} />
						<Route path="/admin/rooms/:id" component={AdminRoom} />
					</Switch>
				</AuthContextProvider>
			</ThemeContextProvider>
		</BrowserRouter>
	);
}

export default App;
