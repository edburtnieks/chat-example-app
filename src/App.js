import React, { useState, useEffect } from 'react';
import {
  fetchRooms,
  fetchMessages,
  addMessage,
  fetchTrackSpotify,
  fetchAlbumSpotify,
  fetchPlaylistSpotify
} from './api/index';
import MessageList from './components/MessageList';
import AddMessageForm from './components/AddMessageForm';
import RoomList from './components/RoomList';
import MessageContent from './components/MessageContent';

const App = () => {
  const [currentUser, setCurrentUser] = useState('');
  const [rooms, setRooms] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState({
    text: '',
    url: '',
    type: 'album'
  });
  const [messageContent, setMessageContent] = useState(null);

  useEffect(() => {
    setCurrentUser('Ed');

    const setFetchedRooms = async () => {
      setRooms(await fetchRooms());
    };

    setFetchedRooms();
  }, []);

  const handleRoomClick = async roomId => {
    setActiveRoom(roomId);
    setMessages(await fetchMessages(roomId));
  };

  const handleAddMessage = async e => {
    e.preventDefault();

    const id = await addMessage(currentUser, activeRoom, message);
    const newMessage = {
      id,
      user_id: currentUser,
      text: message.text,
      url: message.url,
      type: message.type
    };

    setMessages([...messages, newMessage]);
    setMessage({
      text: '',
      url: '',
      type: ''
    });
  };

  const handleMessageChange = e => setMessage({
    ...message,
    text: e.target.value
  });

  const handeMessageClick = async content => {
    const urlParts = content.text.split('/');
    const id = urlParts[urlParts.length - 1];
    let data;

    switch (content.type) {
      case 'track':
        data = await fetchTrackSpotify(id);
        break;
      case 'album':
        data = await fetchAlbumSpotify(id);
        break;
      case 'playlist':
        data = await fetchPlaylistSpotify(id);
        break;
      default:
    }

    setMessageContent(data);
  };

  return (
    <React.Fragment>
      <section className="app__message-content">
        <MessageContent content={messageContent} />
      </section>

      <section className="app__chat">
        <MessageList
          onMessageClick={handeMessageClick}
          messages={messages}
        />
        <AddMessageForm
          onSubmit={handleAddMessage}
          onChange={handleMessageChange}
          value={message.text}
        />
        <RoomList
          rooms={rooms}
          activeRoom={activeRoom}
          onRoomClick={handleRoomClick}
        />
      </section>
    </React.Fragment>
  );
};

export default App;
