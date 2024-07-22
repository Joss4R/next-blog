"use client"

import { useEffect, useState } from "react"
import styles from "./featured.module.css"
import Image from "next/image"
import Link from "next/link"



const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts?featured=true`,{
      cache: "no-store"
  })

  if(!res.ok){
      throw new Error("Failed")
  }
  return res.json()

  }

const Featured = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getData();
        setPosts(data.posts);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);
  return (
    <div className={styles.container}>
      
      <h1 className={styles.title}>
        <b className={styles.bold}>Hey, dev Joss here!</b>  Discover my stories and creative ideas.
      </h1>
      { posts.map((post)=>(
      <div className={styles.post}>
      
        <div className={styles.imgContainer}>
          <Image src={post.img} alt="#" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.postTitle}>{post.title}</h1>
        <p className={styles.postDesc}>
          {post.desc}
        </p>
        <Link href={`/posts/${post.slug}`}>
          <button className={styles.btn}>Read more</button>
        </Link>
          </div>
      </div>
      ))}
    </div>
      
  )
}

export default Featured