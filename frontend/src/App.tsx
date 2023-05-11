import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Register from "./components/Register/Register";

function App() {
  return (
    <div className="App">
      <NavBar />
      <div
        style={{
          width: "20rem",
          margin: "0 auto",
          padding: "3rem",
          border: "3px solid #C9A7EB",
          marginTop: "3rem",
        }}
      >
        <Register />
      </div>
    </div>
  );
}

export default App;
