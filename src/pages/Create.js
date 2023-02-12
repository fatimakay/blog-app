import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Create.scss";

const Create = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false); //for editing existing blog

  const { id } = useParams(); //get blog id from route

  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      //if route has an id, enable edit mode and fetch the respective blog
      setEditMode(true);
      getSingleBlog(id);
    } else {
      setEditMode(false);
    }
  }, [id]);

  //fetch blog that the user wants to edit
  const getSingleBlog = async (id) => {
    const singleBlog = await axios.get(`http://localhost:8000/blogs/${id}`);

    setTitle(singleBlog.data.title);
    setAuthor(singleBlog.data.author);
    setBody(singleBlog.data.body);
  };

  //function to handle publish button click
  const handleSubmit = async (e) => {
    e.preventDefault();

    //getting and formatting the date of publishing post
    const now = new Date();
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = now.toLocaleDateString("en-US", options);

    //blog object to store data
    const blog = { title, body, author, date: formattedDate };
    setIsLoading(true);

    //create new blog if not in edit mode, else update current blog 
    if (!editMode) {
      try {
        const response = await axios.post(
          "http://localhost:8000/blogs",
           blog
        );

        setIsLoading(false);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    } else {
      try {
        const response = await axios.put(
          `http://localhost:8000/blogs/${id}`,
          blog
        );

        setIsLoading(false);
        navigate("/");
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="create-blog">
      <h2>{editMode ? "Edit Post" : "Create New Post"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="blog-title"
          type="text"
          required
          value={title}
          placeholder="Add Title"
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          type="text"
          required
          value={author}
          placeholder="Author"
          onChange={(e) => setAuthor(e.target.value)}
        ></input>
        <textarea
          required
          value={body}
          placeholder="Start writing"
          rows={10}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        {!isLoading && <button>Publish</button>}
        {isLoading && <button>Publishing...</button>}
      </form>
    </div>
  );
};

export default Create;
