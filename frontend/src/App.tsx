import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div style={{ width: "25rem", margin: "0 auto" }}>
        <Register />
      </div>
    </div>
  );
}

export default App;
