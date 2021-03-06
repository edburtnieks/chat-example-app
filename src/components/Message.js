import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ message, onClick }) => (
  <button
    type="button"
    onClick={() => onClick(message)}
    className="chat__message"
  >
    <div className="chat__message-inner">
      <p className="chat__message-username">{message.user_id}</p>
      <p className="chat__message-text">{message.text}</p>
      <p className="chat__message-type">{message.type}</p>
    </div>
  </button>
);

Message.propTypes = {
  message: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user_id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired
};

export default Message;
