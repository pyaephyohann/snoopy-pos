import ReactDOM from "react-dom/client";
import "./index.css";
import AppProvider from "./contexts/AppContext";
import Router from "./routers/Router";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <AppProvider>
    <Router />
  </AppProvider>
);
