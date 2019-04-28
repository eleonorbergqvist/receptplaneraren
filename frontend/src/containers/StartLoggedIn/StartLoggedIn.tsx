import React, { Component } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { iRootState } from "../../store";
import Header from "../../components/Header/Header";
import { Footer } from "../../components/Footer/Footer";
import Tabs, { TabNav, RecipeItem, dayMealToLabel } from "../../components/Tabs/Tabs";
import PrimaryMenuButton from "../../components/PrimaryMenuButton/PrimaryMenuButton";
import { iRecipe } from "../RecipeDetail/RecipeDetail";
import Api from "../../services/Api";
import { ApiResponse } from "apisauce";




const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps;

interface StartLoggedInState {
  week: string,
  weekmeals: any,
  selectedTab: any,
  isLoggedOut: boolean,
}

interface iDay {
  day: {breakfast: iRecipe, lunch: iRecipe, dinner: iRecipe}
}

class StartLoggedIn extends Component<Props> {
  // TODO: Rename to WeeklyPlan?
  state: StartLoggedInState = {
    week: '',
    weekmeals: [],
    selectedTab: 0,
    isLoggedOut: false,
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

  async componentDidMount () {
    // Get daymeal for current week
    // const url = window.location.pathname;
    // const slug = url.substr(url.lastIndexOf('/') + 1);
    // console.log(slug);
    const api = Api.create();

    const response: ApiResponse<any> = await api.daymealsGetCurrentWeek(this.props.user.access_token);

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
      week: response.data.week,
      weekmeals: response.data.daymeals,
    })
  }

  handleTabNavChange = (item:any) => {
    console.log(item);

    this.setState( {
      selectedTab: item.value,
    });
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
        <Header buttons={this.buttons} />
        <main className="container">
          <div className="start__Container columns">
            <div className="column is-two-fifths">
              <h1>Vecka {this.state.week}</h1>
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
                renderMissingMeal={(mealType:number) => <p key={mealType}>Pleasw add -> {dayMealToLabel(mealType)}</p>}
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