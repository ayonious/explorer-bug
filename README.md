# Explorer Bug

[![CI](https://github.com/ayonious/explorer-bug/workflows/CI/badge.svg)](https://github.com/ayonious/explorer-bug/actions)
[![codecov](https://codecov.io/gh/ayonious/explorer-bug/branch/master/graph/badge.svg)](https://codecov.io/gh/ayonious/explorer-bug)
[![Cypress Tests](https://github.com/ayonious/explorer-bug/actions/workflows/cypress.yml/badge.svg)](https://github.com/ayonious/explorer-bug/actions/workflows/cypress.yml)

Simple React app to explore the 2d interface with a bug

<p align="center">
  <img height="auto" width="350px" alt="Screenshot" src="https://cdn.jsdelivr.net/gh/ayonious/explorer-bug@master/documentation/bugdemo.gif">
</p>

# 🎁 See Deployed

[Play Explorer Bug on GitHub Pages](https://ayonious.github.io/explorer-bug/)

# 🏃‍♂️ Local Running instruction

```
yarn
yarn run start
```

## 🎓 Things that I learnt in this project

1. Ts
2. Test with React Testing Library
3. Webpack and babbel
4. Styled Components
5. GitHub Pages Deployment
6. Integration testing with cypress 

## 🚀 Deploy Yourself

GitHub Pages deploys automatically from `master` using `.github/workflows/deploy.yml` and Node.js 26. For your own fork, select **Settings → Pages → Source → GitHub Actions**, then run the **Deploy to GitHub Pages** workflow.

### Optional Vercel deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fayonious%2Fexplorer-bug)

For automatic deployments, import this repository into Vercel and set the production branch to `master`. The checked-in `vercel.json` installs dependencies with Yarn, runs `yarn build`, and serves `dist`. Node.js 26 is specified in `package.json`.
