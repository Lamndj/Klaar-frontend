import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import BankList from "./Components/BankList/BankList";
import Header from "./Components/Header/Header";
import SingleBank from "./Components/SingleBank/SingleBank";

function App() {
  return (
    <>
      <div className="App">
        <Header title="Klaar Banking System" />
        <Router>
          <Switch>
            <Route path="/" exact component={BankList}></Route>
            <Route
              path="/bank/:bankcity/:bankifsc"
              exact
              component={SingleBank}
            ></Route>
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
