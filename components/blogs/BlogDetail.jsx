"use client"
import React from "react";
import Comments from "./Comments";
import CommentForm from "./CommentForm";
import Image from "next/image";
import useBlogDetails from "@/services/tanstack/queries/useBlogDetails";
import { formatDate } from "@/helpers/dateTime";

export default function BlogDetail({ id }) {
  const { data, isLoading } = useBlogDetails(id)
  const blog = data

  return (
    <div className="blog-detail-wrap">
      <div className="image"
        style={{
          backgroundImage: `url(${blog?.banner_image})`,
        }}
      />
      <div className="inner">
        <div className="heading">
          <ul className="list-tags has-bg justify-content-center">
            <li>
              <a href="#" className="link">
                Fashion Trends
              </a>
            </li>
          </ul>
          <h3 className="fw-5">{blog?.title}</h3>
          <div className="meta justify-content-center">
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-calendar" />
              </div>
              <p className="body-text-1">{formatDate(blog?.publish_at, "MMMM DD, yyyy")}</p>
            </div>
            <div className="meta-item gap-8">
              <div className="icon">
                <i className="icon-user" />
              </div>
              <p className="body-text-1">
                by{" "}
                <a className="link" href="#">
                  Themesflat
                </a>
              </p>
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
            <ul className="tf-social-icon style-1">
              <li>
                <a href="#" className="social-facebook">
                  <i className="icon icon-fb" />
                </a>
              </li>
              <li>
                <a href="#" className="social-twiter">
                  <i className="icon icon-x" />
                </a>
              </li>
              <li>
                <a href="#" className="social-pinterest">
                  <i className="icon icon-pinterest" />
                </a>
              </li>
              <li>
                <a href="#" className="social-instagram">
                  <i className="icon icon-instagram" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="related-post">
          <div className="pre w-50">
            <div className="text-btn-uppercase">
              <a href="#">Previous</a>
            </div>
            <h6 className="fw-5">
              <a className="link" href="#">
                How to choose the right customer
              </a>
            </h6>
          </div>
          <div className="next w-50">
            <div className="text-btn-uppercase text-end">
              <a href="#">Next</a>
            </div>
            <h6 className="fw-5 text-end">
              <a className="link" href="#">
                Starting your traveling blog with Vasco
              </a>
            </h6>
          </div>
        </div>
        <Comments />
        <CommentForm />
      </div>
    </div>
  );
}
