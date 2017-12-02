import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Texts from './Texts/container';
import Text from './Text/container';
import AddText from './AddText/container';

const TextMode = ({ match: { url } }) => [
  <Redirect key="redirect" from={url} to={`${url}/texts`} />,
  <Route key="texts" exact path={`${url}/texts`} component={Texts} />,
  <Route key="text" path={`${url}/text/:textId`} component={Text} />,
  <Route key="add-text" path={`${url}/add-text`} component={AddText} />,
];

export default TextMode;

