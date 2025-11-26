"use client";
import React from "react";

export default function Information() {
  return (
    <div className="my-account-content">
      <div className="account-details">
        <form
          onSubmit={(e) => e.preventDefault()}
          className="form-account-details form-has-password"
        >
          <div className="account-info">
            <h5 className="title">Information</h5>
            <div className="mb_20">
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  placeholder="Full Name*"
                  name="text"
                  tabIndex={2}
                  defaultValue="Tony Stark"
                  aria-required="true"
                  required
                />
              </fieldset>
            </div>
            <div className="cols mb_20">
              <fieldset className="">
                <input
                  className=""
                  type="email"
                  placeholder="Username or email address*"
                  name="email"
                  tabIndex={2}
                  defaultValue="themesflat@gmail.com"
                  aria-required="true"
                  required
                />
              </fieldset>
              <fieldset className="">
                <input
                  className=""
                  type="text"
                  readOnly
                  placeholder="Phone*"
                  name="text"
                  tabIndex={2}
                  defaultValue="(+12) 345 678 910"
                  aria-required="true"
                />
              </fieldset>
            </div>
          </div>
          <div className="button-submit">
            <button className="tf-btn btn-fill" type="submit">
              <span className="text text-button">Update Account</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
