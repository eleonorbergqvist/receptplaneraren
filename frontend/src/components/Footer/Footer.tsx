import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export interface FooterProps {
  copyrightText: string;
}

export const Footer = (props: FooterProps) => {
  return (
    <React.Fragment>
      <footer className="footer footer">
        <div className="content has-text-centered">
          <p className="footer__text">{props.copyrightText}</p>
        </div>
      </footer>
    </React.Fragment>
  );
};
