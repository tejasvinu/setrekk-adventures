export default async function BlogLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  // Optionally, resolve params if needed:
  // const resolvedParams = await params;
  return children;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  return {
    title: `Blog Post - ${resolvedParams.id}`,
  };
}
