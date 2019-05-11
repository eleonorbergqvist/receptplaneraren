import React, { Component } from "react";
import ReactCrop from 'react-image-crop';
import loadImage from 'blueimp-load-image';
import { getCroppedImg } from '../../utils/image';
import TabNav from "../../components/TabNav/TabNav";
import 'react-image-crop/dist/ReactCrop.css';
import "./RecipeByImageForm.css";

interface Props {
  onSubmit: Function,
}

interface CropsType {
  title: object
  instructions: object
  ingredients: object
  image: object
}

interface RecipeByImageFormState {
  originalImageData: string,

  currentCrop: number,

  crops: CropsType,

  croppedTitleImageData: any,
  croppedInstructionsImageData: any,
  croppedIngredientsImageData: any,
  croppedImageImageData: any,
}

class RecipeByImageForm extends Component<Props, RecipeByImageFormState> {
  state: RecipeByImageFormState = {
    originalImageData: '',

    currentCrop: -1,

    crops: {
      title: {},
      ingredients: {},
      instructions: {},
      image: {},
    },

    croppedTitleImageData: '',
    croppedInstructionsImageData: '',
    croppedIngredientsImageData: '',
    croppedImageImageData: '',
  }

  imageRef: any;

  handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.files)

    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    // @ts-ignore
    loadImage(
      file,
      (canvas: any) => {
        console.log(canvas);

        const dataURL = canvas.toDataURL("image/jpeg");

        this.setState({
          originalImageData: dataURL,
          currentCrop: 0,
        });
      },
      { maxWidth: 1400, orientation: true, contain: true }
    );
  }

  handleImageLoaded = (image: HTMLImageElement) => {
    this.imageRef = image;
  };

  handleTitleCropComplete = (crop: any) => {
    const imageData = this.getImageDataFromCrop(crop);
    this.setState({ croppedTitleImageData: imageData });
  };

  handleInstructionsCropComplete = (crop: any) => {
    const imageData = this.getImageDataFromCrop(crop);
    this.setState({ croppedInstructionsImageData: imageData });
  };

  handleIngredientsCropComplete = (crop: any) => {
    const imageData = this.getImageDataFromCrop(crop);
    this.setState({ croppedIngredientsImageData: imageData });
  };

  handleImageCropComplete = (crop: any) => {
    const imageData = this.getImageDataFromCrop(crop);
    this.setState({ croppedImageImageData: imageData });
  };

  getImageDataFromCrop = (crop: any) => {
    const croppedTitleImageData = getCroppedImg(
      this.imageRef, crop, "newFile.jpeg"
    );
    return croppedTitleImageData
  }

  handleCropChange = (name: string) => {
    return (crop: ReactCrop.Crop) => {
      const crops = {
        ...this.state.crops,
        [name]: crop
      }
      this.setState({ crops });
    }
  }

  hasCompletedCrop = (): boolean => {
    return (
      this.state.croppedTitleImageData &&
      this.state.croppedInstructionsImageData &&
      this.state.croppedIngredientsImageData &&
      this.state.croppedImageImageData
    )
  }

  handleSubmit = async (values: any) => {
    this.props.onSubmit({
      titleImageData: this.state.croppedTitleImageData,
      instructionsImageData: this.state.croppedInstructionsImageData,
      ingredientsImageData: this.state.croppedIngredientsImageData,
      imageData: this.state.croppedImageImageData,
    });
  };

  handleCropTabNavChange = (item: any) => {
    this.setState( { currentCrop: item.value });
  }

  render() {
    return (
      <div className="RecipeByImageForm">
        {!this.state.originalImageData &&
          <div>
            <h3 className="title is-3">Step 1: Take a photo of your recipe</h3>
            <div className="file has-name field">
              <label className="file-label">
                <input
                  onChange={this.handleSelectFile}
                  className="file-input"
                  type="file"
                  name="resume"
                />
                <span className="file-cta">
                  <span className="file-icon">
                    <i className="fas fa-upload"></i>
                  </span>
                  <span className="file-label">
                    Choose a file…
                  </span>
                </span>
                <span className="file-name">
                  Screen Shot 2017-07-29 at 15.54.25.png
                </span>
              </label>
            </div>
          </div>
        }

        {this.state.originalImageData &&
          <div>
            <h3 className="title is-3">Step 2: Select the various portions of your recipe</h3>
            <p>Select the fields that contain title, ingredients, instructions and image.</p>
            <TabNav
              items={[
                {label: "Title", value: 0},
                {label: "Instructions", value: 1},
                {label: "Ingredients", value: 2},
                {label: "Image", value: 3},
              ]}
              selected={this.state.currentCrop}
              onChange={this.handleCropTabNavChange}
            />

            <div className="is-widescreen">
              {this.state.originalImageData && this.state.currentCrop === 0 &&
                <ReactCrop
                  src={this.state.originalImageData}
                  crop={this.state.crops.title}
                  onChange={this.handleCropChange('title')}
                  onComplete={this.handleTitleCropComplete}
                  onImageLoaded={this.handleImageLoaded}
                />
              }
              {this.state.originalImageData && this.state.currentCrop === 1 &&
                <ReactCrop
                  src={this.state.originalImageData}
                  crop={this.state.crops.instructions}
                  onChange={this.handleCropChange('instructions')}
                  onComplete={this.handleInstructionsCropComplete}
                  onImageLoaded={this.handleImageLoaded}
                />
              }
              {this.state.originalImageData && this.state.currentCrop === 2 &&
                <ReactCrop
                  src={this.state.originalImageData}
                  crop={this.state.crops.ingredients}
                  onChange={this.handleCropChange('ingredients')}
                  onComplete={this.handleIngredientsCropComplete}
                  onImageLoaded={this.handleImageLoaded}
                />
              }
              {this.state.originalImageData && this.state.currentCrop === 3 &&
                <ReactCrop
                  src={this.state.originalImageData}
                  crop={this.state.crops.image}
                  onChange={this.handleCropChange('image')}
                  onComplete={this.handleImageCropComplete}
                  onImageLoaded={this.handleImageLoaded}
                />
              }
            </div>

            {this.hasCompletedCrop() &&
              <button
                className="button"
                onClick={this.handleSubmit}>Submit/Preview</button>
            }
            <p>Help text.</p>

            {this.state.croppedTitleImageData && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedTitleImageData} />
            )}
            {this.state.croppedInstructionsImageData && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedInstructionsImageData} />
            )}
            {this.state.croppedIngredientsImageData && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedIngredientsImageData} />
            )}
            {this.state.croppedImageImageData && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.croppedImageImageData} />
            )}

            {console.log(this.state.originalImageData)}
          </div>
        }
      </div>
    );
  }
}



export default RecipeByImageForm;
