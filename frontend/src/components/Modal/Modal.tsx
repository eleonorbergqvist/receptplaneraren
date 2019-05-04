import React from "react";

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
          <section className="modal-card-body">
            <h1>{this.props.text}</h1>
            <button
              className="button is-success is-large"
              onClick={this.handleClick}
            >
              Ok
            </button>
          </section>
        </div>
      </div>
    );
  }
}

export default Modal;
