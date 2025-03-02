import React, { useEffect, useState } from "react";

// Componente de Tabla de Publicaciones
const TopPostsTable = () => {
  const [posts, setPosts] = useState([]); // Stores all posts from API

  const [sortBy, setSortBy] = useState(null); // Stores the selected sorting field
  const [ascending, setAscending] = useState(true); // Sorting order
  //
  const [filteredPosts, setFilteredPosts] = useState([]); // Stores filtered posts
  const [searchTerm, setSearchTerm] = useState(""); // Stores the search input value

  const [likesFilter, setLikesFilter] = useState("all"); // Filter by likes class 6

  useEffect(() => {
    // Fetch data from JSON Server when component mounts

    fetch("http://localhost:5000/posts")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setPosts([...data]); // Save original data
        setFilteredPosts([...data]); // Set filtered data to show initially
      })
      .catch((error) => {
        return console.error("Error fetching posts:", error);
      });
  }, []);

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
    //setFilteredPosts([...posts]);
    console.log("1. posts: ", posts);
    applyFilters(value, likesFilter); // class 6

    /*
    let filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(value)
    );

    // 🔧 If sorting is applied, apply it to the search results
    if (sortBy) {
      filtered = filtered.sort((a, b) =>
        ascending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      );
    }
    setFilteredPosts(filtered);
    */
  };

  const applyFilters = (search, likes) => {
    //class 6
    /*   let filtered = posts.filter((post) =>
      post.title.toLowerCase().includes(search)
    ); */
    console.log(`2. Seacrh: ${search}`);
    //console.log(filteredPosts);
    let filtered;
    if (search !== "") {
      console.log("3. Enter in If");
      filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(search)
      );
    } else {
      filtered = [...posts];
    }
    console.log(filteredPosts);

    if (likes !== "all") {
      const minLikes = parseInt(likes, 10);
      filtered = filtered.filter((post) => post.likes >= minLikes);
    }

    if (sortBy) {
      filtered = filtered.sort((a, b) =>
        ascending ? a[sortBy] - b[sortBy] : b[sortBy] - a[sortBy]
      );
    }

    setFilteredPosts(filtered);
  };

  const handleLikesFilter = (event) => {
    //class 6
    const value = event.target.value;
    setLikesFilter(value);
    console.log(`01. searchTerm: '${searchTerm}' & likes: '${value}'`);
    applyFilters(searchTerm, value);
  };

  //Class 3

  return (
    <div className="bg-white p-6 shadow-lg rounded-lg mt-6">
      {/* ✅ Main container with background, padding, shadow, and rounded borders */}

      <h2 className="text-xl font-bold mb-4 text-gray-800">Popular Posts</h2>
      {/* ✅ Darker text for better visibility */}

      {/* 🔍 Search Bar */}
      <input
        type="text"
        placeholder="Search posts..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/*class 6 */}
      {/* Likes Filter Dropdown */}
      <select
        value={likesFilter}
        onChange={handleLikesFilter}
        className="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      >
        <option value="all">All Likes</option>
        <option value="50">More than 50 Likes</option>
        <option value="100">More than 100 Likes</option>
      </select>
      {/*class 6 */}

      {/* ✅ Added horizontal scrolling on small screens */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold text-left">
              {/* ✅ Darker header text & centered */}
              <th className="p-4">Post</th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("likes")}
              >
                Likes {sortBy === "likes" ? (ascending ? "↑" : "↓") : ""}
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("comments")}
              >
                Comments {sortBy === "comments" ? (ascending ? "↑" : "↓") : ""}
              </th>
              <th
                className="p-4 cursor-pointer"
                onClick={() => handleSort("shares")}
              >
                Shares {sortBy === "shares" ? (ascending ? "↑" : "↓") : ""}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <tr
                  key={post.id}
                  className="border-b hover:bg-gray-100 transition duration-200 text-left"
                >
                  {/* ✅ Centered text & smooth hover effect */}
                  <td className="p-4">{post.title}</td>
                  <td className="p-4">{post.likes}</td>
                  <td className="p-4">{post.comments}</td>
                  <td className="p-4">{post.shares}</td>
                </tr>
              ))
            ) : (
              <tr>
                {/* 🔥 NEW: Message when no results are found */}
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TopPostsTable;
