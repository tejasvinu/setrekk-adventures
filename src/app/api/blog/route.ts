import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { getAllBlogPosts, createBlogPost } from "@/models/Blog";

export async function GET() {
  try {
    const posts = await getAllBlogPosts();
    return NextResponse.json(posts);
  } catch (err) {
    console.error("Failed to fetch blog posts:", err);
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { 
      title, 
      content, 
      image,
      location,
      trekDetails
    } = await req.json();
    
    if (!title || !content || !location || !trekDetails) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const post = await createBlogPost({
      title,
      content,
      image,
      author: session.user.email,
      location,
      trekDetails
    });

    return NextResponse.json(post);
  } catch (err) {
    console.error("Failed to create blog post:", err);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
