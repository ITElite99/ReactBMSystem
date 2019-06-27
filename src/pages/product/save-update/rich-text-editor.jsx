import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { EditorState, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
// import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichTextEditor extends Component {
    // 数据传递约束
    static propTypes = {
        detail: PropTypes.string.isRequired
    };
    // 构造函数
    // 在constructor中要传props，否则就不能使用，传了就可以使用
    // 如果有初始化数据，就在constructor里面执行
    // 如果没有初始化数据，就在componentWillMount里面执行
    constructor(props) {
        super(props);
        const blocksFromHtml = htmlToDraft(this.props.detail);
        const { contentBlocks, entityMap } = blocksFromHtml;
        const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
        const editorState = EditorState.createWithContent(contentState);

        this.state ={
            editorState
        }
    }

    // 编辑富文本框时状态变化事件
    onEditorStateChange = (editorState) => {
        // 边输入边获取值
        // console.log(draftToHtml(convertToRaw(editorState.getCurrentContent())))
        this.setState({
            editorState,
        });
    };

    render() {
        const { editorState } = this.state;
        return (
            <div>
                <Editor
                    editorState={editorState}
                    // wrapperClassName="demo-wrapper"
                    editorClassName="editor"
                    onEditorStateChange={this.onEditorStateChange}
                />
            </div>
        );
    }
}