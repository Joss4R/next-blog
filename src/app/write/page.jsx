"use client"

import { useEffect, useState } from "react"
import styles from "./write.module.css"
import Image from "next/image"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.bubble.css"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { app } from "@/utils/firebase";
import DOMPurify from "dompurify"



const Write = () => {
    
    const { status } = useSession()
    const router = useRouter()
        

    const [open, setOpen] = useState(false)
    const [ file, setFile] = useState(null)
    const [ media, setMedia] = useState("")
    const [ value, setValue] = useState("")
    const [title, setTitle] = useState("")
    const [catSlug, setCatSlug] = useState("");
    const [featured, setFeatured] = useState(false);
    const [popular, setPopular] = useState(false);

    useEffect(()=>{
        const storage = getStorage(app)
        const upload = ()=>{
            const name = new Date().getTime() + file.name
            const storageRef = ref(storage, name);

            const uploadTask = uploadBytesResumable(storageRef, file);


            uploadTask.on('state_changed', 
             (snapshot) => {
    
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log('Upload is ' + progress + '% done');
                switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
                 }
                }, 
            (error) => {}, 
                () => {
            
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setMedia(downloadURL)
            });
         }
        );
    };
        file && upload();
        },[file]);
    
        if(status === "loading"){
            return <div className={styles.loading}>Loading.....</div>
        }

        if (status === "unauthenticated") {
            router.push("/");
          }

          const slugify = (str) =>
            str
              .toLowerCase()
              .trim()
              .replace(/[^\w\s-]/g, "")
              .replace(/[\s_-]+/g, "-")
              .replace(/^-+|-+$/g, "");
       

              const handleSubmit = async () => {
                const sanitizedDesc = DOMPurify.sanitize(value)
                try {
                  const res = await fetch("/api/posts", {
                    method: "POST",
                    body: JSON.stringify({
                      title,
                      desc: sanitizedDesc,
                      img: media,
                      slug: slugify(title),
                      catSlug: catSlug || "style",
                      featured, // Include featured in the request body
                      popular, // Include popular in the request body
                    }),
                  });
                  
                  if (res.ok) {
                    router.push("/"); // Redirect to homepage on success
                  } else {
                    console.error("Failed to create post");
                  }
                } catch (err) {
                  console.error("Error creating post:", err);
                }
              }
    

  return (
    <div className={styles.container}>
        <input 
            type="text" 
            placeholder="Title" 
            className={styles.input}
            onChange={(e)=>setTitle(e.target.value)} 
        />

        <div className={styles.options}> 

        <select className={styles.select} onChange={(e) => setCatSlug(e.target.value)}>
            <option value="style">style</option>
            <option value="fashion">fashion</option>
            <option value="food">food</option>
            <option value="culture">culture</option>
            <option value="travel">travel</option>
            <option value="coding">coding</option>
      </select>

      <div className={styles.checkboxContainer}>
        <label>
          <input
            type="checkbox"
            checked={featured}
            onChange={(e) => setFeatured(e.target.checked)}
            />
          Featured
        </label>
        <label>
          <input
            type="checkbox"
            checked={popular}
            onChange={(e) => setPopular(e.target.checked)}
            />
          Popular
        </label>
      </div>

     </div>
        <div className={styles.editor}>
            <button className={styles.button} onClick={()=>setOpen(!open)}>
                <Image src="/plus.png" width={16} height={16}/>
            </button>
            {open && (
                <div className={styles.add}>
                    <input 
                        type="file" 
                        id="image"
                        onChange={(e)=>setFile(e.target.files[0])}
                        style={{ display: "none"}}
                     />

        <button className={styles.addButton}>
            <label htmlFor="image">
                <Image src="/image.png" width={16} height={16}/>
            </label>
        </button>
            <button className={styles.addButton}>
                <Image src="/external.png" width={16} height={16}/>
            </button>
            <button className={styles.addButton}>
                <Image src="/video.png" width={16} height={16}/>
            </button>
                
            </div>)}
            <ReactQuill 
                className={styles.textArea}
                theme="bubble" 
                value={value} 
                onChange={setValue} 
                placeholder="Tell your story...."
             />
        </div>
        <button 
            className={styles.publish}
            onClick={handleSubmit}
        >
            Publish
        </button>
    </div>
  )
}

export default Write