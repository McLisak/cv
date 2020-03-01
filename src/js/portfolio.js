import portfolioData from '../data/portfolio';

const renderSkills = (skills) => {
  let result = '';
  skills.forEach((skillName) => {
    result += `<div class="cont skill skill-mini skill-${skillName}"></div>`;
  });
  return result;
};
const renderProject = (project) => {
  return `
  <div class="slide">
    <h3>${project.name}</h3>
    <p>${project.short}</p>
    <div class="row center">
      ${renderSkills(project.skills)}
    </div>
  </div>
  `;
};

/**
 *
 * @param {HTMLDivElement} container
 */
export const renderPortfolio = (container) => {
  let projectsHtmls = '';
  Object.values(portfolioData).forEach((project) => {
    projectsHtmls += renderProject(project);
  });
  container.innerHTML = `
  <div class="slides">
    ${projectsHtmls}
  </div>
  `;
};
