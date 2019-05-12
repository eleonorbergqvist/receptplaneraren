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
          <section className="start__container--img">
            <div className="container">
              <div className="columns">
                <div className="column is-two-fifths">
                  <div className="start__card--main card">
                    <div className="start__card--text card-content">
                      <h2 className="start__card--title">
                        Planera dina matvanor
                      </h2>
                      <div className="start__card--description">
                        Ät det du vill när du vill, gör din vardag enkel med
                        Receptplaneraren.
                      </div>
                      <Link to={`/welcome`}>
                        <button className="start__card--button button">
                          Gå med nu
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

          <section className="start__container--bg">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <Card
                    image="/images/hermes-rivera-258743-unsplash.jpg"
                    content="Nulla condimentum orci dignissim ante volutpat feugiat.
                    Phasellus sit amet viverra risus, non faucibus ligula.
                    Fusce vel aliquet neque. Fusce libero justo,
                    hendrerit id mollis vitae, pellentesque in nisi.
                    Proin posuere egestas orci eget lobortis. Nunc risus est,
                    venenatis lobortis nisl at, sodales egestas mi.
                    Curabitur efficitur vehicula rhoncus."
                    alt="Placeholder image"
                  />
                </div>

                <div className="column">
                  <Card
                    image="/images/keenan-loo-27635-unsplash.jpg"
                    content="Nulla condimentum orci dignissim ante volutpat feugiat.
                    Phasellus sit amet viverra risus, non faucibus ligula.
                    Fusce vel aliquet neque. Fusce libero justo,
                    hendrerit id mollis vitae, pellentesque in nisi.
                    Proin posuere egestas orci eget lobortis. Nunc risus est,
                    venenatis lobortis nisl at, sodales egestas mi.
                    Curabitur efficitur vehicula rhoncus."
                    alt="Placeholder image"
                  />
                </div>

                <div className="column">
                  <Card
                    image="/images/luisa-schetinger-1164948-unsplash.jpg"
                    content="Nulla condimentum orci dignissim ante volutpat feugiat.
                    Phasellus sit amet viverra risus, non faucibus ligula.
                    Fusce vel aliquet neque. Fusce libero justo,
                    hendrerit id mollis vitae, pellentesque in nisi.
                    Proin posuere egestas orci eget lobortis. Nunc risus est,
                    venenatis lobortis nisl at, sodales egestas mi.
                    Curabitur efficitur vehicula rhoncus."
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
