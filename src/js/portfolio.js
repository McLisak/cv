import portfolioData from '../data/portfolio';
import skills from './skills';

const renderSkills = (skills = []) => {
  let result = '';
  skills.forEach((skillName) => {
    result += `<div class="skill skill-mini skill-${skillName}"></div>`;
  });
  return result;
};

const renderProject = ({ project, fullDescription }) => {
  return `
  <div class="slide">
    <h3>${project.name}</h3>
    <div class="slide-content">
      <p>${fullDescription ? project.description || project.short : project.short}</p>
    </div>
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
export const renderPortfolio = ({ container, fullDescription = false }) => {
  let projectsHtmls = '';
  Object.values(portfolioData).forEach((project) => {
    projectsHtmls += renderProject({ project, fullDescription });
  });
  const portfolioHTML = `
  <div class="slides">
    ${projectsHtmls}
  </div>
  `;
  container.innerHTML = portfolioHTML;
};
