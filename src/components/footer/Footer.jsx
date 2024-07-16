import styles from "./footer.module.css"
import Image from "next/image"
import Link from "next/link"

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <div className={styles.logo}>
          <Image src="/logo.png" alt="Kamau Blog" width={50} height={50}/>
          <h1 className={styles.logoText}>Kamau Blog</h1>
        </div>
        <p className={styles.desc}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Et mollitia fugiat amet sint exercitationem recusandae placeat vitae. Iure, ullam nam.
        </p>
        <div className={styles.icons}>
          <Image src="/facebook.png" alt="#" width={18} height={18}/>
          <Image src="/instagram.png" alt="#" width={18} height={18}/>
          <Image src="/tiktok.png" alt="#" width={18} height={18}/>
          <Image src="/youtube.png" alt="#" width={18} height={18}/>
        </div>
      </div>
      <div className={styles.links}>
        <div className={styles.list}>
          <span className={styles.listTitle}>Links</span>
          <Link href="/">Homepage</Link>
          <Link href="/">Blog</Link>
          <Link href="/">About</Link>
          <Link href="/">Contact</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Tags</span>
          <Link href="/">Style</Link>
          <Link href="/">Fashion</Link>
          <Link href="/">Coding</Link>
          <Link href="/">Travel</Link>
        </div>
        <div className={styles.list}>
          <span className={styles.listTitle}>Socials</span>
          <Link href="/">Facebook</Link>
          <Link href="/">Instagram</Link>
          <Link href="/">Tiktok</Link>
          <Link href="/">Youtube</Link>
        </div>
        
      </div>
    </div>
  )
}

export default Footer