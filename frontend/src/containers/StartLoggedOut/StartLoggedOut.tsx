import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { iRootState, Dispatch } from "../../store";
import { Link } from "react-router-dom";
import { HeaderLoggedOut } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { Card } from "../../components/Card/Card";
import Modal from "../../components/Modal/Modal";
import "./StartLoggedOut.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({
  setToken: dispatch.user.setToken
});

interface StartLoggedOutProps {
  location: any;
}

interface StartLoggedOutState {
  modelIsOpen: boolean,
}

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch> &
  StartLoggedOutProps;
type Props = connectedProps;


class StartLoggedOut extends Component<Props, StartLoggedOutState> {
  state = {
    modelIsOpen: true,
  }

  handleLoggedOutModalClose = () => {
    this.setState({ modelIsOpen: false });
  }

  render() {
    const { location } = this.props;
    const locationState = location.state || {};

    if (this.props.isLoggedIn) {
      return <Redirect to={"/welcome"} />;
    }

    return (
      <div className="StartLoggedOut">
        <HeaderLoggedOut />
        <main>
          <section className="StartLoggedOut__Container--Img">
            <div className="container">
              <div className="columns">
                <div className="column is-two-fifths">
                  <div className="StartLoggedOut__Card--Main card">
                    <div className="StartLoggedOut__Card--Text card-content">
                      <h2 className="StartLoggedOut__Card--Title">
                        Plan your eating habits
                      </h2>
                      <div className="StartLoggedOut__Card--Description">
                        Eat what you want, whenever you want, make your everyday life simple with the recipe planner
                      </div>
                      <Link to={`/welcome`}>
                        <button className="StartLoggedOut__Card--Button button">
                          Join in
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div className="column" />
                <div className="column" />
              </div>
            </div>
          </section>

          <section className="StartLoggedOut__Container--Bg">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <Card
                    image="/images/hermes-rivera-258743-unsplash.jpg"
                    content="Build your own meal schedule"
                    alt="Placeholder image"
                  />
                </div>

                <div className="column">
                  <Card
                    image="/images/keenan-loo-27635-unsplash.jpg"
                    content="A easy way to digitialize your recipes"
                    alt="Placeholder image"
                  />
                </div>

                <div className="column">
                  <Card
                    image="/images/luisa-schetinger-1164948-unsplash.jpg"
                    content="Automatic shopping list"
                    alt="Placeholder image"
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer copyrightText="Copyright 2019. Receptplaneraren" />

        {(locationState.showLogOutModal && this.state.modelIsOpen) && (
          <Modal text="You have been logged out." onClose={this.handleLoggedOutModalClose} />
        )}
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(StartLoggedOut);
