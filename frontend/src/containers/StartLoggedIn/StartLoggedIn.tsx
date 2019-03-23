import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Tabs } from "../../components/Tabs/Tabs";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";


class StartLoggedIn extends Component {

  public buttons = [
    <PrimaryMenuButton text="Create Recipe" link={"#"} class="header__button--yellow" />,
    <PrimaryMenuButton text="Browse Recipes" link={"#"} class="header__button--yellow" />,
    <PrimaryMenuButton text="Settings" link={"#"} class="header__button--yellow" />,
    <PrimaryMenuButton text="Log Out" link={"/"} class="header__button--pink" />,
  ];

  render() {
    return (
      <React.Fragment>
        <Header buttons={this.buttons} />
          <main className="container">
            <div className="start__Container columns">
              <div className="column">
                <h1>Vecka 12</h1>
                <span className="icon iconColor">
                  <i className="fas fa-home iconColor"></i>
                </span>
                  <i className="fas fa-caret-right iconColor"></i>
                  <p>Aenean iaculis gravida diam, et tincidunt diam elementum pulvinar. Curabitur 
                    dignissim tortor at blandit iaculis. Phasellus consequat velit quis leo pharetra, 
                    et ultricies turpis aliquet. Fusce pulvinar, leo faucibus facilisis ullamcorper, 
                    ligula mi interdum quam, vitae accumsan leo augue sed neque.
                    Etiam sit amet ante malesuada, luctus est at, finibus nunc. Nam feugiat feugiat 
                    nulla ut blandit. Morbi eget porttitor mauris, sed lobortis justo. 
                    Sed eget metus at risus laoreet consectetur bibendum a nunc. 
                    Quisque quam magna, sollicitudin egestas orci a, congue aliquam nibh.
                  </p>
                <button className="button">Generate Shoppinglist</button>
                <br />
                <Link to={`/`}>Visit StartLoggedOut page.</Link>
              </div>
              <div className="column">
                <Tabs />
              </div>
            </div>
          </main>
        <Footer copyrightText="Testtesttest"/>
      </React.Fragment>
    );
  }
}

export default StartLoggedIn;