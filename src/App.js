import React, { Component } from 'react'
import { EditorState, RichUtils, convertToRaw, convertFromRaw, getDefaultKeyBinding, KeyBindingUtil } from 'draft-js'
import Editor from 'draft-js-plugins-editor'
import createEmojiPlugin from 'draft-js-emoji-plugin'
import createMarkdownPlugin from 'draft-js-markdown-plugin'
import createHighlightPlugin from './highlightPlugin'
import debounce from 'lodash/debounce'

import 'draft-js-emoji-plugin/lib/plugin.css'
import './App.css'

const emojiPlugin = createEmojiPlugin()
const markdownPlugin = createMarkdownPlugin()
const highlightPlugin = createHighlightPlugin()

// 映射自定义的键盘快捷键
const myKeyBindingFn = (e) => {
  if (e.keyCode === 83 /* `S` key */ && KeyBindingUtil.hasCommandModifier(e)) {
    return 'save';
  } 
  return getDefaultKeyBinding(e);
}

const { EmojiSuggestions } = emojiPlugin
class App extends Component {
  constructor (props) {
    super(props)
    this.state = {}

    // 获取上次保存的数据
    const content = window.localStorage.getItem('content')
    if (content) {
      this.state.editorState = EditorState.createWithContent(convertFromRaw(JSON.parse(content)))
    } else {
      this.state.editorState = EditorState.createEmpty()
    }
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  handleKeyCommand = (command) => {
    if (command === 'save') { 
      const contentState = this.state.editorState.getCurrentContent()
      this.saveContent(contentState)
    }
    const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
    if (newState) {
      this.onChange(newState)
      return true;
    }
    return 'not-handled' // 不处理
  }

  onUnderlineClick = () => {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'))
  }

  onToggleCode = () => {
    this.onChange(RichUtils.toggleCode(this.state.editorState))
  }
  
  saveContent = (content) => {  // 保存数据到本地
    window.localStorage.setItem('content', JSON.stringify(convertToRaw(content)))
  }


  render() {
    return (
      <div>
        <button onClick={this.onUnderlineClick}>Underline</button>
        <button onClick={this.onToggleCode}>Code</button>
        <Editor
          ref={r => { this.editor = r }}
          editorState = {this.state.editorState} // 顶级状态
          onChange={this.onChange} // 状态改变函数

          keyBindingFn={myKeyBindingFn} // 返回键盘对应的命令action 字符串
          handleKeyCommand={this.handleKeyCommand} // 根据命令action匹配对应的操作函数
          plugins={[emojiPlugin, highlightPlugin, markdownPlugin]}
        /> 
        <EmojiSuggestions />
      </div>
    )
  }
}

export default App
