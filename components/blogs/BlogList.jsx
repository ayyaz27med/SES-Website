"use client"
import React, { useState } from "react";
import Sidebar from "./Sidebar";
import Pagination from "../common/Pagination";
import Link from "next/link";
import Image from "next/image";
import safeImage from "@/utlis/safeImage";
import useBlogs from "@/services/tanstack/queries/useBlogs";

export default function BlogList() {
  const [page, setPage] = useState(1);
  let length = 10;
  const { data, isBlogsFetching } = useBlogs(
    {
      isServerSidePagination: true,
      length,
      "order[0][0]": 'title',
      "order[0][1]": "DESC"
    }
  );
  const blogs = data?.data || []
  const total = Number(data?.count || 0);
  const totalPages = Math.ceil(total / length);
  if (isBlogsFetching) return <div>Loading...</div>;

  return (
    <div className="main-content-page">
      <div className="container">
        <div className="row">
          <div className="col-lg-8 mb-lg-30">
            {blogs.map((blog) => (
              <div key={blog?.id} className="wg-blog style-row hover-image mb_40">
                <div className="image">
                  <Image
                    className="lazyload"
                    alt=""
                    src={safeImage(blog?.banner_image)}
                    width={600}
                    height={399}
                    objectFit="cover"
                    style={{ height: '399px', width: '600px' }}
                  />
                </div>
                <div className="content">
                  <ul className="list-tags has-bg flex-wrap" >
                    {blog?.tags.map((tag, index) => {
                      return (
                        <li key={`${tag}-${index}`}>
                          <a href="#" className="link">
                            {tag}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                  <div className="d-flex align-items-center justify-content-between flex-wrap gap-10">
                    <div className="meta">
                      <div className="meta-item gap-8">
                        <div className="icon">
                          <i className="icon-calendar" />
                        </div>
                        <p className="text-caption-1">{blog?.createdAt}</p>
                      </div>
                    </div>
                  </div>
                  <h5 className="title">
                    <Link className="link" href={`/blog-detail/${blog?.id}`}>
                      {blog?.title}
                    </Link>
                  </h5>
                  <p className="text-line-clamp-4">{blog?.short_description}</p>
                  <Link
                    href={`/blog-detail/${blog?.id}`}
                    className="link text-button bot-button"
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
            {totalPages > 1 && (
              <ul className="wg-pagination mt_20 wg-pagination justify-content-center">
                <Pagination
                  currentPage={page}
                  totalPages={totalPages}
                  onPageChange={(p) => setPage(p)}
                />
              </ul>
            )}
          </div>
          <div className="col-lg-4">
            <Sidebar />
          </div>
        </div>
      </div>
    </div>
  );
}
