import React from 'react'

interface MessageProps {
  title: string,
  text: string,
  type: string,
  onClose: Function,
}

const Message = (props: MessageProps) => {
  const handleClickClose = () => {
    props.onClose();
  }
  return (
    <article className={`message is-${props.type}`}>
      <div className="message-header">
        <p>{props.title}</p>
        <button
          className="delete"
          aria-label="delete"
          onClick={handleClickClose}
        ></button>
      </div>
      <div className="message-body">{props.text}</div>
    </article>
  )
}

export default Message;
