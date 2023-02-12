import { useEffect, useState } from "react";
import axios from "axios";
import BlogList from "../components/BlogList";
import "./Home.scss";

const Home = () => {
  const [blogs, setBlogs] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  //get all blogs from json server
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8000/blogs");

      //reverse chronological order
      const sortedBlogs = response.data.sort(
        (a, b) => new Date(b.date) - new Date(a.date)
      );

      setBlogs(sortedBlogs);
    } catch (error) {
      console.error(error);
    }
  };

  //handle blog deletion
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      const response = await axios.delete(`http://localhost:8000/blogs/${id}`);
      if (response.status === 200) {
        console.log("deleted");
        
        //re-fetch after deletion
        fetchData();
      } else {
        console.log("could not delete");
      }
    }
  };
  return (
    <div className="home">
      <h2 style={{ marginTop: "3%" }}>All Posts</h2>
      <BlogList blogs={blogs} handleDelete={handleDelete} />
    </div>
  );
};

export default Home;
