import { Route } from "react-router-dom";
import  Landing  from "./Components/Landing";
import  Home from "./Components/Home";
// import  SearchBar  from "./Components/SearchBar";
// import  CreateGame  from "./Components/CreateGame";
// import  Detail from "./Components/Detail";
function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/videogames" component={Home} />
      {/* <Route exact path="/videogames" component={SearchBar} />
      <Route path="/videogames/creategame" component={CreateGame} />
      <Route path="/videogames/:id" component={Detail} /> */}
    </div>
  );
}

export default App;
