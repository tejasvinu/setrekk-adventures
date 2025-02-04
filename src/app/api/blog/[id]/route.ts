import { NextRequest, NextResponse } from "next/server";
import { getBlogPostById, deleteBlogPostById, updateBlogPost, validateBlogPost } from "@/models/Blog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // changed type
) {
  const { id } = await params; // await params now
  if (!id) {
    return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
  }

  try {
    const post = await getBlogPostById(id);
    
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (err) {
    console.error("Failed to fetch post:", err);
    return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // changed type
) {
  const { id } = await params; // await params now
  if (!id) {
    return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const success = await deleteBlogPostById(id, session.user.email);
    if (!success) {
      return NextResponse.json({ error: "Post not found or unauthorized" }, { status: 404 });
    }
    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (err) {
    console.error("Failed to delete post:", err);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } // changed type
) {
  const { id } = await params; // await params now
  if (!id) {
    return NextResponse.json({ error: "Missing ID parameter" }, { status: 400 });
  }

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const updates = await request.json();
    const validationError = validateBlogPost(updates);
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }

    const success = await updateBlogPost(id, session.user.email, updates);
    if (!success) {
      return NextResponse.json({ error: "Post not found or unauthorized" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post updated successfully" });
  } catch (err) {
    console.error("Failed to update post:", err);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}

