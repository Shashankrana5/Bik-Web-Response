/* eslint-disable */

import { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import "../css/editor.css"


export const FrontendPlayground = () => {

  const [value, setValue] =  useState<string>("");
  const [ text, setText] = useState("");
  const [ html, setHtml] = useState("");
  const log = () => {

    if(text){
      console.log(text);
    } 
    if(value) {
      console.log(value)
      setHtml(value);
    }
  };


  return (
    <>
      <Editor
        id="tiny-editor"
        apiKey='7rr86g3nuclc0x1y5gvq47ysqdt7gp8j2onq8aygur66m5yj'
        // eslint-disable-next-line
        onInit={(event, editor) => {
          setText(editor.getContent({format: "text"}))
        }}
        value = {value}
        init={{
          height: 500,
          menubar: false,
          plugins: [
            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
          ],
          toolbar: 'undo redo | ' +
            'bold italic forecolor | alignleft aligncenter ' +
            'alignright alignjustify | bullist numlist outdent indent | ' +
            'removeformat | help',
          content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
        }}
        onEditorChange={(newValue, editor) => {
          setValue(newValue);
          setText(editor.getContent({format: 'text'}));
        }}
        
      />

      <button onClick={log}>Log editor content</button>
      <div>{html && html.length > 0 ? 
  <p
            className="Features"
            dangerouslySetInnerHTML={{ __html: html }}
          />
      : <></>}</div>
    </>
  );
      }
