import prisma from "@/utils/connect";
import { NextResponse } from "next/server";


//GET SINGLE POST 

export const GET = async (req, {params}) => {

    const { slug } = params;
   
    try{

        const post = await prisma.post.findUnique({
            where:{ slug },
            include: { user: true},
        });



        return new NextResponse(JSON.stringify(post), { status: 200 });

    } catch (err) {
        console.error("Error fetching posts:", err); // Log the actual error
        return new NextResponse(JSON.stringify({ message: `Oops, something went wrong: ${err.message}` }), { status: 500 });
    }
};
