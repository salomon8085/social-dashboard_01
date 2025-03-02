import React from "react";
import KPISection from "../components/KPISection";
import Charts from "../components/Charts";
import TopPostsTable from "../components/TopPostsTable"; // Importamos la tabla
import HashtagAnalysis from "../components/HashtagAnalysis"; //Importar

const Dashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Dashboard de Redes Sociales</h1>
      <KPISection />
      <Charts />
      <HashtagAnalysis /> {/* Agregamos el análisis de hashtags */}
      <TopPostsTable /> {/* Agregamos la tabla */}
    </div>
  );
};

export default Dashboard;
