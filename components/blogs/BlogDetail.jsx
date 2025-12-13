"use client"
import React from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Image from "next/image";
import useBlogDetails from "@/services/tanstack/queries/useBlogDetails";
import { formatDate } from "@/helpers/dateTime";
import ToastHelper from "@/helpers/toastHelper";

export default function BlogDetail({ id }) {
  const { data, isLoading } = useBlogDetails(id)
  const blog = data

  const handleShare = () => {
    if (typeof window === "undefined") return;
    const url = `${window.location.origin}${window.location.pathname}`;
    navigator.clipboard.writeText(url);
    ToastHelper.success("Link copied!");
  };

  return (
    <div className="blog-detail-wrap mb_36">
      <div className="image"
        style={{
          backgroundImage: `url(${blog?.banner_image})`,
        }}
      />
      <div className="inner">
        <div className="heading">
          <h3 className="fw-5">{blog?.title}</h3>
          <div className="meta justify-content-center">
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-calendar" />
              </div>
              <p className="body-text-1">{formatDate(blog?.publish_at, "MMMM DD, yyyy")}</p>
            </div>
          </div>
        </div>
        <div className="content">
          <p className="body-text-1 mb_12">{blog?.short_description}</p>
        </div>
        <div className="tf-grid-layout tf-col-1 lg-col-2 xl-col-2">
          {blog?.photos.map((photo) => {
            return (
              <div key={photo}>
                <Image
                  alt=""
                  src={photo}
                  width={623}
                  height={468}
                />
              </div>
            )
          })}
        </div>
        <div className="content">
          <div
            className="main-description"
            dangerouslySetInnerHTML={{ __html: blog?.main_description }}
          />
        </div>
        <div className="bot d-flex justify-content-between gap-10 flex-wrap">
          <ul className="list-tags has-bg flex-wrap" >
            <li>Tag:</li>
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
          <div className="d-flex align-items-center justify-content-between gap-16">
            <p>Share this post:</p>
            <div className="tf-social-icon box-icon hover-tooltip compare btn-icon-action btn-style-4 radius-3 p-0 radius-60" style={{ width: '40px', height: '40px' }} onClick={handleShare}>
              <div className="icon">
                <i className="icon-share" />
              </div>
              <span className="tooltip text-caption-2">
                Share
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
