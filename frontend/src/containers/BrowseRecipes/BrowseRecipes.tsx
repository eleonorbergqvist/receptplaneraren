import React, { Component } from "react";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { iRootState, Dispatch } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import { iApi } from "../../services/Api";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import AddDayMealModal from "../../components/AddDayMealModal/AddDayMealModal";
import { RecipeTags, iRecipeTag } from "../../components/RecipeTags/RecipeTags";
import { getEnv } from "../../config";
import "./BrowseRecipes.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps & { api: iApi }

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
  recipe_tags: {id: any}[],
  id: number,
}

interface BrowseRecipesState {
  recipes: iRecipe[],
  tags: any,
  selectedTags: any,
  filteredRecipes: iRecipe[],
  modalIsOpen: boolean,
  clickedRecipe: iRecipe,
  isLoading: boolean,
}

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
            <button className="levelLink" onClick={handleClick}>Add to week</button>
        </div>
      </div>

      <div className="level-right">
        <figure className="level-item image is-128x128">
          <img
            alt=""
            src={getEnv('IMAGE_PREFIX')+props.recipe.image || getEnv('FALLBACK_IMAGE')} />
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
    filteredRecipes: [],
    modalIsOpen: false,
    clickedRecipe: {
      instructions: '',
      title: '',
      image: '',
      slug: '',
      recipe_tags: [],
      id: 0,
    },
    isLoading: false,
  }

  async componentDidMount () {
    // TODO: Get all recipes with tags (belonging to user?)
    this.setState({ isLoading: true })

    const { api } = this.props
    const response: ApiResponse<any> = await api.recipeTags(
      this.props.user.access_token
    );
    this.setState({ tags: response.data })

    if (!response.ok) {
      this.setState({ isLoading: false })
      console.log("TAG ERRORRR")
      return;
    }

    const recipesResponse: ApiResponse<any> = await api.recipesAllInfo(
      this.props.user.access_token
    );
    this.setState({
      recipes: recipesResponse.data.recipes,
      filteredRecipes: recipesResponse.data.recipes
    })

    if (!response.ok) {
      this.setState({ isLoading: false })
      console.log("RECIPE ERRORRR")
      return;
    }

    this.setState({ isLoading: false })
  }

  filterListByTag = (filters: []) => {
    const filteredRecipeList = this.state.recipes.filter((recipe) => {
      return filters.every(filter =>
          recipe.recipe_tags.some((obj: {id: number})  => {
            return obj.id === filter;
          })
        )
      }
    );
    return filteredRecipeList;
  }

  handleToggleTag = (tag: iRecipeTag) => {
    let { selectedTags } = this.state

    if (selectedTags.includes(tag.id)) {
      selectedTags = selectedTags.filter((x: any) => x !== tag.id)
    } else {
      selectedTags = [tag.id, ...selectedTags]
    }

    const filteredRecipes = this.filterListByTag(selectedTags);
    this.setState({ selectedTags, filteredRecipes });
  }

  handleOpenModal = (recipe: iRecipe) => {
    this.setState({ modalIsOpen: true });
    this.setState({ clickedRecipe: recipe });
  }

  handleModalClose = () => {
    this.setState({ modalIsOpen: false });
  }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    return (
      <div className="BrowseRecipes">
        <HeaderLoggedIn />
        <main className="container">
          <div className="columns">
            <div className="column is-two-fifths">
              <h5 className="title is-5">Browse recipes</h5>
              {this.state.isLoading && <div className="loader"></div>}

              Taggar för filtrering.
              <RecipeTags
                tags={this.state.tags}
                selectedTags={this.state.selectedTags}
                onToggleTag={this.handleToggleTag}
              />
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
              {this.state.filteredRecipes.map((recipe: iRecipe, index: any) => (
                <RecipeListItem key={index} recipe={recipe} onOpenModal={this.handleOpenModal} />))}
            </div>
          </div>
        </main>
        <Footer copyrightText="Copyright 2019. Receptplaneraren" />
        {this.state.modalIsOpen && (
          <AddDayMealModal
            text="Add meal to weekly plan"
            recipe={this.state.clickedRecipe}
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
