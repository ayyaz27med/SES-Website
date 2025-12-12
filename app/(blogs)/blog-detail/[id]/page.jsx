import BlogDetail from "@/components/blogs/BlogDetail";
import BlogDetail1 from "@/components/blogs/BlogDetail1";
import BlogGrid from "@/components/blogs/BlogGrid";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";

import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import { allBlogs } from "@/data/blogs";
import React from "react";

export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;
  return (
    <>
      <Topbar />
      <Header />
      <BlogDetail id={id} />
      <RelatedBlogs />
      <Footer1 />
    </>
  );
}
