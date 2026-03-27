import { useEffect, useState } from "react";

export default function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then(res => res.json())
      .then(data => setData(data));
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {data.slice(0,5).map(post => (
        <p key={post.id}>{post.title}</p>
      ))}
    </div>
  );
}