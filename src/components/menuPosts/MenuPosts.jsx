"use client"

import styles from "./menuPosts.module.css"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts?popular=true`,{
      cache: "no-store"
  })

  if(!res.ok){
      throw new Error("Failed")
  }
  return res.json()

  }



  const MenuPosts = ({ withImage }) => {
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
  
    if (error) return <div>Error: {error}</div>;

    return (
    <div className={styles.items}>
      { posts.map((post)=>(

        <Link href={`/posts/${post.slug}`} key={post.id} className={styles.item}>
         {withImage && post.img && (
           <div className={styles.imageContainer}>
              <Image src={post.img} alt="#" fill className={styles.image}/>
            </div>
         )}

            <div className={styles.textContainer}>
              <span className={`${styles.category} ${styles.travel}`}>
                {post.catSlug}
              </span>
              <h3 className={styles.postTitle}>
                {post.title}
              </h3>
              <div className={styles.detail}>
                <span className={styles.username}>{post.user}</span>
                <span className={styles.date}> - {post.createdAt.substring(0,10)}</span>
              </div>
            </div>
        </Link>
        
            ))}

      </div>
  )
}

export default MenuPosts