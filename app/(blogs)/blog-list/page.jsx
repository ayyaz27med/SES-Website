import BlogDefault from "@/components/blogs/BlogDefault";
import BlogList from "@/components/blogs/BlogList";
import Footer1 from "@/components/footers/Footer1";
import Header from "@/components/headers/Header";
import Topbar from "@/components/headers/Topbar";
import Link from "next/link";
import React from "react";

export default function BlogListPage() {
  return (
    <>
      <Topbar />
      <Header />
      <div
        className="page-title"
        style={{ backgroundImage: "url(/images/section/page-title.jpg)" }}
      >
        <div className="container-full">
          <div className="row">
            <div className="col-12">
              <h3 className="heading text-center">Blogs</h3>
              <ul className="breadcrumbs d-flex align-items-center justify-content-center">
                <li>
                  <Link className="link" href={`/`}>
                    Home
                  </Link>
                </li>
                <li>
                  <i className="icon-arrRight" />
                </li>
                <li>
                  <Link className="link" href="/blog-list">
                    Blogs
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <BlogList />
      <Footer1 />
    </>
  );
}
