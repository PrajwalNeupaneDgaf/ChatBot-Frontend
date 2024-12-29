import React, { useEffect } from "react";
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css'; // You can use a different theme if needed
import 'prismjs/components/prism-c.min.js'; // Add any languages you need

// Parse text and detect code blocks
const parseText = (text) => {
  
  const lines = text.split("\n\n"); // Split by double newlines for paragraphs
  let isCode = false
  let isPrintable = false
  let CodeToPrint = ""
  let lang
  return lines.map((line, index) => {
    if(line.startsWith('```')){
       const  code = line.replace(/```/g, "")
       const language = code.split('\n')
        lang = language[0]
       isCode = true
       CodeToPrint = language[1]
       return
    }
    
    if(isCode){
        if(line.endsWith("```")){
            isCode = false
            isPrintable= true
            CodeToPrint = CodeToPrint + line
        }
      if(!isPrintable){
        CodeToPrint = CodeToPrint + line
        return
      }else{
        isPrintable=false
        const code = CodeToPrint.replace(/```/g, "");
        return (
            <pre key={index} className={`language-${lang} custom-code`}>
              <code>{code}</code>
            </pre>
          );
      }

       
    }
  
    // Handle code blocks
    // if (line.startsWith("```") && line.endsWith("```")) {
    //   const code = line.replace(/```/g, ""); // Remove backticks
      
    // }

    // Handle bold text and inline formatting
    const formattedLine = line
      .split("\n") // Split by single newline for line breaks
      .map((segment, i) => (
        <p key={`${index}-${i}`}>
          {segment.split("**").map((part, j) =>
            j % 2 === 1 ? <strong key={j}>{part}</strong> : part
          )}
        </p>
      ));

    return formattedLine;
  });
};

const AiText = ({ Text }) => {
  useEffect(() => {
    Prism.highlightAll(); // Apply syntax highlighting after render
  }, [Text]);

  return <div>{parseText(Text)}</div>;
};

export default AiText;
