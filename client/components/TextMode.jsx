import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import Texts from '../containers/Texts.jsx';
import Text from '../containers/Text.jsx';
import AddText from '../containers/AddText.jsx';

const TextMode = ({ match: { url } }) => (
   <div>
      <Redirect from={url} to={`${url}/texts`}  />
      <Route exact path={`${url}/texts`} component={ Texts } />
      <Route path={`${url}/text/:textId`} component={ Text } />
      <Route path={`${url}/add-text`} component={ AddText } />
   </div>
);

export default TextMode;

