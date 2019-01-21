import Prism from "prismjs";
// import "prismjs/themes/prism-tomorrow.css";
import "prismjs/themes/prism-coy.css";

export default (value, lang= 'javascript')=>{
    if(!value){
        return ''
    }
    return Prism.highlight(value, Prism.languages[lang] 
        || Prism.languages.javascript)
}

// import hljs from 'highlightjs/highlight.pack.js';
// import 'highlightjs/styles/atom-one-light.css';

// let div = document.createElement('div')

// export default (code)=>{
//     div.removeAttribute('class')
//     div.textContent = code;
//     hljs.highlightBlock(div);
//     return div.innerHTML
// } 