import { Route } from "react-router-dom";
import  Landing  from "./Components/Landing";
import  Home from "./Components/Home";
// import  SearchBar  from "./Components/SearchBar";
// import  CreateGame  from "./Components/CreateGame";
import  Detail from "./Components/Detail";
function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route exact path="/videogames" component={Home} />
      <Route path="/videogames/:id" component={Detail} />
      {/*
      <Route path="/videogames/creategame" component={CreateGame} />
       */}
    </div>
  );
}

export default App;
