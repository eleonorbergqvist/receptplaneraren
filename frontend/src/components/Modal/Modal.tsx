import React from "react";
import "./Modal.css";

export interface ModalProps {
  text: string;
  onClose: Function;
}

class Modal extends React.Component<ModalProps> {
  handleClick = (event: any) => {
    this.props.onClose();
  };

  render() {
    return (
      <div className={`is-active modal`}>
        <div className="modal-background" />
        <div className="modal-content">
          <section className="Modal__CardBody modal-card-body">
            <h1>{this.props.text}</h1>
            <a
              className="Modal__Button button"
              onClick={this.handleClick}
            >
              Ok
            </a>
          </section>
        </div>
      </div>
    );
  }
}

export default Modal;
