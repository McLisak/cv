import * as d from './portfolios';
import { SKILL } from './skills';
export default {
  eventData: {
    name: 'Event Data',
    short:
      'Real time, hotkey intensive, video game alike, soccer data collection app.',
    description: d.eventData,
    skills: [
      SKILL.REACT,
      SKILL.TS,
      SKILL.MUI,
      SKILL.ZUSTAND,
      SKILL.VITE,
      SKILL.VITEST,
      SKILL.PLAYWRIGHT,
      SKILL.GHA,
    ],
  },
  monitoringTool: {
    name: 'Monitoring Tool',
    short:
      'Real time data monitoring and management. Tool used by scoring supervisors to control and adjust data collected by scorers in venue.',
    description: d.monitoringTool,
    skills: [
      SKILL.REACT,
      SKILL.TS,
      SKILL.MUI,
      SKILL.VITE,
      SKILL.VITEST,
      SKILL.GHA,
    ],
  },
  frs: {
    name: 'Front Row Seat',
    short: 'A suite of sport specific data presentation embeddable apps.',
    description: d.frs,
    skills: [
      SKILL.REACT,
      SKILL.TS,
      SKILL.PLAYWRIGHT,
      SKILL.NODE_JS,
      SKILL.GHA,
      SKILL.TURBOREPO,
    ],
  },
  tvAuth: {
    name: 'Auth TV Chapter',
    short: 'Authorization front-end in DAZN Living Room App.',
    description: d.tvAuth,
    skills: [SKILL.REACT, SKILL.TS, SKILL.WEBPACK, SKILL.GHA, SKILL.AWS],
  },
  tvLandingpage: {
    name: 'Landingpage TV Chapter',
    short: 'Landing page front-end in DAZN Living Room App.',
    description: d.tvLandingpage,
    skills: [SKILL.JS, SKILL.WEBPACK, SKILL.GHA],
  },
  landingpageManager: {
    name: 'Landingpage Manager',
    short: 'A full-stack total rebuild of DAZN living room landingpages CMS.',
    description: d.landingpageManager,
    skills: [
      SKILL.TS,
      SKILL.REACT,
      SKILL.AWS,
      SKILL.NODE_JS,
      SKILL.GQL,
      SKILL.GHA,
      SKILL.WEBPACK,
    ],
  },
  platformOnboarding: {
    name: 'Platforms Onboarding',
    short:
      'Preparing whole DAZN App for release on new platforms and migrate from legacy app on supported platforms.',
    description: d.platformOnboarding,
    skills: [SKILL.JS, SKILL.CSS, SKILL.WEBPACK],
  },
  dux: {
    name: 'DUX',
    short:
      'DAZN User Experience. Modular JS client library that controls common features like ads, GDPR, content personalization, and many others - across DAZN portals.',
    description: d.dux,
    skills: [SKILL.TS, SKILL.WEBPACK, SKILL.AWS, SKILL.GPT],
  },
  cte: {
    name: 'CTE',
    short:
      'An app made to speed up workflow with Google Ad Manager Creative Template. Much quicker template manipulation, immediate preview, export to zip and other cool features.',
    description: d.cte,
    skills: [SKILL.JS, SKILL.VUE, SKILL.NODE_JS, SKILL.GAM],
  },
  vaf: {
    name: 'VAF',
    short: 'Video Ad Framework. Library that manages HTML5 Video Ads',
    description: d.vaf,
    skills: [SKILL.TS, SKILL.CSS, SKILL.IMA, SKILL.VAST, SKILL.WEBPACK],
  },
  spieler: {
    name: 'Spieler',
    short:
      'A core video player used by different teams to build their players on top of it.',
    description: d.spieler,
    skills: [SKILL.JS, SKILL.WEBPACK, SKILL.IMA, SKILL.VAST, SKILL.CSS],
  },
  cv: {
    name: 'CV',
    short: 'This page 😀',
    description: d.cv,
    skills: [SKILL.JS, SKILL.SCSS, SKILL.PARCEL],
  },
  fizykaKursy: {
    name: 'fizyka-kursy.pl',
    short:
      'An online course store. First big, fullstack project I implemented.',
    description: d.fizykaKursy,
    skills: [SKILL.JS, SKILL.CSS],
  },
};
