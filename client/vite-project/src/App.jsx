import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import CreatePresentation from "./pages/CreatePresentation";
import Editor from "./pages/Editor";
import Templates from "./pages/Templates";
import Preview from "./pages/Preview";

import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route
          path="/create"
          element={<CreatePresentation />}
        />

        
        
        
        
        
        <Route
          path="/editor"
          element={<Editor />}
        />

        <Route
          path="/templates"
          element={<Templates />}
        />

        <Route
          path="/preview"
          element={<Preview />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;