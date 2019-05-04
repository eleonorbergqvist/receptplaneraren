import React, { Component, FormEvent } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { iRootState } from "../../store";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import { TabNav, RecipeItem, EmptyRecipeItem } from "../../components/Tabs/Tabs";
import Api from "../../services/Api";
import * as moment from 'moment';
import { ApiResponse } from "apisauce";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps;

interface StartLoggedInState {
  week: number | null,
  mondayDate: string,
  weekmeals: any,
  selectedTab: any,
  isLoggedOut: boolean,
  shoppingList: any,
}

// interface iDay {
//   day: {breakfast: iRecipe, lunch: iRecipe, dinner: iRecipe}
// }

class StartLoggedIn extends Component<Props> {
  // TODO: Rename to WeeklyPlan?
  state: StartLoggedInState = {
    week: null,
    mondayDate: '',
    weekmeals: [],
    selectedTab: 0,
    isLoggedOut: false,
    shoppingList: [],
  }

 componentDidMount () {
    const week = moment.default().isoWeek();
    const monday = moment.default().startOf('isoWeek').format('YYYY-MM-DD');

    this.setState({
      week: week,
      mondayDate: monday,
    }, () => this.getDayMealsData(this.state.mondayDate));
  }

  handleWeekChange = async (e: React.FormEvent, direction:number) => {
    e.preventDefault();
    let newMondayDate = moment.default(this.state.mondayDate, 'YYYY-MM-DD');;

    if (direction === 1) {
      newMondayDate.add(7, 'days');
    }

    if (direction === -1) {
      newMondayDate.subtract(7, 'days');
    }

    this.setState({
      mondayDate: newMondayDate.format('YYYY-MM-DD'),
      week: newMondayDate.isoWeek()
    }, () => this.getDayMealsData(this.state.mondayDate));

    // TODO: använda debounce vid många click

  }

  getDayMealsData = async (monday: string) => {
    const api = Api.create();
    const response: ApiResponse<any> = await api.daymealsByDate(this.props.user.access_token, monday);

    if (response.status === 401) {
      this.setState({
        isLoggedOut: true,
      })
      return;
    }

    if (!response.ok) {
      throw Error("DAYMEAL ERROR");
    }

    this.setState({
      weekmeals: response.data.daymeals,
    })
  }

  handleTabNavChange = (item:any) => {
    console.log(item);

    this.setState( {
      selectedTab: item.value,
    });
  }

  handleShoppingList = async (e: FormEvent) => {
    e.preventDefault();
    const monday = this.state.mondayDate;
    const api = Api.create();
    const response: ApiResponse<any> = await api.shoppingList(this.props.user.access_token, monday);

    if (response.status === 401) {
      this.setState({
        isLoggedOut: true,
      })
      return;
    }

    if (!response.ok) {
      throw Error("SHOPPINGLIST ERROR");
    }

    console.log(response.data.shoppinglist);
    this.setState({
      shoppingList: response.data.shoppinglist
    })
  }

  render() {
    const { weekmeals } = this.state

    if (this.state.isLoggedOut) {
      return <Redirect to={"/logout"} />;
    }

    if (!this.props.user.access_token) {
      return <Redirect to={"/login"} />;
    }

    // console.log(weekmeals);

    // if (!weekmeals.length) {
    //   return null;
    // }

    let day = weekmeals[this.state.selectedTab] || [];
    let daymeals = day[1];

    return (
      <React.Fragment>
        <HeaderLoggedIn />
        <main className="container">
          <div className="start__Container columns">
            <div className="column is-two-fifths">
              <h1>Vecka {this.state.week}</h1>
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
              <button className="button" onClick={this.handleShoppingList}>Generate Shoppinglist</button>
              <br />
              {this.state.shoppingList.map((ingredient: any, index: number) => {
                console.log('test');
                return <li key={index}>{ingredient.amount}{ingredient.measurement}{ingredient.ingredient.name}</li>
              })}
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
                selected={this.state.selectedTab}
                onChange={this.handleTabNavChange}
              />
              <DayMealList
                meals={daymeals}
                renderMissingMeal={(mealType:number) => {
                  return <EmptyRecipeItem key={mealType} mealType={mealType} />
                }}
                renderMealItem={(meal:any, index:number) => {
                  return <RecipeItem key={meal.id} data={meal} />
                }}
              />
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
