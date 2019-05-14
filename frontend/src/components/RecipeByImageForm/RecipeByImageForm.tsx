import React, { Component } from "react";
import ReactCrop from 'react-image-crop';
import loadImage from 'blueimp-load-image';
import { getCroppedImg } from '../../utils/image';
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

interface ImageDataType {
  title: string
  instructions: string
  ingredients: string
  image: string
}

interface RecipeByImageFormState {
  originalImageData: string,

  currentCrop: number,

  crops: CropsType,
  imageData: ImageDataType,
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

    imageData: {
      title: '',
      ingredients: '',
      instructions: '',
      image: '',
    },
  }

  imageRef: any;

  handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const file = e.target.files[0];

    // @ts-ignore
    loadImage(
      file,
      (canvas: any) => {
        const dataURL = canvas.toDataURL("image/jpeg", 1.0);

        this.setState({
          originalImageData: dataURL,
          currentCrop: 0,
        });
      },
      { maxWidth: 1400, orientation: true }
    );
  }

  handleImageLoaded = (image: HTMLImageElement) => {
    this.imageRef = image;
  };

  handleCropComplete = (name: string) => {
    return (crop: ReactCrop.Crop) => {
      this.setState({
        imageData: {
          ...this.state.imageData,
          [name]: this.getImageDataFromCrop(crop),
        }
      })
    }
  }

  getImageDataFromCrop = (crop: any) => {
    const croppedImageData = getCroppedImg(
      this.imageRef, crop, 0.5
    );
    return croppedImageData
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
    return Boolean(
      this.state.imageData.title &&
      this.state.imageData.instructions &&
      this.state.imageData.ingredients &&
      this.state.imageData.image
    )
  }

  handleSubmit = async (values: any) => {
    this.props.onSubmit({
      titleImageData: this.state.imageData.title,
      instructionsImageData: this.state.imageData.instructions,
      ingredientsImageData: this.state.imageData.ingredients,
      imageData: this.state.imageData.image,
    });
  };

  handleCropTabNavChange = (item: any) => {
    this.setState( { currentCrop: item.value });
  }

  handleCropNextClick = () => {
    window.scrollTo(0, 0);

    this.setState( { currentCrop: this.state.currentCrop+1 });
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
                  A image in jpg format
                </span>
              </label>
            </div>
          </div>
        }

        {this.state.originalImageData &&
          <div>
            <div className="is-widescreen">
              {this.state.originalImageData && this.state.currentCrop === 0 &&
                <>
                  <h3 className="title is-3">Step 2: Select title</h3>
                  <p>Use your mouse to draw a rectangle around the title area of your recipe</p>
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.crops.title}
                    onChange={this.handleCropChange('title')}
                    onComplete={this.handleCropComplete('title')}
                    onImageLoaded={this.handleImageLoaded}
                  />
                  {this.state.imageData.title && (
                    <div className="RecipeByImageForm__StickyNav">
                      <button
                        className="RecipeByImageForm__StickyNavButton button is-primary is-inverted is-outlined"
                        onClick={this.handleCropNextClick}>Continue to instructions</button>
                    </div>
                  )}
                </>
              }
              {this.state.originalImageData && this.state.currentCrop === 1 &&
                <>
                  <h3 className="title is-3">Step 3: Select instructions</h3>
                  <p>Use your mouse to draw a rectangle around the instructions of your recipe</p>
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.crops.instructions}
                    onChange={this.handleCropChange('instructions')}
                    onComplete={this.handleCropComplete('instructions')}
                    onImageLoaded={this.handleImageLoaded}
                  />

                  {this.state.imageData.instructions && (
                    <div className="RecipeByImageForm__StickyNav">
                      <button
                        className="RecipeByImageForm__StickyNavButton button is-primary is-inverted is-outlined"
                        onClick={this.handleCropNextClick}>Continue to ingredients</button>
                    </div>
                  )}
                </>
              }
              {this.state.originalImageData && this.state.currentCrop === 2 &&
                <>
                  <h3 className="title is-3">Step 4: Select ingredients</h3>
                  <p>Use your mouse to draw a rectangle around the ingredients of your recipe</p>
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.crops.ingredients}
                    onChange={this.handleCropChange('ingredients')}
                    onComplete={this.handleCropComplete('ingredients')}
                    onImageLoaded={this.handleImageLoaded}
                  />
                  {this.state.imageData.ingredients && (
                    <div className="RecipeByImageForm__StickyNav">
                      <button
                        className="RecipeByImageForm__StickyNavButton button is-primary is-inverted is-outlined"
                        onClick={this.handleCropNextClick}>Continue to image</button>
                    </div>
                  )}
                </>
              }
              {this.state.originalImageData && this.state.currentCrop === 3 &&
                <>
                  <h3 className="title is-3">Step 5: Select image</h3>
                  <p>Use your mouse to draw a rectangle around the image of your recipe</p>
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.crops.image}
                    onChange={this.handleCropChange('image')}
                    onComplete={this.handleCropComplete('image')}
                    onImageLoaded={this.handleImageLoaded}
                  />
                  <button
                    className="button" onClick={this.handleSubmit}
                  >I dont have a recipe image</button>

                  {this.state.imageData.image && (
                    <div className="RecipeByImageForm__StickyNav">
                      <button
                        className="RecipeByImageForm__StickyNavButton button is-primary is-inverted is-outlined"
                        onClick={this.handleSubmit}>Create recipe</button>
                    </div>
                  )}
                </>
              }
            </div>

            {this.state.imageData.title && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.imageData.title} />
            )}
            {this.state.imageData.instructions && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.imageData.instructions} />
            )}
            {this.state.imageData.ingredients && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.imageData.ingredients} />
            )}
            {this.state.imageData.image && (
              <img alt="Crop" style={{ maxWidth: "100%" }} src={this.state.imageData.image} />
            )}
          </div>
        }
      </div>
    );
  }
}



export default RecipeByImageForm;
