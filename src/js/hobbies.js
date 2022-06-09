import { hobbies } from '../data/hobbies';

/**
 * @param {HTMLElement} $container
 */
export const renderHobbies = ($container) => {
  hobbies.forEach((hobby) => {
    const $hobby = document.createElement('div');
    const $hobbyText = document.createElement('h4');
    $hobbyText.innerText = hobby;

    ['box', 'center', 'frame'].forEach((cls) => $hobby.classList.add(cls));
    $hobby.appendChild($hobbyText);
    $container.appendChild($hobby);
  });
};
