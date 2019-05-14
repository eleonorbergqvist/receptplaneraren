import React from "react";
import * as moment from 'moment';
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
} from "formik";
import * as Yup from "yup";
import Select from "../../components/Select/Select";
import { iRootState } from "../../store";
import { connect } from "react-redux";
import { ApiResponse } from "apisauce";
import Api from "../../services/Api";
import "./AddDayMealModal.css";

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

type connectedProps = ReturnType<typeof mapState>;
type Props = connectedProps & AddDayMealModalProps;

interface AddDayMealModalProps {
  text: string,
  onClose: Function,
  recipe: iRecipe,
  initialDate: string,
}

interface iRecipe {
  id: number,
}

interface AddDayMealModalState {
  weekList: number[],
  dayList: string[],
  currentWeek: number,
  currentDay: string,
  mealList: any[],
  currentMeal: string,
}

interface iFormValues {
  week: any,
  day: string,
  meal: string,
}

const validationSchema = Yup.object().shape({
  week: Yup.number()
    .required("Week is required!"),
  day: Yup.string()
    .required("Day is required!"),
  meal: Yup.string()
    .required("Meal type is required!"),
});

class AddDayMealModal extends React.Component<Props, AddDayMealModalState> {
  constructor(props: Props) {
    super(props);

    let currentWeek = moment.default().isoWeek()
    let currentDay = moment.default()
      .isoWeekday(
        moment.default().isoWeekday()
      ).format('dddd')

    if (this.props.initialDate) {
      currentWeek = moment.default(this.props.initialDate).isoWeek()
      currentDay = moment.default(this.props.initialDate)
        .isoWeekday(
          moment.default(this.props.initialDate).isoWeekday()
        ).format('dddd')
    }

    this.state = {
      weekList: [],
      dayList: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      currentWeek,
      currentDay,
      mealList: ['Breakfast', 'Lunch', 'Dinner'],
      currentMeal: 'Breakfast',
    }
  }

  handleSubmit = async (values: any, actions: FormikActions<any>) => {
    console.log('AddDayMealModal.handleSubmit');
    console.log(values);
    const api = Api.create();

    actions.setSubmitting(true);

    // FIXME: fixa så isoweckor används... UTC???
    // const isoWeek = moment.default().isoWeek();
    const date = moment.default().day(values.day)
      .week(values.week)
      .format('YYYY-MM-DD HH:mm:ss');
    let mealType;

    switch (values.meal) {
      case 'Breakfast':
        mealType = 0;
        break;

      case 'Lunch':
        mealType = 1;
        break;

      case 'Dinner':
        mealType = 2;
        break;

      default:
        mealType = 0;
        break;
    }
    const recipeId = this.props.recipe.id;
    console.log(date);
    console.log(mealType);
    console.log(recipeId);

    const response: ApiResponse<any> = await api.daymealUpdate({
      date: date,
      meal_type: mealType,
      recipe_id : recipeId,
    }, this.props.user.access_token);


    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({ general: "Could not save day meal" });
      return;
    }

    this.props.onClose();
  }

  handleClick = (event: any) => {
    const { onClose } = this.props
    onClose();
  };

  componentDidMount () {
    const weeksInYear: number = moment.default().isoWeeksInYear();
    let allWeeks: number[] = [];
    for (let i=1; i<=weeksInYear; i++) {
      allWeeks = [...allWeeks, i]
    }
    this.setState({ weekList: allWeeks });
  }

  // FIXME: remove touched validation
  render() {
    const onSubmit = this.handleSubmit;

    let initialValues = {
      week: this.state.currentWeek,
      day: this.state.currentDay,
      meal: this.state.currentMeal,
    };

    // TODO: lägg in error visning
    return (
      <div className={`is-active modal`}>
        <div className="modal-background" />
        <div className="modal-content">
          <section className="AddDayMealModal__CardBody modal-card-body">


            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(
                values: iFormValues,
                actions: FormikActions<iFormValues>
              ) => {
                onSubmit(
                  {
                    week: values.week,
                    day: values.day,
                    meal: values.meal,
                  },
                  actions
                );
              }}
              render={(formikBag: FormikProps<iFormValues>) => (
                <Form>
                  <h1 className="AddDayMealModal__CardTitle">{this.props.text}</h1>
                  <label className="help">Week</label>
                  <Select
                    name="week"
                    options={this.state.weekList.map(x => String(x))}
                    value={formikBag.values.week}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    // error={
                    //   formikBag.touched.week ? formikBag.errors.week || "" : ""
                    // }
                  />
                  {formikBag.errors.week
                    && <p className="help is-danger">{formikBag.errors.week}</p>
                  }

                  <label className="help">Day</label>
                  <Select
                    name="day"
                    options={this.state.dayList}
                    value={formikBag.values.day}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    // error={
                    //   formikBag.touched.day ? formikBag.errors.day || "" : ""
                    // }
                  />
                  {formikBag.errors.day
                    && <p className="help is-danger">{formikBag.errors.day}</p>
                  }
                  <label className="help">Meal</label>
                  <Select
                    name="meal"
                    options={this.state.mealList}
                    value={formikBag.values.meal}
                    onChange={formikBag.handleChange}
                    onBlur={formikBag.handleBlur}
                    // error={
                    //   formikBag.touched.meal ? formikBag.errors.meal || "" : ""
                    // }
                  />
                  {formikBag.errors.meal
                    && <p className="help is-danger">{formikBag.errors.meal}</p>
                  }

                  <button
                    className="AddDayMealModal__ButtonClose button is-dark is-outlined"
                    onClick={this.handleClick}
                  >
                    Close
                  </button>
                  <button
                    className="AddDayMealModal__ButtonAdd button"
                    type="submit"
                    // disabled={!formikBag.isValid}
                  >
                    Add
                  </button>
                </Form>
              )}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default connect(
  mapState,
  null
)(AddDayMealModal);
