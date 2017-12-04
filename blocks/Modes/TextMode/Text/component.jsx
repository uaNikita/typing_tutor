import React from 'react';
import CSSModules from 'react-css-modules';

import styles from './text.module.styl';

const Text = props => {
  const {
    id,
    title,
    typed,
    last,
    currentTextId,
    refreshText,
    selectText,
  } = props;

  let refresh;

  if (typed) {
    refresh = <button onClick={() => refreshText(id)} className="fa fa-refresh" styleName="text__reload" />;
  }

  let select;

  if (id === currentTextId) {
    select = <span styleName="text__select text__select_selected">This text is selected</span>;
  }
  else {
    select = <button onClick={selectText(id)} styleName="text__select" href>Select this text to type</button>;
  }

  return (
    <div styleName="text">
      <div styleName="text__buttons">
        {refresh}
        {select}
      </div>

      <h3 styleName="text__title">
        {title}
      </h3>

      <span styleName="text__typed">{typed}</span>
      {last}
    </div>
  );
};

export default CSSModules(Text, styles, {
  allowMultiple: true,
});
