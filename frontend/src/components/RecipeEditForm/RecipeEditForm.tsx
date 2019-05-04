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
import IngredientsInput from "../IngredientsInput/IngredientsInput";
import "./RecipeEditForm.css";

export interface RecipeEditFormProps {
  onSubmit: any,
  recipe: iFormValues,
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
const BASE_URL: string = 'http://localhost:8000/storage/';
const emptyIngredient: iIngredient = {
  amount: 0,
  measurement: "",
  ingredient: "",
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

class RecipeEditForm extends Component<RecipeEditFormProps, RecipeFormState> {

  constructor(props: RecipeEditFormProps) {
    super(props);

    console.log(props.recipe);

    this.state = {
      title: props.recipe.title,
      image: BASE_URL+props.recipe.image || "https://bulma.io/images/placeholders/128x128.png",
      instructions: props.recipe.instructions,
      ingredients: [emptyIngredient],
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
      image: this.props.recipe.image || "",
      instructions: this.props.recipe.instructions || "",
      ingredients: this.props.recipe.ingredients || [emptyIngredient],
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
                <figure className="image is-128x128">
                  <img id="imagePreview" src={this.state.image} alt="" />
                </figure>
                </div>
                <div className="column">
                  <div className="file is-boxed">
                    <label className="file-label">
                      <input className="file-input" type="file" name="resume"
                        onChange={this.handleInputFileChange}
                        accept='image/*'
                      />
                      <span className="file-cta">
                        <span className="file-icon">
                          <i className="fas fa-upload"></i>
                        </span>
                        <span className="file-label">
                          Choose an image…
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                {formikBag.errors.image
                  && <p className="help is-danger">{formikBag.errors.image}</p>
                }
              </div>


              <label>Title</label>
              <Input
                name="title"
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
                    className="button"
                    type="submit"
                    // disabled={!formikBag.isValid}
                  >
                    Create
                  </button>
                </p>
              </div>
              <button className="button" disabled>Preview</button>
            </Form>
          )}
        />
      </div>
    );
  }
}

// TODO: Move to new file
// TODO: Add render prop
const InputList = (props: InputListProps) => {
  const handleChange = (index: number, item: any) => {
    const items = [
      ...props.items.slice(0, index),
      item,
      ...props.items.slice(index+1),
    ];

    props.onChange(items);
  }

  const handleAddItem = (e: FormEvent) => {
    e.preventDefault();

    props.onChange([
      ...props.items,
      emptyIngredient,
    ]);
  }

  return (
    <div>
      <div>
        {props.items.map((x, index) =>
        <IngredientsInput {...x} key={index} index={index} onChange={handleChange}/>)}
      </div>

      <div className="field">
        <p className="control">
          <button
            className="button" onClick={handleAddItem}
          >
            Add row +
          </button>
        </p>
      </div>
    </div>
  )
}

export default RecipeEditForm;
