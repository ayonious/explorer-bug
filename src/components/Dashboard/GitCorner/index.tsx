import * as React from 'react';
import GithubCorner from 'react-github-corner';
import { theme } from '../../../../config';

const GithubCornerPart = () => (
  <GithubCorner
    href="https://github.com/ayonious/explorer-bug"
    bannerColor={theme.primaryColor}
  />
);

export default GithubCornerPart;
