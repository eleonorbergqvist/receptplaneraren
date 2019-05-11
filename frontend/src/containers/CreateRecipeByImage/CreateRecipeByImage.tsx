import React, { Component, FormEvent } from "react";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { iRootState, Dispatch } from "../../store";
import ReactCrop from 'react-image-crop';
import loadImage from 'blueimp-load-image';
import 'react-image-crop/dist/ReactCrop.css';
import { iApi } from "../../services/Api";
import { HeaderLoggedIn } from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import "./CreateRecipeByImage.css";

const getDataAndMimeFromDataURL = (dataUrl: string):string[] => {
  const re = /data:(\w*\/\w*);base64,(.*)/g;
  const resizedResult: string[] | null = re.exec(dataUrl);
  if (!resizedResult) {
    return []
  }
  const data = resizedResult[2];
  const mimeType = resizedResult[1];

  return [data, mimeType];
};

const mapState = (state: iRootState) => ({
  user: state.user,
  isLoggedIn: state.user.access_token !== null
});

const mapDispatch = (dispatch: Dispatch) => ({

});

type connectedProps = ReturnType<typeof mapState> &
  ReturnType<typeof mapDispatch>;
type Props = connectedProps & { api: iApi }

interface CreateRecipeByImageState {
  originalImageData: string,

  currentCrop: number,

  titleCrop: any,
  ingredientsCrop: any,
  instructionsCrop: any,
  imageCrop: any,

  croppedTitleImageData: any,
  croppedInstructionsImageData: any,
  croppedIngredientsImageData: any,
  croppedImageImageData: any,

  dataToBePassedToRecipe: any,
  redirectToEditRecipe: boolean,
}

class CreateRecipeByImage extends Component<Props, CreateRecipeByImageState> {
  state: CreateRecipeByImageState = {
    originalImageData: '',

    currentCrop: -1,

    titleCrop: {},
    ingredientsCrop: {},
    instructionsCrop: {},
    imageCrop: {},

    croppedTitleImageData: '',
    croppedInstructionsImageData: '',
    croppedIngredientsImageData: '',
    croppedImageImageData: '',

    dataToBePassedToRecipe: {},
    redirectToEditRecipe: false,
  }

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
        const dataURL = canvas.toDataURL("image/jpeg");
        const [data] = getDataAndMimeFromDataURL(dataURL);

        this.setState({
          originalImageData: dataURL,
          currentCrop: 0,
        });
      },
      { maxWidth: 1400, orientation: true, contain: true }
    );
  }

  imageRef: any;

  handleImageLoaded = (image: HTMLImageElement) => {
    this.imageRef = image;
  };

  handleTitleCropComplete = (crop: any) => {
    this.makeClientTitleCrop(crop);
  };

  handleInstructionsCropComplete = (crop: any) => {
    this.makeClientInstructionsCrop(crop);
  };

  handleIngredientsCropComplete = (crop: any) => {
    this.makeClientIngredientsCrop(crop);
  };

  handleImageCropComplete = (crop: any) => {
    this.makeClientImageCrop(crop);
  };

  async makeClientTitleCrop(crop: any) {
    console.log(this.imageRef);
    console.log(crop);
    if (this.imageRef && crop.width && crop.height) {
      const croppedTitleImageData = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedTitleImageData }, () => {console.log(this.state.croppedTitleImageData)});
    }
  }
  async makeClientInstructionsCrop(crop: any) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedInstructionsImageData = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedInstructionsImageData });
    }
  }
  async makeClientIngredientsCrop(crop: any) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedIngredientsImageData = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedIngredientsImageData });
    }
  }
  async makeClientImageCrop(crop: any) {
    if (this.imageRef && crop.width && crop.height) {
      const croppedImageImageData = await this.getCroppedImg(
        this.imageRef,
        crop,
        "newFile.jpeg"
      );
      this.setState({ croppedImageImageData });
    }
  }

  getCroppedImg(image: any, crop: any, fileName: string) {
    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext("2d");

    ctx!.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    const base64Image = canvas.toDataURL('image/jpeg');
    return base64Image;
  }

  handleTitleClick = (e: FormEvent) => {
    e.preventDefault();
    this.setState({
      currentCrop: 0,
     });
  }
  handleIngredientsClick = (e: FormEvent) => {
    e.preventDefault();
    this.setState({
      currentCrop: 1,
     });
  }
  handleImageClick = (e: FormEvent) => {
    e.preventDefault();
    this.setState({
      currentCrop: 2,
     });
  }
  handleInstructionsClick = (e: FormEvent) => {
    e.preventDefault();
    this.setState({
      currentCrop: 3,
     });
  }

  handleTitleCropChange = (titleCrop: ReactCrop.Crop) => {
    this.setState({ titleCrop });
  }
  handleImageCropChange = (imageCrop: ReactCrop.Crop) => {
    this.setState({ imageCrop });
  }
  handleInstructionsCropChange = (instructionsCrop: ReactCrop.Crop) => {
    this.setState({ instructionsCrop });
  }
  handleIngredientsCropChange = (ingredientsCrop: ReactCrop.Crop) => {
    this.setState({ ingredientsCrop });
  }

  handleSubmit = async (values: any) => {
    console.log('CreateRecipeByImage.handleSubmit');
    console.log(values);

    const promises = [
      this.props.api.scanRecipe(this.state.croppedTitleImageData),
      this.props.api.scanRecipe(this.state.croppedInstructionsImageData),
      this.props.api.scanRecipe(this.state.croppedIngredientsImageData),
    ]

    const results = await Promise.all(promises);

    console.log(results);
    const formattedResults = results.map((x: any) => x.data.data)
    console.log(formattedResults);
    const recipeData = {
      title: formattedResults[0].join(" "),
      instructions: formattedResults[1].join(" "),
      ingredients: formattedResults[2].join(" "),
    }

    this.setState({
      dataToBePassedToRecipe: {
        title: formattedResults[0].join(" "),
        instructions: formattedResults[1].join(" "),
        //ingredients: formattera ingredienser med
        ingredients: [{'amount': 1, 'measurement': 'kg', 'ingredient': 'Gurka'}, {'amount': 2, 'measurement': 'kg', 'ingredient': 'Banan'}],
        image: this.state.croppedImageImageData,
      },
      redirectToEditRecipe: true,
    });
  };

  // export interface iIngredient {
  //   amount: number;
  //   measurement: string;
  //   ingredient: string;
  // }

  render() {
    if (!this.props.isLoggedIn) {
      return <Redirect to={"/"} />;
    }

    if (this.state.redirectToEditRecipe) {
      return (
        <Redirect
          to={{
            pathname: '/recipe/create',
            state: this.state.dataToBePassedToRecipe,
          }}
        />
      )
    }

    return (
      <div className="CreateRecipe">
        <HeaderLoggedIn />
        <main className="container">
          <div className="CreateRecipe__Container columns">
            <div className="CreateRecipe__Container--Left column is-two-fifths">
              Create Recipe By Image
            </div>

            <div className="CreateRecipe__Container--Right column">
              <div className="file has-name is-right">
                <label className="file-label">
                  <input onChange={this.handleSelectFile} className="file-input" type="file" name="resume" />
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

              <label>Instructions</label>
              <p>Select the fields that contain title, ingredients, instructions and image.</p>
              <button onClick={this.handleTitleClick}>Title</button>
              <button onClick={this.handleIngredientsClick}>Ingredients</button>
              <button onClick={this.handleInstructionsClick}>Instructions</button>
              <button onClick={this.handleImageClick}>Image</button>

              <div>
                {this.state.originalImageData && this.state.currentCrop === 0 &&
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.titleCrop}
                    onChange={this.handleTitleCropChange}
                    onComplete={this.handleTitleCropComplete}
                    onImageLoaded={this.handleImageLoaded}
                  />
                }
                {this.state.originalImageData && this.state.currentCrop === 1 &&
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.instructionsCrop}
                    onChange={this.handleInstructionsCropChange}
                    onComplete={this.handleInstructionsCropComplete}
                    onImageLoaded={this.handleImageLoaded}
                  />
                }
                {this.state.originalImageData && this.state.currentCrop === 2 &&
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.ingredientsCrop}
                    onChange={this.handleIngredientsCropChange}
                    onComplete={this.handleIngredientsCropComplete}
                    onImageLoaded={this.handleImageLoaded}
                  />
                }
                {this.state.originalImageData && this.state.currentCrop === 3 &&
                  <ReactCrop
                    src={this.state.originalImageData}
                    crop={this.state.imageCrop}
                    onChange={this.handleImageCropChange}
                    onComplete={this.handleImageCropComplete}
                    onImageLoaded={this.handleImageLoaded}
                  />
                }
              </div>

              <p>Help text.</p>
              <button onClick={this.handleSubmit}>Submit/Preview</button>
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
          </div>
        </main>
        <Footer copyrightText="" />
      </div>
    );
  }
}

export default connect(
  mapState,
  mapDispatch
)(CreateRecipeByImage);
