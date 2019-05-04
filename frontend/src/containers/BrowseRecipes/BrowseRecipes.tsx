import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import Api from "../../services/Api";
import Header from "../../components/Header/Header";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
import { Footer } from "../../components/Footer/Footer";
import AddDayMealModal from "../../components/AddDayMealModal/AddDayMealModal";
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
  key: number,
  recipe: iRecipe,
  onOpenModal: any,
}

interface iRecipe {
  instructions: string,
  title: string,
  image: string,
  slug: string,
  tags: number[],
  id: number,
}

interface BrowseRecipesState {
  recipes: iRecipe[],
  tags: any,
  selectedTags: any,
  modalIsOpen: boolean,
  clickedRecipe: iRecipe,
}
const BASE_URL: string = 'http://localhost:8000/storage/';

const RecipeListItem = (props: RecipeListItemProps) => {
  const handleClick = () => {
    props.onOpenModal(props.recipe);
  }

  return (
    <div className="level">
      <div className="level-left">
        <div className="RecipeListItem content">
            <h2 className="levelHeader">{props.recipe.title}</h2>
            <p className="levelContent">{props.recipe.instructions}</p>
            <Link className="levelLink" to={`/recipe/detail/${props.recipe.slug}`}>Read more</Link>
            <a className="levelLink" href="#" onClick={handleClick}>Add to week</a>
        </div>
      </div>

      <div className="level-right">
        <figure className="level-item image is-128x128">
          <img
            alt=""
            src={BASE_URL+props.recipe.image || "https://bulma.io/images/placeholders/128x128.png"} />
        </figure>
      </div>
      <hr className="levelHr"/>
    </div>
  )
}

class BrowseRecipes extends Component<Props> {
  state: BrowseRecipesState = {
    tags: [],
    selectedTags: [],
    recipes: [],
    modalIsOpen: false,
    clickedRecipe: {
      instructions: '',
      title: '',
      image: '',
      slug: '',
      tags: [],
      id: 0,
    },
  }

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
    const api = Api.create();

    const response: ApiResponse<any> = await api.recipeTags(this.props.user.access_token);
    this.setState({ tags: response.data })

    if (!response.ok) {
        console.log("TAG ERRORRR")
      return;
    }

    const recipesResponse: ApiResponse<any> = await api.recipesAllInfo(this.props.user.access_token);
    console.log(recipesResponse);
    this.setState({ recipes: recipesResponse.data.recipes })

    if (!response.ok) {
      console.log("RECIPE ERRORRR")
    return;
    }
  }

  handleOpenModal = (recipe: iRecipe) => {
    console.log("Open Modal");
    this.setState({ modalIsOpen: true });
    this.setState({ clickedRecipe: recipe });
  }

  handleModalClose = () => {
    console.log("Close Modal");
    this.setState({ modalIsOpen: false });

  }

  // handleAddRecipe = async (props: any) => {
  //   const api = Api.create();
  //   const response: ApiResponse<any> = await api.daymealUpdate({
  //     date: props.date,
  //     meal_type: props.meal_type,
  //     recipe_id: props.recipe_id,
  //   }, this.props.user.access_token);;

  //   if (!response.ok) {
  //       console.log("DAYMEAL ERRORRR")
  //     return;
  //   }
  //   console.log('BrowseRecipe.handleAddRecipe')
  // }

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
              {this.state.recipes.map((recipe: iRecipe, index: any) => (
                <RecipeListItem key={index} recipe={recipe} onOpenModal={this.handleOpenModal} />))}
            </div>
          </div>
        </main>
        <Footer copyrightText="" />
        {this.state.modalIsOpen && (
          <AddDayMealModal
            text="Add meal to weekly plan"
            recipe={this.state.clickedRecipe}
            // onSubmit={this.handleAddRecipe}
            onClose={this.handleModalClose} />
        )}
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(BrowseRecipes);
