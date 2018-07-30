import React from 'react';

import TypedContent from 'Blocks/TypedContent/component';

const Block = ({ children, showHiddenChars }) => (
  <TypedContent hidden={showHiddenChars}>
    {children}
  </TypedContent>
);

export default Block;
