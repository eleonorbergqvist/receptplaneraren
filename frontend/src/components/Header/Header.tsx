/* eslint jsx-a11y/anchor-is-valid: 1 */
import React, { Component } from "react";
import { Link } from "react-router-dom";
import PrimaryMenuButton from "../PrimaryMenuButton/PrimaryMenuButton";
import "./Header.css";

export interface HeaderProps {
  buttons: JSX.Element[];
}
export interface HeaderState {
  burgerIsActive: boolean;
}

class Header extends Component<HeaderProps, HeaderState> {
  state = {
    burgerIsActive: false
  }

  handleToggleMenuClick = () => {
    this.setState({ burgerIsActive: !this.state.burgerIsActive });
  }

  render() {
    return (
      <nav className="header navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a href="/" className="header__title navbar-item">Receptplaneraren</a>
          <a
            role="button"
            href="#"
            className= {"navbar-burger burger " + (this.state.burgerIsActive ? 'is-active' : '')}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={this.handleToggleMenuClick}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </a>
        </div>

        <div id="navbarBasicExample" className={"navbar-menu " + (this.state.burgerIsActive ? 'is-active' : '')}>
          <div className="navbar-start">
            <Link className="navbar-item" to="/">
              Home
            </Link>
          </div>
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons header__buttons">{this.props.buttons}</div>
            </div>
          </div>
        </div>
      </nav>
    )
  }
}
/* eslint jsx-a11y/anchor-is-valid: 0 */

export const HeaderLoggedOut = (props:any) => {
  const buttons = [
    <PrimaryMenuButton
      key={1}
      text="Sign Up"
      link={"/register"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={2}
      text="Log In"
      link={"/login"}
      class="header__button--pink"
    />
  ];

  return <Header buttons={buttons} />
}

export const HeaderLoggedIn = (props:any) => {
  const buttons = [
    <PrimaryMenuButton
      key={1}
      text="Create Recipe"
      link={"/recipe/create"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={2}
      text="Browse Recipes"
      link={"/recipe/browse"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={3}
      text="Settings"
      link={"#"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={4}
      text="Log Out"
      link={"/logout"}
      class="header__button--pink"
    />
  ];

  return <Header buttons={buttons} />
}

export default Header;
