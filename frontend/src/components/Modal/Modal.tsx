import React from 'react';

export interface ModalProps { 
  text: string, 
};

export const Modal = (props: ModalProps) => (
  <div className="modal">
    <div className="modal-background"></div>
    <div className="modal-content">
      <section className="modal-card-body">
        <h1>{props.text}</h1>
        <button className="button is-success is-large">
          Ok
        </button>
      </section>
    </div>
  </div>
);