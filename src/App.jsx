import { useState } from "react";
import Dashboard from "./pages/Dashboard"; // Importa el Dashboard
function App() {
  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6">
        <Dashboard /> {/* Muestra el Dashboard en la App */}
      </div>
    </>
  );
}

export default App;
