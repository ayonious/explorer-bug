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

### How GitHub Pages deployment works

The live site is hosted at [ayonious.github.io/explorer-bug](https://ayonious.github.io/explorer-bug/). GitHub Pages serves the generated static files, including HTML and JavaScript, rather than the React/TypeScript source code.

To generate those files locally, use Node.js 26 and run:

```sh
yarn install
yarn build
```

`yarn build` runs `webpack --mode production`. Webpack generates the production website in `dist/`, including:

- `dist/index.html`: the generated HTML page, based on `public/index.html`.
- `dist/main.js`: the bundled application code.
- `dist/favicon.ico`: the site's icon.

The contents of `dist/` are what GitHub Pages hosts. The folder is ignored by Git, so you do not commit these generated files.

### Automatic updates

You do **not** need to generate or upload `dist/` manually whenever the code changes. Every push to `master` starts the [Deploy to GitHub Pages workflow](.github/workflows/deploy.yml), which:

1. Checks out the latest source code and sets up Node.js 26.
2. Installs dependencies with `yarn install`.
3. Runs `yarn build` to generate `dist/` on the GitHub runner.
4. Uploads `dist/` as the Pages artifact.
5. Publishes that artifact to GitHub Pages after the build succeeds.

Your usual process is to edit the source, commit, and push to `master`. GitHub Actions takes care of building and publishing the updated site. A local `yarn build` is only needed when you want to check the production build yourself. Changes on other branches and pull requests do not trigger this deployment workflow.

You can follow deployment progress in **Actions → Deploy to GitHub Pages**. You can also redeploy manually there using **Run workflow** with the `master` branch selected.

### Enable Pages for your own fork

In your fork, select **Settings → Pages → Source → GitHub Actions**, then run the **Deploy to GitHub Pages** workflow on `master`. Your site will be available at `https://<your-username>.github.io/<repository-name>/`.

### Optional Vercel deployment

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fayonious%2Fexplorer-bug)

For automatic deployments, import this repository into Vercel and set the production branch to `master`. The checked-in `vercel.json` installs dependencies with Yarn, runs `yarn build`, and serves `dist`. Node.js 26 is specified in `package.json`.
