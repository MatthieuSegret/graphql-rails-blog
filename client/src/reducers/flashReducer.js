import { ADD_FLASH_MESSAGE, DELETE_FLASH_MESSAGE } from 'actions/flashActions';

export default (state = null, action = {}) => {
  switch (action.type) {
    case ADD_FLASH_MESSAGE: {
      return action.message;
    }

    case DELETE_FLASH_MESSAGE: {
      return null;
    }

    default:
      return state;
  }
};
