import Link from "next/link"
import styles from "./menu.module.css"
import Image from "next/image"
import MenuPosts from "../menuPosts/MenuPosts"
import MenuCategories from "../menuCategories/MenuCategories"

const Menu = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.subTitle}>{"What's hot"}</h2>
      <h1 className={styles.title}>Most popular</h1>

        <MenuPosts withImage={false} />

      <h2 className={styles.subTitle}>Discover by topic</h2>
      <h1 className={styles.title}>Categories</h1>
        <MenuCategories />
      <h2 className={styles.subTitle}>Chosen by the editor</h2>
      <h1 className={styles.title}>Editor's pick</h1>
      
      <MenuPosts withImage={true} />

    </div>
  )
}

export default Menu