import portfolioData from '../data/portfolio';

const renderSkills = (skills = []) => {
  let result = '';
  skills.forEach((skillName) => {
    result += `<div class="skill skill-mini skill-${skillName}"></div>`;
  });
  return result;
};

const renderProject = ({ project, projectKey, fullDescription }) => {
  return `
  <div class="slide" data-name=${projectKey}>
    <h3>${project.name}</h3>
    <div class="slide-content-container">
      <div class="slide-content">
        ${fullDescription && project.description ? project.description : `<p>${project.short}</p>`}
      </div>
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
  Object.keys(portfolioData).forEach((projectKey) => {
    const project = portfolioData[projectKey];
    projectsHtmls += renderProject({ project, projectKey, fullDescription });
  });
  const portfolioHTML = `
  <div class="slides">
    ${projectsHtmls}
  </div>
  `;
  container.innerHTML = portfolioHTML;
};
