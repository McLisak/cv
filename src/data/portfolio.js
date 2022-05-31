import * as d from './portfolios';

export default {
  // TODO: add recent activities
  tvAuth: {
    name: 'auth-tv-chapter',
    short: 'asdf',
    description: d.tvAuth,
    skills: ['react', 'ts', 'webpack', 'aws'],
  },
  // tvLandingpage: {},
  // landingpageManager: {},
  // optimizely: {},
  // platformOnboarding: {},
  dux: {
    name: 'DUX',
    short:
      'DAZN User Experience. Modular JS client library that controls common features like ads, GDPR, content personalization, and many others - across DAZN portals.',
    description: d.dux,
    skills: ['ts', 'webpack', 'aws', 'gpt'],
  },
  cte: {
    name: 'CTE',
    short:
      'Tool made to speed up workflow with Google Ad Manager Creative Template. Much quicker template manipulation, immediate preview, export to zip and other cool features.',
    description: d.cte,
    skills: ['js', 'nodejs', 'gam', 'react'],
  },
  vaf: {
    name: 'VAF',
    short: 'Video Ad Framework. Library that manages HTML5 Video Ads',
    description: d.vaf,
    skills: ['ts', 'vue', 'css', 'ima', 'vast', 'webpack'],
  },
  cv: {
    name: 'CV',
    short: 'This page :D',
    description: d.cv,
    skills: ['js', 'scss', 'parcel'],
  },
};
