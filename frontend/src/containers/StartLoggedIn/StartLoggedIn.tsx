import React, { Component, FormEvent } from "react";
import { Redirect } from "react-router";
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

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps & { api: iApi }

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

    let monday = mondayDate.format('YYYY-MM-DD');
    const response: ApiResponse<any> = await api.daymealsByDate(
      this.props.user.access_token,
      monday
    );

    if (response.status === 401) {
      this.setState({
        isLoggedOut: true,
      })
      return;
    }

    if (!response.ok) {
      return;
    }

    this.setState({
      weekmeals: response.data.daymeals,
    })
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
      <div className="start-logged-in">
        <HeaderLoggedIn />
        <main className="container">
          <div className="start__Container columns">
            <div className="column is-two-fifths">
              {this.state.shoppingListError &&
                <Message
                  type="danger"
                  title="Error"
                  text={this.state.shoppingListError}
                  onClose={this.handleCloseErrorMessage}
                />
              }

              <h1>Week {week}</h1>
              <span id="left" className="icon" onClick={e => this.handleWeekChange(e, -1)}>
                <i className="fas fa-caret-left" />
              </span>
              <span id="right" className="icon" onClick={e => this.handleWeekChange(e, 1)}>
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
              <button
                className={`button ${this.state.isLoadingShoppingList ? "is-loading" : ""}`}
                onClick={this.handleShoppingList}
              >Generate Shoppinglist</button>

              {this.state.shoppingList && this.state.shoppingList.length > 0 &&
                <ShoppingList items={this.state.shoppingList} />
              }
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
                  return <RecipeItemEmpty key={mealType} mealType={mealType} />
                }}
                renderMealItem={(meal: any, index: number) => {
                  return <RecipeItem key={meal.id} data={meal} />
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
  null
)(StartLoggedIn);

interface DayMealListProps {
  meals: any,
  renderMealItem: any,
  renderMissingMeal: any,
}

const DayMealList = (props: DayMealListProps) => {
  const meals = props.meals || [];

  const mealsByType = meals.reduce((acc:any, daymeal:any) => {
    let mealsByType = acc[daymeal.meal_type] || [];
    mealsByType = [...mealsByType, daymeal];
    acc[daymeal.meal_type]= mealsByType;
    return acc;
  }, new Array(3).fill(
    []
  ))

  return (
    <div className="daymeallist">
      {mealsByType.map((items:any, mealType:number) => {
        if (!items.length) return props.renderMissingMeal(mealType)
        return items.map((item:any) => props.renderMealItem(item))
      })};
    </div>
  )
}

interface ShoppingListProps {
  items: any,
}

const ShoppingList = (props: ShoppingListProps) => {
  return (
    <table className="table">
      <thead>
        <tr>
          <th><abbr title="Amount">Amount</abbr></th>
          <th>Measurement</th>
          <th><abbr title="Ingredient">Ingredient</abbr></th>
        </tr>
      </thead>
      <tfoot>
        {props.items.map((ingredient: any, index: number) => {
          return (
            <tr key={index}>
              <td>{ingredient.amount}</td>
              <td>{ingredient.measurement}</td>
              <td>{ingredient.ingredient.name}</td>
            </tr>
          )
        })}
      </tfoot>
    </table>
  )
}
