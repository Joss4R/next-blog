import Menu from "@/components/menu/Menu"
import styles from "./singlePage.module.css"
import Image from "next/image"
import Comment from "@/components/comments/Comments"


const getData = async (slug) => {
  const res = await fetch(`http://localhost:3000/api/posts/${slug}`,{
      cache: "no-store"
  })

  if(!res.ok){
      throw new Error("Failed")
  }
  return res.json()

  }

const SinglePage = async ({params}) => {
  const { slug } = params
  const data = await getData(slug)
  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
          <div className={styles.textContainer}>
            <h1 className={styles.title}>{data?.title}</h1>
            <div className={styles.user}>
              {data?.user?.image && <div className={styles.userImageContainer}>
                <Image src={data.user.image} fill alt="Miss Kahu" className={styles.avatar}/>
              </div>}
              <div className={styles.userTextContainer}>
                <span className={styles.username}>{data?.user.name}</span>
                <span className={styles.date}>19.12.2024</span>
              </div>
            </div>
          </div>
          {data?.img && <div className={styles.imageContainer}>
            <Image src={data?.img} fill  alt="Miss Kahu" className={styles.image}/>
          </div>}
      </div>
      <div className={styles.content}>
        <div className={styles.post}>
          <div className={styles.desc} dangerouslySetInnerHTML={{__html: data?.desc}}/>
          
          <div className={styles.comments}>
            <Comment postSlug={slug}/>
          </div>
        </div>
        <Menu data={data} />
      </div>
    </div>
  )
}

export default SinglePage