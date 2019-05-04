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
  state = {
    weekList: [],
    dayList: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    currentWeek: moment.default().isoWeek(),
    currentDay: moment.default().isoWeekday(moment.default().isoWeekday()).format('dddd'),
    mealList: ['Breakfast', 'Lunch', 'Dinner'],
    currentMeal: 'Breakfast',
  }

  handleSubmit = async (values: any, actions: FormikActions<any>) => {
    console.log('AddDayMealModal.handleSubmit');
    console.log(values);
    const api = Api.create();

    actions.setSubmitting(true);

    // FIXME: fixa så isoweckor används... UTC???
    // const isoWeek = moment.default().isoWeek();
    const date = moment.default().day(values.day).week(values.week).format('YYYY-MM-DD HH:mm:ss');
    let meal_type;

    switch (values.meal) {
      case 'Breakfast':
        meal_type = 0;
        break;

      case 'Lunch':
        meal_type = 1;
        break;

      case 'Dinner':
        meal_type = 2;
        break;

      default:
        meal_type= 0;
        break;
    }
    const recipe_id = this.props.recipe.id;
    console.log(date);
    console.log(meal_type);
    console.log(recipe_id);

    const response: ApiResponse<any> = await api.daymealUpdate({
      date: date,
      meal_type: meal_type,
      recipe_id : recipe_id,
    }, this.props.user.access_token);


    actions.setSubmitting(false);

    if (!response.ok) {
      actions.setErrors({
        general: "Could not save day meal"
      });
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
          <section className="modal-card-body">


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
                  <h1>{this.props.text}</h1>
                  <Select name="week" options={this.state.weekList}
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
                    className="button is-info"
                    onClick={this.handleClick}
                  >
                    Close
                  </button>
                  <button
                    className="button is-success"
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
