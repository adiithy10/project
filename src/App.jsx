import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminComplaintList from "./components/AdminComplaintList";
import StatusUpdateScreen from "./components/StatusUpdateScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminComplaintList />} />
        <Route path="/status-update" element={<StatusUpdateScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;