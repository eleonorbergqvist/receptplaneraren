import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { iRootState } from "../../store";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Tabs } from "../../components/Tabs/Tabs";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps;

class StartLoggedIn extends Component<Props> {
  public buttons = [
    <PrimaryMenuButton
      key={1}
      text="Create Recipe"
      link={"#"}
      class="header__button--yellow"
    />,
    <PrimaryMenuButton
      key={2}
      text="Browse Recipes"
      link={"#"}
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

  render() {
    if (!this.props.user.access_token) {
      return <Redirect to={"/login"} />;
    }

    return (
      <React.Fragment>
        <Header buttons={this.buttons} />
        <main className="container">
          <div className="start__Container columns">
            <div className="column">
              <h1>Vecka 12</h1>
              <span className="icon">
                <i className="fas fa-caret-left" />
              </span>
              <span className="icon">
                <i className="fas fa-caret-right" />
              </span>
              <p>
                Aenean iaculis gravida diam, et tincidunt diam elementum
                pulvinar. Curabitur dignissim tortor at blandit iaculis.
                Phasellus consequat velit quis leo pharetra, et ultricies turpis
                aliquet. Fusce pulvinar, leo faucibus facilisis ullamcorper,
                ligula mi interdum quam, vitae accumsan leo augue sed neque.
                Etiam sit amet ante malesuada, luctus est at, finibus nunc. Nam
                feugiat feugiat nulla ut blandit. Morbi eget porttitor mauris,
                sed lobortis justo. Sed eget metus at risus laoreet consectetur
                bibendum a nunc. Quisque quam magna, sollicitudin egestas orci
                a, congue aliquam nibh.
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
        <Footer copyrightText="Testtesttest" />
      </React.Fragment>
    );
  }
}

export default connect(
  mapState,
  null
)(StartLoggedIn);
