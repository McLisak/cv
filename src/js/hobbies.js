import { hobbies } from '../data/hobbies';

/**
 * @param {HTMLElement} container
 */
export const renderHobbies = (container) => {
  hobbies.forEach((hobby) => {
    const $hobby = document.createElement('div');
    $hobby.classList.add('.box');
    container.appendChild($hobby);
  });
};
