import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages/Landing";
import App from "./App";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/landing" element={<Landing />} />
    </Routes>
  </BrowserRouter>
);
