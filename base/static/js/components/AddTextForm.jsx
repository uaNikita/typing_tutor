import React, {Component} from 'react';

import { uniq } from 'lodash';
import classNames from 'classNames';

import Control from './Control.jsx';

class AddTextForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      titleError: '',
      textareaError: '',
    };

    this._validCharacters = ['w', 's', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '=', ',', '.', '/', ';', ':', '"', "'", '\\', '|', '[', ']', '{', '}'];
  }

  componentDidMount() {
    this._wasSubmit = false;
  }

  handleSubmit(e) {

    e.preventDefault();

    if (!this._wasSubmit) {
      this._wasSubmit = true;
    }

    if (this._validateForm()) {
      this.props.onSubmit(this._title.refs.ctrl.value, this._textarea.refs.ctrl.value);

      this._title.refs.ctrl.value = '';

      this._textarea.refs.ctrl.value = '';
    }

  }

  handleKeyUp() {

    if (!this._wasSubmit) {
      return;
    }

    this._validateForm();

  }

  render() {
    const { className } = this.props;

    return (
      <form className={ classNames('add-text-form', className) } onSubmit={ this.handleSubmit.bind(this) }>
        <Control
          className="add-text-form__ctrl-full"
          classNameCtrl="add-text-form__title"
          el="input"
          type="text"
          error={ this.state.titleError }
          ref={(c) => this._title = c }
          onKeyUp={ this.handleKeyUp.bind(this) }
          placeholder="Title"
        />
        <Control
          className="add-text-form__ctrl-full"
          classNameCtrl="add-text-form__textarea"
          el="textarea"
          error={ this.state.textareaError }
          ref={ (c) => this._textarea = c }
          onKeyUp={ this.handleKeyUp.bind(this) }
          placeholder="Add text here"
        />
        <button className="button add-text-form__add" title="Add text">Add</button>
      </form>
    )

  }

  _getWrongCharsError(text) {
    let re = new RegExp('[^\\' + this._validCharacters.join('\\') + ']', 'g');
    let result = '';

    let errorCharsResult = text.match(re);

    if (errorCharsResult) {
      errorCharsResult = uniq(errorCharsResult);

      result = 'Title contains invalid character';

      if (errorCharsResult.length > 1) {
        result += 's';
      }

      result += ' - ' + errorCharsResult.join(', ');
    }

    return result;
  }

  _validateForm() {
    let elTitle = this._title.refs.ctrl;
    let elTextarea = this._textarea.refs.ctrl;
    let titleError;
    let textareaError;

    if (!elTitle.value) {
      titleError = 'Title can not be empty';
    }
    else {
      titleError = this._getWrongCharsError(elTitle.value);
    }

    if (!elTextarea.value) {
      textareaError = 'Body can not be empty';
    }
    else {
      textareaError = this._getWrongCharsError(elTextarea.value);
    }

    this.setState({
      titleError,
      textareaError
    });

    if (titleError || textareaError) {
      return false;
    }

    return true;
  }

}


export default AddTextForm

