"use client";
import React from "react";

export default function Sidebar() {
  return (
    <div className="sidebar maxw-360">
      <div className="sidebar-item sidebar-tag">
        <h5 className="sidebar-heading">Popular Tag</h5>
        <ul className="list-tags">
          <li>
            <a href="#" className="text-caption-1 link">
              Fashion Trends
            </a>
          </li>
          <li>
            <a href="#" className="text-caption-1 link">
              Sustainable Fashion
            </a>
          </li>
          <li>
            <a href="#" className="text-caption-1 link">
              Street Style
            </a>
          </li>
          <li>
            <a href="#" className="text-caption-1 link">
              Beauty Tips
            </a>
          </li>
          <li>
            <a href="#" className="text-caption-1 link">
              Street Style
            </a>
          </li>
          <li>
            <a href="#" className="text-caption-1 link">
              Vintage Fashion
            </a>
          </li>
          <li>
            <a href="#" className="text-caption-1 link">
              Eco Friendly
            </a>
          </li>
          <li>
            <a href="#" className="text-caption-1 link">
              Tips
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
