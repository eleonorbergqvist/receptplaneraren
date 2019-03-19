import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export interface HeaderProps {output: string};

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
        <a className="navbar-item">
          Home
        </a>
      </div>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            <a className="header__button--yellow button">
              Sign up
            </a>
            <a className="header__button--pink button">
              Log in
            </a>
          </div>
        </div>
      </div>
    </div>
  </nav>
);