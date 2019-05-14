import React, { Component, FormEvent } from "react";
import { Redirect, RouteComponentProps } from "react-router";
import { connect } from "react-redux";
import * as moment from 'moment';
import { ApiResponse } from "apisauce";
import { iRootState } from "../../store";
import { iApi } from "../../services/Api";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import Message from "../../components/Message/Message";
import TabNav from "../../components/TabNav/TabNav";
import RecipeItem, { RecipeItemEmpty } from "../../components/RecipeItem/RecipeItem";
import ShoppingList from "../../components/ShoppingList/ShoppingList";
import DayMealList from "../../components/DayMealList/DayMealList";
import "./StartLoggedIn.css"

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps & { api: iApi } & RouteComponentProps

interface StartLoggedInState {
  mondayDate: any,
  weekmeals: any,
  selectedDayOfWeek: number,
  isLoggedOut: boolean,
  shoppingList: any,
  shoppingListError: string,
  isLoadingShoppingList: boolean,
}

class StartLoggedIn extends Component<Props> {
  state: StartLoggedInState = {
    mondayDate: null,
    weekmeals: [],
    selectedDayOfWeek: 0,
    isLoggedOut: false,
    shoppingList: [],
    shoppingListError: "",
    isLoadingShoppingList: false,
  }

 componentDidMount () {
    const mondayDate = moment.default().startOf('isoWeek');

    this.setState({ mondayDate, }, () => {
      this.getDayMealsData()
    });
  }

  handleWeekChange = async (e: React.FormEvent, direction:number) => {
    e.preventDefault();
    let newMondayDate = this.state.mondayDate;

    if (direction === 1) {
      newMondayDate = newMondayDate.clone().add(7, 'days');
    }

    if (direction === -1) {
      newMondayDate = newMondayDate.clone().subtract(7, 'days');
    }

    this.setState({ mondayDate: newMondayDate }, () => {
      this.getDayMealsData()
    });

    // TODO: använda debounce vid många click
  }

  getDayMealsData = async () => {
    const { api } = this.props
    const { mondayDate } = this.state

    const monday = mondayDate.format('YYYY-MM-DD');
    const response: ApiResponse<any> = await api.daymealsByDate(
      this.props.user.access_token,
      monday,
    );

    if (response.status === 401) {
      this.setState({ isLoggedOut: true })
      return;
    }

    if (!response.ok) {
      return;
    }

    this.setState({ weekmeals: response.data.daymeals })
  }

  handleCloseErrorMessage = () => {
    this.setState({ shoppingListError: '' });
  }

  handleTabNavChange = (item: any) => {
    this.setState( {
      selectedDayOfWeek: item.value,
    });
  }

  handleShoppingList = async (e: FormEvent) => {
    e.preventDefault();

    this.setState({ isLoadingShoppingList: true });

    const monday = this.state.mondayDate.format('YYYY-MM-DD');
    console.log('Frontend monday');
    console.log(monday);
    const { api } = this.props
    const response: ApiResponse<any> = await api.shoppingList(
      this.props.user.access_token,
      monday,
    );

    this.setState({ isLoadingShoppingList: false });

    if (response.status === 401) {
      this.setState({ isLoggedOut: true })
      return;
    }

    if (!response.ok) {
      this.setState({ shoppingListError: "Error generating shoppinglist" })
      return;
    }

    this.setState({
      shoppingList: response.data.shoppinglist
    })
  }

  handleRecipeItemClick = (mealType: number) => {
    this.openChooseMealForDate(mealType);
  }

  handleEmptyRecipeItemClick = (mealType:number) => {
    this.openChooseMealForDate(mealType);
  }

  openChooseMealForDate = (mealType: number) => {
    const { history } = this.props
    const { mondayDate } = this.state;
    const dayDate = mondayDate.clone().add(
      this.state.selectedDayOfWeek, 'days'
    ).format("YYYY-MM-DD");

    history.push(`/recipe/browse?date=${dayDate}`)
  }

  render() {
    const { weekmeals, mondayDate } = this.state;

    if (!mondayDate) {
      return null;
    }

    if (this.state.isLoggedOut) {
      return <Redirect to={"/logout"} />;
    }

    if (!this.props.user.access_token) {
      return <Redirect to={"/login"} />;
    }

    const week = mondayDate.isoWeek()
    const dayDate = mondayDate.clone().add(
      this.state.selectedDayOfWeek, 'days'
    ).format("YYYY-MM-DD");

    const matchingDays = weekmeals.filter((day:any) => day[0] === dayDate);
    const day = matchingDays.length > 0 ? matchingDays[0] : [];
    const daymeals = day[1];

    return (
      <div className="StartLoggedIn">
        <HeaderLoggedIn />
        <main className="StartLoggedIn__Main container">
          <div className="StartLoggedIn__Container columns">
            <div className="column is-two-fifths">
              {this.state.shoppingListError &&
                <Message
                  type="danger"
                  title="Error"
                  text={this.state.shoppingListError}
                  onClose={this.handleCloseErrorMessage}
                />
              }

              <div className="StartLoggedIn__ShoppingList">
                <nav className="level">
                  <div className="level-left">
                    <div className="level-item">
                      <h5 className="title is-5">Week {week}</h5>
                    </div>
                    <div className="level-item">
                      <span id="left" className="icon" onClick={e => this.handleWeekChange(e, -1)}>
                        <i className="fas fa-caret-left" />
                      </span>
                      <span id="right" className="icon" onClick={e => this.handleWeekChange(e, 1)}>
                        <i className="fas fa-caret-right" />
                      </span>
                    </div>
                  </div>
                </nav>

                <p className="StartLoggedIn__ShoppingListIntro">Based on your weekly schedule we can automatically create a shopping list for you, just hit the button below to get started</p>

                <button
                  className={`button ${this.state.isLoadingShoppingList ? "is-loading" : ""}`}
                  onClick={this.handleShoppingList}
                >Generate Shoppinglist</button>

                {this.state.shoppingList && this.state.shoppingList.length > 0 &&
                  <ShoppingList items={this.state.shoppingList} />
                }
              </div>
            </div>
            <div className="column">
              <TabNav
                items={[
                  {label: "Monday", value: 0},
                  {label: "Tuesday", value: 1},
                  {label: "Wednesday", value: 2},
                  {label: "Thursday", value: 3},
                  {label: "Friday", value: 4},
                  {label: "Saturday", value: 5},
                  {label: "Sunday", value: 6},
                ]}
                selected={this.state.selectedDayOfWeek}
                onChange={this.handleTabNavChange}
              />
              <DayMealList
                meals={daymeals}
                renderMissingMeal={(mealType: number) => {
                  return (
                    <RecipeItemEmpty
                      key={mealType}
                      mealType={mealType}
                      onClick={this.handleEmptyRecipeItemClick}
                    />
                  )
                }}
                renderMealItem={(meal: any, index: number) => {
                  return (
                    <RecipeItem
                      key={meal.id}
                      onClick={this.handleRecipeItemClick}
                      data={meal}
                    />
                  )
                }}
              />
            </div>
          </div>
        </main>
        <Footer copyrightText="Copyright 2019. Receptplaneraren" />
      </div>
    );
  }
}

export default connect(
  mapState,
)(StartLoggedIn);
