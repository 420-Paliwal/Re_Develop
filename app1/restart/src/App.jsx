import { useEffect, useState } from "react";
import LoginForm from "./forms/LoginForm";

export default function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      }).catch(err => {
        setError("Something went wrong")
        setLoading(false)
      })
  }, []);

  if (loading) return <h1>Loading.....</h1>;
  if(error) return <h1>{error}</h1>
  return <div>
      <LoginForm/>
      <h1>Posts</h1>
      {data.slice(0,5).map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  }