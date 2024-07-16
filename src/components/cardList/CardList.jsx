import Card from "../card/Card"
import Pagentation from "../pagentation/Pagenation"
import styles from "./cardList.module.css"

const getData = async (page, cat) => {
  const res = await fetch(`http://localhost:3000/api/posts?page=${page}&cat=${cat || ""}`,{
      cache: "no-store"
  })

  if(!res.ok){
      throw new Error("Failed")
  }
  return res.json()

  } 

const CardList = async({page, cat }) => {
  const {posts, count} = await getData(page, cat)

  const POST_PER_PAGE = 2

  const hasPrevious = POST_PER_PAGE * (page-1) > 0;
  const hasNext = POST_PER_PAGE * (page-1) + POST_PER_PAGE < count;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Recent Posts</h1>
      <div className={styles.posts}>
        {posts?.map((item)=>( 
       <Card item={item} key={item._id}/>

      ))}
      
      </div>
      <Pagentation page={page} hasNext={hasNext} hasPrevious={hasPrevious}/>
    </div>
  )
}

export default CardList