import  { RichUtils } from 'draft-js'

const defaultStyle = {
    background: 'rgb(62, 185, 186)',
    padding: '0 .3em',
    color: '#fff',
}
export default (style = {}) => {
    return {
      customStyleMap: {
        'HIGHLIGHT': {
            ...defaultStyle,
            ...style,
        }
      },
      keyBindingFn: (e) => { // 用户每次按键都会调用该方法
        if (e.metaKey && e.key === 'h') {
          return 'highlight'
        }
      },
      handleKeyCommand: (command, editorState, { setEditorState }) => {
        if (command === 'highlight') {
          setEditorState(RichUtils.toggleInlineStyle(editorState, 'HIGHLIGHT'))
          return true
        }
      },
    }
  }
