import prisma from "@/utils/connect"
import { NextResponse } from "next/server"

export const GET = async (req) => {
    const {searchParams} = new URL(req.url)
    const postSlug = searchParams.get("postSlug")
    try{
        const comments = await prisma.comment.findMany({
            where:{
                ...(postSlug && {postSlug}),
            },
            include: {user: true},
        });
        return new NextResponse(JSON.stringify(comments, { status: 200}))

    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Upps, something went wrong!"}, { status: 500}))
    }
}

//CREATE A COMMENT 

export const POST = async (req) => {
    try {
      const { desc, postSlug } = await req.json();
  
      const newComment = await prisma.comment.create({
        data: {
          desc,
          postSlug,
          userId: req.session.user.id, // Assuming you have user session set up and user is authenticated
        },
        include: { user: true },
      });
  
      return NextResponse.json(newComment, { status: 201 });

    }catch(err){
        console.log(err)
        return new NextResponse(JSON.stringify({message: "Upps, something went wrong!"}, { status: 500}))
    }
}