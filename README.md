# Explorer Bug

A simple game for exploring a 2D world with a bug.

**[▶ Play Explorer Bug](https://ayonious.github.io/explorer-bug/)**

<p align="center">
  <img height="auto" width="350px" alt="Explorer Bug gameplay preview" src="https://cdn.jsdelivr.net/gh/ayonious/explorer-bug@master/documentation/bugdemo.gif">
</p>

The game is hosted on GitHub Pages and updates automatically when changes are published.

<details>
<summary>Technical details: local setup, builds, and GitHub Pages deployment</summary>

## Run locally

Use Node.js 26, then run:

```sh
yarn install
yarn start
```

## Project checks

[![CI](https://github.com/ayonious/explorer-bug/workflows/CI/badge.svg)](https://github.com/ayonious/explorer-bug/actions)
[![codecov](https://codecov.io/gh/ayonious/explorer-bug/branch/master/graph/badge.svg)](https://codecov.io/gh/ayonious/explorer-bug)
[![Cypress Tests](https://github.com/ayonious/explorer-bug/actions/workflows/cypress.yml/badge.svg)](https://github.com/ayonious/explorer-bug/actions/workflows/cypress.yml)

## Things learned in this project

- TypeScript
- React Testing Library
- Webpack and Babel
- Styled Components
- GitHub Pages deployment
- Integration testing with Cypress

## Build and deployment

### How GitHub Pages deployment works

The live site is hosted at [ayonious.github.io/explorer-bug](https://ayonious.github.io/explorer-bug/). GitHub Pages serves the generated static files, including HTML and JavaScript, rather than the React/TypeScript source code.

To generate those files locally, use Node.js 26 and run:

```sh
yarn install
yarn build
```

### How Webpack generates the website

`yarn build` runs `webpack --mode production` using [webpack.config.js](webpack.config.js):

1. Webpack starts at `src/index.tsx` and follows the files it imports.
2. `babel-loader` uses Babel to compile TypeScript and JSX from `.ts` and `.tsx` files into browser JavaScript.
3. Webpack bundles the application and its dependencies into `main.js`. Because the config does not specify an `output.path`, Webpack uses its default output directory, `dist/`.
4. `HtmlWebpackPlugin` generates `index.html` from `public/index.html`, adds the bundled JavaScript reference, and copies the favicon.

The resulting production files look like this:

```text
dist/
├── index.html          # Generated HTML page
├── main.js             # Compiled and bundled application
├── main.js.LICENSE.txt # License notices from bundled dependencies
└── favicon.ico         # Site icon
```

GitHub Pages hosts the **contents of `dist/`**. It does not compile or run the original TSX files. The `dist/` folder is ignored by Git, so you do not commit or push these generated files.

### Automatic updates

You do **not** need to generate or upload `dist/` manually whenever the code changes. Every push to `master` starts the [Deploy to GitHub Pages workflow](.github/workflows/deploy.yml), which:

1. Checks out the latest source code and sets up Node.js 26.
2. Installs dependencies with `yarn install`.
3. Runs `yarn build` to generate `dist/` on the GitHub runner.
4. Uploads `dist/` as the Pages artifact.
5. Publishes that artifact to GitHub Pages after the build succeeds.

### What to push when you change a React component

**Push your source changes, not the generated build files.** For example, after editing a `.tsx` component, commit that component along with any related source, styles, or configuration changes. Do not add `dist/` to the commit, even if you ran `yarn build` locally.

You can make and test multiple edits locally with `yarn start` before committing. You do not need to push after every edit. When you want to publish an update, push your committed changes to `master` (or merge your pull request into `master`).

```text
Edit source files → Commit and push to master
                 → GitHub Actions runs yarn build
                 → Generated dist/ files are published to GitHub Pages
```

GitHub Actions takes care of building and publishing the updated site. A local `yarn build` is only needed when you want to check the production build yourself; the workflow builds again from the committed source. Changes on other branches and pull requests do not trigger this deployment workflow.

You can follow deployment progress in **Actions → Deploy to GitHub Pages**. You can also redeploy manually there using **Run workflow** with the `master` branch selected.

### Enable Pages for your own fork

In your fork, select **Settings → Pages → Source → GitHub Actions**, then run the **Deploy to GitHub Pages** workflow on `master`. Your site will be available at `https://<your-username>.github.io/<repository-name>/`.

</details>
