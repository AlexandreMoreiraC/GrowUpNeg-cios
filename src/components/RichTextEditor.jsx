import React, { useState } from "react";
import { Editor, EditorState, RichUtils, convertToRaw } from "draft-js";
import "draft-js/dist/Draft.css";
import draftToHtml from "draftjs-to-html";

function RichTextEditor({ onChange }) {
  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const handleChange = (state) => {
    setEditorState(state);
    const raw = convertToRaw(state.getCurrentContent());
    const html = draftToHtml(raw);
    onChange(html);
  };

  const handleKeyCommand = (command) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      handleChange(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style) => {
    handleChange(RichUtils.toggleInlineStyle(editorState, style));
  };

  return (
    <div>
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => toggleInlineStyle("BOLD")}>Bold</button>
        <button onClick={() => toggleInlineStyle("ITALIC")}>Italic</button>
        <button onClick={() => toggleInlineStyle("UNDERLINE")}>Underline</button>
      </div>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          minHeight: "150px",
          backgroundColor: "#fff",
        }}
      >
        <Editor
          editorState={editorState}
          onChange={handleChange}
          handleKeyCommand={handleKeyCommand}
        />
      </div>
    </div>
  );
}

export default RichTextEditor;
