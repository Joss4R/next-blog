import styles from "./featured.module.css"
import Image from "next/image"

const Featured = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        <b className={styles.bold}>Hey, dev Joss here!</b>  Discover my stories and creative ideas.
      </h1>
      <div className={styles.post}>
        <div className={styles.imgContainer}>
          <Image src="/p1.jpeg" alt="#" fill className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <h1 className={styles.postTitle}>Lorem ipsum dolor sit amet consectetur adipisicing.</h1>
        <p className={styles.postDesc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. In nam dolor quia ipsum, commodi beatae hic qui dolore consequuntur earum.
        </p>
        <button className={styles.btn}>Read more</button>
          </div>
      </div>
    </div>
  )
}

export default Featured