import { useState } from 'react';

const useRoomCodeValidation = () => {
  const [roomCode, setRoomCode] = useState('');
  const [error, setError] = useState('');


  const roomCodeChangeHandler = (text) => {
    setRoomCode(text);
    setError('');
  };

  const validateRoomCode = () => {
    const regex = /^H-\d+$/; // the code must be of the format H-521
    if (regex.test(roomCode)) {
      setError('');
      return true;
    } else {
      setError('Invalid room code. Please enter a code in the format H-345.');
      return false;
    }
  };

  return {
    roomCode,
    error,
    roomCodeChangeHandler,
    validateRoomCode,
  };
};

export default useRoomCodeValidation;
