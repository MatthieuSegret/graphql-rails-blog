export const ADD_FLASH_MESSAGE = 'ADD_FLASH_MESSAGE';
export const DELETE_FLASH_MESSAGE = 'DELETE_FLASH_MESSAGE';

export function notice(text) {
  return {
    type: ADD_FLASH_MESSAGE,
    message: { type: 'notice', text }
  };
}

export function error(text) {
  return {
    type: ADD_FLASH_MESSAGE,
    message: { type: 'error', text }
  };
}

export function deleteFlashMessage() {
  return {
    type: DELETE_FLASH_MESSAGE
  };
}
