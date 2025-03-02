import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const HashtagAnalysis = () => {
  const [hashtags, setHashtags] = useState([]); // Almacena los hashtags disponibles
  const [selectedHashtag, setSelectedHashtag] = useState(""); // Hashtag seleccionado
  const [chartData, setChartData] = useState([]); // Datos del gráfico

  // 🔄 Obtener datos desde db.json (simulación de API)
  useEffect(() => {
    fetch("http://localhost:5000/hashtags")
      .then((res) => res.json())
      .then((data) => {
        setHashtags(data);
        if (data.length > 0) {
          setSelectedHashtag(data[0].name); // Selecciona el primer hashtag por defecto
          setChartData(data[0].mentions);
        }
      })
      .catch((error) => console.error("Error fetching hashtags:", error));
  }, []);

  // 🏷️ Manejar el cambio de hashtag
  const handleChange = (event) => {
    const hashtag = event.target.value;
    setSelectedHashtag(hashtag);
    const selectedData = hashtags.find((h) => h.name === hashtag);
    setChartData(selectedData ? selectedData.mentions : []);
  };

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
      {/* 📌 Estilos de Tailwind CSS:
          - bg-white → Fondo blanco
          - p-6 → Padding interno
          - shadow-lg → Sombra suave para resaltar
          - rounded-lg → Bordes redondeados
          - mt-6 → Margen superior para separación */}

      <h2 className="text-xl font-bold mb-4 text-gray-800">Hashtag Analysis</h2>
      {/* 📌 text-xl → Tamaño de fuente grande
          font-bold → Texto en negrita
          mb-4 → Margen inferior
          text-gray-800 → Color de texto oscuro */}

      {/* 🔽 Dropdown para seleccionar un hashtag */}
      <select
        value={selectedHashtag}
        onChange={handleChange}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        {/* 📌 w-full → Ancho completo
            p-2 → Padding interno pequeño
            mb-4 → Margen inferior
            border → Borde delgado
            rounded-lg → Bordes redondeados
            focus:ring-2 → Resalta el dropdown al enfocarse */}
        {hashtags.map((hashtag) => (
          <option key={hashtag.name} value={hashtag.name}>
            {hashtag.name}
          </option>
        ))}
      </select>

      {/* 📊 Gráfico de evolución del hashtag */}
      {/* 📊 Gráfico de evolución del hashtag */}
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          {/* 🎨 Cuadrícula del gráfico con líneas punteadas */}
          <CartesianGrid strokeDasharray="3 3" />

          {/* 📅 Eje X con fechas como etiquetas */}
          <XAxis dataKey="date" />

          {/* 🔢 Eje Y para mostrar la cantidad de menciones */}
          <YAxis />

          {/* ℹ️ Tooltip para mostrar información al pasar el cursor */}
          <Tooltip />

          {/* 📈 Línea del gráfico representando la evolución de menciones */}
          <Line
            type="monotone" // Tipo de curva de la línea
            dataKey="mentions" // Datos representados en el eje Y
            stroke="#8884d8" // Color de la línea (morado)
            strokeWidth={2} // Grosor de la línea
          />
        </LineChart>
      </ResponsiveContainer>
      {/* 📌 width="100%" → Se ajusta al contenedor padre
          height={300} → Altura del gráfico
          stroke="#8884d8" → Color de la línea
          strokeWidth={2} → Grosor de la línea */}
    </div>
  );
};

export default HashtagAnalysis;
