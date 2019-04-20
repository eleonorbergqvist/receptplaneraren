import React, { Component } from "react";
import { Redirect } from "react-router";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import Api from "../../services/Api";
import Header from "../../components/Header/Header";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
import { Footer } from "../../components/Footer/Footer";
import "./BrowseRecipes.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
// to include additional typings
// use `type Props = connectedProps & { ...additionalTypings }
type Props = connectedProps;

interface RecipeListItemProps {

}

const RecipeListItem = (props: RecipeListItemProps) => {
  return (
    <div className="level">
      <div className="level-left">
        <div className="RecipeListItem content">
            <h2 className="levelHeader">My Recipe</h2>
            <p className="levelContent">Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Phasellus nec iaculis mauris. Lorem ipsum dolor sit amet, 
            consectetur adipiscing elit. Phasellus nec iaculis mauris.</p>
            <a className="levelLink" href="#">Read more</a>
            <a className="levelLink" href="#">Add to week</a>
        </div>
      </div>

      <div className="level-right">
        <figure className="level-item image is-128x128">
          <img src="https://bulma.io/images/placeholders/128x128.png" />
        </figure>
      </div>
      <hr className="levelHr"/>
    </div>
  )
}

class BrowseRecipes extends Component<Props> {
  // state: CreateRecipeState = {
  //   tags: [],
  //   selectedTags: [],
  // }

  public buttons = [
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
      class="header__button--yellow is-active"
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

  async componentDidMount () {
    // Get all recipes with tags (belonging to user?)
    // const api = Api.create();

    // const response: ApiResponse<any> = await api.recipeTags(this.props.user.access_token);
    // this.setState({ tags: response.data })

    // if (!response.ok) {
    //     console.log("TAG ERRORRR")
    //   return;
    // }
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="BrowseRecipes">
        <Header buttons={this.buttons} />
        <main className="container">
          <div className="columns">
            <div className="column is-two-fifths">
              Bläddra bland recept.
              Taggar för filtrering.
            </div>
            <div className="column">
              <div className="level">
                <div className="level-left">
                </div>
                <div className="level-right">
                  <div className="level-item">
                    <div className="field has-addons">
                      <p className="control">
                        <input className="input" type="text" placeholder="Find a post" />
                      </p>
                      <p className="control">
                        <button className="button">
                          Search
                        </button>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <RecipeListItem />
            </div>
          </div>
        </main> 
        <Footer copyrightText="" />
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(BrowseRecipes);