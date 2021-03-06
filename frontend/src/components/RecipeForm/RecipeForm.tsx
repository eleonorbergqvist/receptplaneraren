import React, { Component, FormEvent } from "react";
import {
  Formik,
  FormikActions,
  FormikProps,
  Form,
  Field,
} from "formik";
import * as Yup from "yup";
import Input from "../Input/Input";
import { emptyIngredient } from '../InputList/InputList';
import InputList from '../InputList/InputList';
import "./RecipeForm.css";

export interface RecipeFormProps {
  onSubmit: Function,
  title?: string,
  instructions?: string,
  ingredients?: iIngredient[],
  image?: string,
}

export interface RecipeFormState {
  title: string;
  image: string;
  instructions: string;
  ingredients: iIngredient[];
}

interface iFormValues {
  title: string;
  image: string;
  instructions: string;
  ingredients: iIngredient[];
}

export interface iIngredient {
  amount: number;
  measurement: string;
  ingredient: string;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .required("Title is required!"),
  //image: Yup.string()
  //  .required("Image is not? required!"),
  instructions: Yup.string()
    .required("Instructions is required!"),
  ingredients: Yup.array()
    .required("Ingredients are required!"),
});

interface InputListProps {
  items: iIngredient[],
  onChange: any,
}

class RecipeForm extends Component<RecipeFormProps, RecipeFormState> {
  constructor(props: RecipeFormProps) {
    super(props);

    this.state = {
      title: this.props.title || "",
      image: this.props.image || "https://bulma.io/images/placeholders/128x128.png",
      instructions: this.props.instructions || "",
      ingredients: this.props.ingredients || [emptyIngredient],
    }
  }

  handleAddItem = (e: FormEvent) => {
    e.preventDefault();

    let { ingredients } = this.state

    ingredients = [
      ...ingredients,
      {
        amount: 0,
        measurement: "",
        ingredient: "",
      },
    ];

    this.setState({ ingredients });
  }

  handleIngredientChange = (ingredients: []) => {
    this.setState({ ingredients })
  }

  handleInputFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

    const fileList = e.target.files || [];

    if (fileList.length > 0) {
      let file: File = fileList[0];
      const reader = new FileReader();
      reader.onload = (e: Event) => {
        if (typeof reader.result === 'string') {
          this.setState({ image: reader.result })
        }
      }
      reader.readAsDataURL(file);
    }

  }

  render() {
    const onSubmit = this.props.onSubmit;
    let initialValues = {
      title: this.state.title,
      image: this.state.image,
      instructions: this.state.instructions,
      ingredients: this.state.ingredients,
    };

    return (
      <div className="RecipeForm">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={(
            values: iFormValues,
            actions: FormikActions<iFormValues>
          ) => {
            console.log("onSubmit!");
            onSubmit(
              {
                title: values.title,
                image: this.state.image,
                instructions: values.instructions,
                ingredients: values.ingredients,
              },
              actions
            );
          }}
          render={(formikBag: FormikProps<iFormValues>) => (
            <Form>
              {/* {formikBag.errors.general && <p>{formikBag.errors.general}</p>} */}
              <div className="columns">
                <div className="column">
                <figure className="RecipeForm__Image--Preview image is-5by4">
                  <img id="imagePreview" src={this.state.image} alt="Preview" />
                </figure>

                {/* <div className="column"> */}
                  <div className="file is-fullwidth">
                    <label className="file-label">
                      <input className="RecipeForm__FileInput file-input" type="file" name="resume"
                        onChange={this.handleInputFileChange}
                        accept='image/*'
                      />
                      <span className="RecipeForm__FileInputSpan file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                          Choose an image…
                        </span>
                      </span>
                    </label>
                  </div>
                {/* </div> */}
                {formikBag.errors.image
                  && <p className="help is-danger">{formikBag.errors.image}</p>
                }
                </div>
              </div>


              <label>Title</label>
              <Input
                name="title"
                icon=""
                className=""
                type="text"
                placeholder="Title"
                value={formikBag.values.title}
                onChange={formikBag.handleChange}
                onBlur={formikBag.handleBlur}
                error={
                  formikBag.touched.title ? formikBag.errors.title || "" : ""
                }
              />

              <label>Ingredients</label>
              <InputList
                items={formikBag.values.ingredients}
                onChange={(ingredients: []) => formikBag.setFieldValue("ingredients", ingredients)}
              />
              {formikBag.errors.ingredients
                && <p className="help is-danger">{formikBag.errors.ingredients}</p>
              }

              <div className="control">
                <label>Instructions</label>
                <Field
                  component="textarea"
                  className="textarea"
                  name="instructions"
                  value={formikBag.values.instructions}
                  onChange={formikBag.handleChange}
                  onBlur={formikBag.handleBlur}
                  error={
                    formikBag.touched.instructions ? formikBag.errors.instructions || "" : ""
                  }
                  placeholder="Instructions">
                </Field>
                {formikBag.errors.instructions
                  && <p className="help is-danger">{formikBag.errors.instructions}</p>
                }
              </div>

              <div className="field">
                <p className="control">
                  <button
                    className={`RecipeForm__Button--Create button is-dark ${formikBag.isSubmitting ? "is-loading": ""}`}
                    type="submit"
                    // disabled={!formikBag.isValid}
                  >
                    Create
                  </button>
                </p>
              </div>
            </Form>
          )}
        />
      </div>
    );
  }
}

export default RecipeForm;
