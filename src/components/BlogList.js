import { Link } from "react-router-dom";
import "./BlogList.scss";
import { ArrowRightCircle, Edit, Trash2 } from "react-feather";

//generate a blog preview card for each blog in the database
const BlogList = ({ blogs, handleDelete }) => {
  return (
    <div className="blog-list">
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <div className="blog-preview" key={blog.id}>
            <div className="icons">
              <Link to={`edit/${blog.id}`}>
                <Edit title="Edit" color="#779ECB" />
              </Link>
              <Trash2 color="#FF6961" onClick={() => handleDelete(blog.id)} />
            </div>
            <h3>{blog.title}</h3>
            <p>Written by: {blog.author}</p>
            <p className="date">{blog.date}</p>
            <Link to={`/blogs/${blog.id}`}>
              <div className="read-more">
                <ArrowRightCircle color="#f8bfc8" />
                <span>Read More</span>
              </div>
            </Link>
          </div>
        ))
      ) : (
        <p>No blogs to show.</p>
      )}
    </div>
  );
};

export default BlogList;
