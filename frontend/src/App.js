import './App.css';
import NavBar from "./components/NavBar/NavBar.js";
import Home from "./components/Home/Home.js";
import Clients from "./components/Clients/Clients.js";
import Therapists from "./components/Therapists/Therapists.js";
import Sessions from "./components/Sessions/Sessions.js";

function App() {
  let CurrentPage;
  switch(window.location.pathname) {
    case '/':
      CurrentPage = Home;
      break;
    case '/clients':
      CurrentPage = Clients;
      break;
    case '/therapists':
      CurrentPage = Therapists;
      break;
    case '/sessions':
      CurrentPage = Sessions;
      break;
  }

  return (
    <div className="App">
      <NavBar></NavBar>
      <CurrentPage></CurrentPage>
    </div>
  );
}

export default App;
