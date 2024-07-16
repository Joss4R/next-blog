"use client"

import { useRouter } from "next/navigation"
import styles from "./pagentation.module.css"


const Pagentation = ({page, hasPrevious, hasNext}) => {
  const router = useRouter();

 
  return (
    <div className={styles.container}>
      <button className={styles.button} 
      onClick={()=> router.push(`?page=${page - 1}`)}
      disabled ={!hasPrevious}
      >
        Previous
      </button>

      <button className={styles.button} 
        onClick={()=> router.push(`?page=${page + 1}`)}
        disabled={!hasNext}
        >
        Next
      </button>

    </div>
  )
}

export default Pagentation