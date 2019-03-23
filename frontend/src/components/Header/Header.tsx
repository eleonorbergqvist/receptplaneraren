import React, { Component } from "react";
import { Link } from "react-router-dom";
import PrimaryMenuButton from "../PrimaryMenuButton/PrimaryMenuButton";
import "./Header.css";

export interface HeaderProps {buttons: JSX.Element[]};

export const Header = (props: HeaderProps) => (
  <nav className="header navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-brand">
      <a className="header__title navbar-item">
        Receptplaneraren
      </a>

      <a 
        role="button" 
        className="navbar-burger burger" 
        aria-label="menu" 
        aria-expanded="false" 
        data-target="navbarBasicExample"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navbarBasicExample" className="navbar-menu">
      <div className="navbar-start">
        <Link to="/">
          <a className="navbar-item">
            Home
          </a>
        </Link>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {props.buttons}
          </div>
        </div>
      </div>
    </div>
  </nav>
);