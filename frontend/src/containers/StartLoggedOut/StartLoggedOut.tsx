import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Header } from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import { Card } from "../../components/Card/Card";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
import "./StartLoggedOut.css";
import { Modal } from "../../components/Modal/Modal";

class StartLoggedOut extends Component {
  async componentDidMount() {
    const response = await fetch('/api/ping');
    console.log(response);
  }

  public buttons = [
    <PrimaryMenuButton text="Sign Up" link={"/register"} class="header__button--yellow" />,
    <PrimaryMenuButton text="Log In" link={"/login"} class="header__button--pink" />,
  ];

  render() {
    return (
      <div className="StartLoggedOut">
        <Header buttons={this.buttons} />
        <main>
          <section className="start__container--img">
            <div className="container">
              <div className="columns">
                <div className="column">
                  <div className="start__card--main card">
                    <div className="start__card--text card-content" >
                      <h2 className="start__card--title">Planera dina matvanor</h2>
                      <div className="start__card--description">
                        Ät det du vill när du vill, gör din vardag enkel med Receptplaneraren.
                      </div>
                        <Link to={`/welcome`}>
                          <button className="start__card--button button">Gå med nu</button>
                        </Link>
                    </div>          
                  </div>
                </div>
                <div className="column"></div>
                <div className="column"></div>
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
                    alt="Placeholder image" />
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
                    alt="Placeholder image" />
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
                    alt="Placeholder image" />
                </div>

              </div>
            </div>
          </section>
        </main>
        <Footer copyrightText="Copyright 2019. Informational text." />
        <Modal text="You have been logged out." />
      </div>
    );
  }
}

export default StartLoggedOut;