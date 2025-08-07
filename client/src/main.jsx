import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Landing from "./pages/Landing";
import App from "./App";
import PrivateRoom from "./pages/PrivateRoom";
import GlobalChat from "./pages/GlobalChat";
import PrivateRoomLanding from "./pages/PrivateRoomLanding";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/landing" element={<Landing />} />
      <Route path="/private-room/" element={<PrivateRoomLanding />} />
      <Route path="/private-room/:roomID" element={<PrivateRoom />} />
      <Route path="/global-chat" element={<GlobalChat />} />
    </Routes>
  </BrowserRouter>
);
