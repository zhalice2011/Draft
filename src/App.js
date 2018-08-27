import React, { Component } from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
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

  handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState);
      return 'handled' // 处理
    }
     return 'not-handled' // 不处理
     // 如果不返回 则是回退到本机命令处理
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState))
  }

  render() {
    return (
      <div>
        <button onClick={this.onUnderlineClick}>Underline</button>
        <button onClick={this.onToggleCode}>Code</button>
        <Editor
          onChange={this.onChange} // 状态改变函数
          editorState = {this.state.editorState} // 顶级状态

          handleKeyCommand={this.handleKeyCommand} // 返回代表命令的字符串

        /> 
      </div>
    )
  }
}

export default App;
