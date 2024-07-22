import { getAuthSession } from "@/utils/auth";
import prisma from "@/utils/connect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "1", 10);

    //const page = searchParams.get("page");
    const cat = searchParams.get("cat");
    const popular = searchParams.get("popular");
    const featured = searchParams.get("featured") === "true"; // Extract featured parameter

    
    
    const POST_PER_PAGE = 2;

    const query = {
        take: POST_PER_PAGE,
        skip: POST_PER_PAGE * (page - 1),
        where: {
            ...(cat && {catSlug: cat }),
            ...(popular && { popular: popular === 'true' }),
            ...(featured && { featured }),
        },
    };
    try {
        
        const [posts, count] = await prisma.$transaction([
            prisma.post.findMany(query),
            prisma.post.count({where:query.where}),
        ]);

      

        return new NextResponse(JSON.stringify({posts, count}, { status: 200 }));

    } catch (err) {
        console.error("Error fetching posts:", err); // Log the actual error
        return new NextResponse(JSON.stringify({ message: `Oops, something went wrong: ${err.message}` }), { status: 500 });
    }
};

//CREATE A POST 

export const POST = async (req) => {
    const session = await getAuthSession();
  
    if (!session) {
      return new NextResponse(
        JSON.stringify({ message: "Not Authenticated!" }, { status: 401 })
      );
    }
  
    try {
      const body = await req.json();
      const post = await prisma.post.create({
        data: { ...body,
           userEmail: session.user.email,
           featured: body.featured,
           popular: body.popular,
           },
      });
  
      return new NextResponse(JSON.stringify(post, { status: 200 }));
    } catch (err) {
      console.log(err);
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }, { status: 500 })
      );
    }
  };
