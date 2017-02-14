import React, {Component} from 'react';
import $ from 'jquery';

class Textarea extends Component {

   componentDidMount() {

      const $content = $(this._content);

      const cursorOffsetTop = $(this._cursor).offset().top;

      $content.scrollTop(cursorOffsetTop - $content.offset().top - 80);

      $content.perfectScrollbar();


      $content.on('focus', function() {
         console.log('focus');
      });

      $content.on('click', function() {
         console.log('click');
      });

      
   }

   render() {

      const {typed, nonTyped} = this.props;

      return (
        <div className='textarea'>
           <div className="textarea__content" ref={el => this._content = el}>
              <span className="textarea__typed">{typed}</span>
              <span className="textarea__cursor" ref={el => this._cursor = el}></span>
              <span className="textarea__non-typed">{nonTyped}</span>
           </div>
        </div>
      )
   }

}

export default Textarea