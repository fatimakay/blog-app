import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BlogDetail = () => {
    const { id } = useParams(); //get blog id from route
    const [blog, setBlog] = useState();

    useEffect(() => {
        //fetch blogs if an id exists
        if (id) {
            getBlogDetail();
        }
    }, [id]);

    const getBlogDetail = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/blogs/${id}`);
            setBlog(response.data);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div className="blog-detail">
            {blog && (
                <article>
                    <h2>{blog.title}</h2>
                    <p>Written by: {blog.author}</p>
                    <p className="date">{blog.date}</p>
                    <div>{blog.body}</div>
                </article>
            )}
        </div>
    );
};

export default BlogDetail;
