import React, { useEffect, useState } from "react";

/* const posts = [
  {
    id: 1,
    title: "Estrategias de Marketing Digital",
    likes: 120,
    comments: 45,
    shares: 30,
  },
  {
    id: 2,
    title: "Mejores herramientas de IA",
    likes: 95,
    comments: 38,
    shares: 22,
  },
  {
    id: 3,
    title: "Cómo crecer en Instagram",
    likes: 85,
    comments: 25,
    shares: 18,
  },
  {
    id: 4,
    title: "Tendencias en Redes Sociales 2025",
    likes: 78,
    comments: 19,
    shares: 15,
  },
]; */

// Componente de Tabla de Publicaciones
const TopPostsTable = () => {
  const [posts, setPosts] = useState([]); // Stores all posts from API
  //class 3

  const [sortBy, setSortBy] = useState(null); // Stores the selected sorting field
  const [ascending, setAscending] = useState(true); // Sorting order
  //
  const [filteredPosts, setFilteredPosts] = useState([]); // Stores filtered posts
  const [searchTerm, setSearchTerm] = useState(""); // Stores the search input value
  //class 3
  useEffect(() => {
    // Fetch data from JSON Server when component mounts

    fetch("http://localhost:5000/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts(data); // Save original data
        setFilteredPosts(data); // Set filtered data to show initially
      })
      .catch((error) => {
        return console.error("Error fetching posts:", error);
      });
  }, []);

  //class 3
  // Sorting function
  /*
  const handleSort = (field) => {
    const isAscending = sortBy === field ? !ascending : true; // Toggle order if sorting the same column again
    setSortBy(field);
    setAscending(isAscending);

    const sortedPosts = [...posts].sort((a, b) => {
      if (isAscending) {
        return a[field] > b[field] ? 1 : -1;
      } else {
        return a[field] < b[field] ? 1 : -1;
      }
    });

    setPosts(sortedPosts);
  };*/

  const handleSort = (field) => {
    const isAscending = sortBy === field ? !ascending : true; // Toggle order if clicking the same column
    setSortBy(field);
    setAscending(isAscending);

    const sortedPosts = [...filteredPosts].sort((a, b) => {
      return isAscending ? a[field] - b[field] : b[field] - a[field];
    });

    setFilteredPosts(sortedPosts);
  };

  // Search function
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value)
    );

    // 🔧 If sorting is applied, apply it to the search results
    if (sortBy) {
      filtered = filtered.sort((a, b) =>
        ascending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      );
    }
    setFilteredPosts(filtered);
  };

  //Class 3

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
      {/* bg-white: Fondo blanco */}
      {/* p-6: Padding interno */}
      {/* shadow-lg: Sombra para destacar */}
      {/* rounded-lg: Bordes redondeados */}
      {/* mt-6: Margen superior para separación */}

      <h2 className="text-xl font-bold mb-4">Publicaciones Más Populares</h2>
      {/* text-xl: Tamaño de texto grande */}
      {/* font-bold: Texto en negrita */}
      {/* mb-4: Margen inferior */}

      {/* 🔥 NEW: Search Bar */}
      <input
        type="text"
        placeholder="Search posts..." // Input placeholder text
        value={searchTerm} // Controlled input (connected to state)
        onChange={handleSearch} // Calls handleSearch() on input change
        className="w-full p-2 mb-4 border rounded-lg"
      />

      <table className="w-full text-left border-collapse">
        {/* w-full: Ancho completo */}
        {/* text-left: Alineación izquierda */}
        {/* border-collapse: Fusiona los bordes de la tabla */}

        <thead>
          <tr className="bg-gray-100">
            {/* bg-gray-100: Fondo gris claro */}
            {/* <th className="p-3">Publicación</th>
            <th className="p-3">Likes</th>
            <th className="p-3">Comentarios</th>
            <th className="p-3">Compartidos</th> */}
            {/*class 3 */}
            <th className="p-3">Post</th> {/* Sorting on Click */}
            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("likes")}
            >
              Likes {sortBy === "likes" ? (ascending ? "↑" : "↓") : ""}
            </th>
            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("comments")}
            >
              Comments {sortBy === "comments" ? (ascending ? "↑" : "↓") : ""}
            </th>
            <th
              className="p-3 cursor-pointer"
              onClick={() => handleSort("shares")}
            >
              Shares {sortBy === "shares" ? (ascending ? "↑" : "↓") : ""}
            </th>
            {/*Class 3 */}
          </tr>
        </thead>
        <tbody>
          {/*
          {posts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              {/* border-b: Borde inferior */}
          {/* hover:bg-gray-50: Cambio de color al pasar el cursor */
          /*}
              <td className="p-3">{post.title}</td>
              <td className="p-3">{post.likes}</td>
              <td className="p-3">{post.comments}</td>
              <td className="p-3">{post.shares}</td>
            </tr>
          ))}*/}
          {filteredPosts.length > 0 ? (
            filteredPosts.map((post) => (
              <tr key={post.id} className="border-b hover:bg-gray-50">
                <td className="p-3">{post.title}</td>
                <td className="p-3">{post.likes}</td>
                <td className="p-3">{post.comments}</td>
                <td className="p-3">{post.shares}</td>
              </tr>
            ))
          ) : (
            <tr>
              {/* 🔥 NEW: Message when no results are found */}
              <td colSpan="4" className="p-3 text-center text-gray-500">
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TopPostsTable;
