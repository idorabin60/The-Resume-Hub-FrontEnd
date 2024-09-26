import { useState } from 'react';
import { 
    BtnBold, 
    BtnItalic, 
    createButton, 
    Editor, 
    EditorProvider, 
    Toolbar
  } from 'react-simple-wysiwyg';
  
  const BtnAlignCenter = createButton('Align center', '≡', 'justifyCenter');


  // eslint-disable-next-line react/prop-types
  export default function ReachTextEditor({ value, onChange }) {
    const [text,setText] = useState('');
    const change =(e)=>{
        setText(e.target.value)
    }
    return (
      <EditorProvider>
        <Editor value={text} onChange={change}>
          <Toolbar>
            <BtnBold />
            <BtnItalic />
            <BtnAlignCenter />
          </Toolbar>
        </Editor>
      </EditorProvider>
    );
  }
  