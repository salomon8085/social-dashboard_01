import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
// Importamos los componentes de Rechats que nos permiten crear nuestra gráfica

const data = [
  { name: "Jan", followers: 400 },
  { name: "Feb", followers: 800 },
  { name: "Mar", followers: 1500 },
  { name: "Apr", followers: 2200 },
  { name: "May", followers: 3000 },
];
// Simulación de datos de pruebas.

const Charts = () => {
  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      {/* // w-full: Hace que el contenedor/elemento ocupe todo el ancho disponible.
      // p-4: Agrega padding interno (4 unidades). // bg-white: Fondo blanco.
      //shadow-md:Agrega una sombra mediana al contenedor. // rounded-lg: → //
      Bordes redondeados grandes. */}
      <h2 className="text-lg font-bold mb-2">Crecimiento de Seguidores</h2>
      <ResponsiveContainer width="100%" height={300}>
        {/* // Hace que el gráfico se ajuste automaticamente al contenedor */}
        <LineChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          {/* //Será un gráfico de línea, enviamos el arreglo de objetos como
          //información //margin: Especifica los márgenes */}
          <CartesianGrid strokeDasharray="3 3" />
          {/* //Agrega una cuadrícula de fondo para referenciar la gráfica
          //strokeDasharray="3 3": Estilo de línea discontinuo */}
          <XAxis dataKey="name" />
          {/* //Define el eje X, donde cada punto representa un mes "name" */}
          <YAxis />
          {/* //Representa la cantidad de seguidores en el eje Y. */}
          <Tooltip />
          {/* //Muestra información cuando el usuario pasa el cursor sobre el
          gráfico. */}
          <Line
            type="monotone"
            dataKey="followers"
            stroke="#4F46E5"
            strokeWidth={3}
          />
          {/* // Line: Dibuja la línea del gráfico. // type="monotone": Suaviza la
          //curva de la línea. // dataKey="followers": La línea representa la
          //cantidad de seguidores. // stroke="#4F46E5": Define el color de la
          // línea en azul. // strokeWidth={3}: Grosor de la línea. */}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Charts;
