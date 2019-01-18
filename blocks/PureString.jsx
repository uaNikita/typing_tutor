import React, { PureComponent } from 'react';

import { getHiddenCharacters, convertTextToHtml } from 'Utils';

class Block extends PureComponent {
  render() {
    const {
      props: {
        string,
        hiddenChars,
        html,
        tag,
        ...rest
      },
    } = this;

    // eslint-disable-next-line no-underscore-dangle
    let __html = '';

    if (string) {
      if (hiddenChars) {
        __html = getHiddenCharacters(string);
      }
      else if (html) {
        __html = convertTextToHtml(string);
      }
      else {
        __html = string;
      }
    }

    const Tag = tag || 'span';

    return <Tag dangerouslySetInnerHTML={{ __html }} {...rest} />;
  }
}

export default Block;
