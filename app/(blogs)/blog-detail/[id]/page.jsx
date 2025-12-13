import BlogDetail from "@/components/blogs/BlogDetail";
import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import React from "react";

export default async function BlogDetailsPage1({ params }) {
  const { id } = await params;
  return (
    <>
      <Topbar />
      <Header />
      <BlogDetail id={id} />
      <Footer1 />
    </>
  );
}
