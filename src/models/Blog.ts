import { ObjectId, Collection } from "mongodb";
import { connectToDatabase } from "@/lib/mongodb";

export interface BlogPost {
  _id?: ObjectId;
  title: string;
  content: string;
  image?: string;
  author: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface BlogPostUpdate {
  title?: string;
  content?: string;
  image?: string;
  updatedAt: Date;
}

async function getBlogCollection(): Promise<Collection<BlogPost>> {
  // ...existing code...
  const { db } = await connectToDatabase();
  return db.collection<BlogPost>("blog");
}

export function validateBlogPost(post: Partial<BlogPost>): string | null {
  if (!post.title?.trim()) return 'Title is required';
  if (post.title.length > 100) return 'Title is too long (max 100 characters)';
  if (!post.content?.trim()) return 'Content is required';
  if (post.content.length > 50000) return 'Content is too long (max 50000 characters)';
  if (post.image && !isValidUrl(post.image)) return 'Invalid image URL';
  return null;
}

export async function createBlogPost(post: Omit<BlogPost, "_id" | "createdAt" | "updatedAt">): Promise<BlogPost> {
  const collection = await getBlogCollection();
  const blogPost: BlogPost = { ...post, createdAt: new Date() };
  const result = await collection.insertOne(blogPost);
  return { ...blogPost, _id: result.insertedId };
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const collection = await getBlogCollection();
  return collection.find({}).sort({ createdAt: -1 }).toArray();
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const collection = await getBlogCollection();
  return collection.findOne({ _id: new ObjectId(id) });
}

export async function deleteBlogPostById(id: string, author: string): Promise<boolean> {
  const collection = await getBlogCollection();
  const result = await collection.deleteOne({ _id: new ObjectId(id), author });
  return result.deletedCount === 1;
}

export async function updateBlogPost(
  id: string,
  author: string,
  updates: Partial<BlogPost>
): Promise<boolean> {
  const collection = await getBlogCollection();
  const result = await collection.updateOne(
    { _id: new ObjectId(id), author },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  return result.modifiedCount === 1;
}

function isValidUrl(string: string): boolean {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}
