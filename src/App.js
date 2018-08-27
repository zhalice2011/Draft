import React, { Component } from 'react';
import { Editor, EditorState } from 'draft-js';
import './App.css';

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editorState: EditorState.createEmpty(),
    }
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }
  render() {
    return (
      <Editor
        onChange={this.onChange} 
        editorState = {this.state.editorState} 
      /> 
    )
  }
}

export default App;
