import ReactQuill from 'react-quill';
import styled from 'styled-components';

const CustomRichTextInput = styled(ReactQuill)`
	&& {
		.ql-toolbar {
			display: block;
			background: unset;
			border-top-left-radius: 0.5em;
			border-top-right-radius: 0.5em;
			background-color: ${(props) => props.theme.colorBgContainer};
			border: 1px solid ${(props) => props.theme.colorBorder};
		}
		.ql-container {
			border: 1px solid ${(props) => props.theme.colorBorder};
			border-bottom-left-radius: 0.5em;
			border-bottom-right-radius: 0.5em;
			background-color: ${(props) => props.theme.colorBgContainer};
		}

		.ql-editor {
			min-height: 18em;
		}
	}
`;
export default CustomRichTextInput;
