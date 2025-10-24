/*
TO RUN THIS SCRIPT: Control + Shift + I in CodeHS assignment, then paste it into console and enter. You may need to type allow pasting and enter if it doesn't allow you to.
HOW TO USE: Press mouse button to toggle the solutions visibility. This is a stripped down version of the full cheat menu made to be very stealthy by having no UI and notifications.
*/
(function () { // project rain gui css (gui style inspired from an old project i was involved in)
    document.onmousedown = function(e) {
        e = e || window.event;
        if (e.button === 1) { // middle click
          if (toggle() == true){
            dump_solution(1);
          } else {
            // destroy the  button
            e.preventDefault(); // prevent autoscroll
            const cheatBtn = document.getElementById("codehs-cheat-btn");
            if (cheatBtn) {
                cheatBtn.remove();
            }
  
            // remove any code blocks generated
            const codeblocks = document.querySelectorAll('pre > code');
            codeblocks.forEach(code => {
                if (code.textContent.includes("The following code was generated using CodeHS+")) {
                    const pre = code.parentElement;
                    pre.remove();
                }
            });
    
            // clear the dev console
            console.clear();
          }
        }
    }; 
    let enabled = false; // hidden solution by default

    function toggle(){
      enabled = !enabled;

      return enabled;
    }

    function dump_solution(choice){
        fetch(`https://codehs.com/editor/ajax/get_solution_code?itemID=${window.pageSpecific.itemID}&gulpUrl=${CHS.GULP_URL}&method=get_solution_code`)
        .then(response => response.json()) // recieve data as json
        .then(data => {
      
          const encrypted = data.solutionCodeJson; // apparently it is a vigenère cipher encryption
          const key = CHS.GULP_URL; // each char encrypted using CHS.GULP_URL. would be smth like https://static1.codehs.com/gulp/add45feb195ec40408821a5a754e79a8572ddf2d/ using the hash part for encoding
      
          let decrypted = ''; // each character is encoded by offsetting it based on a repeating pattern in CHS.GULP_URL
          for (let i = 0; i < encrypted.length; i++) {
            const offsetChar = key[i % key.length];
            decrypted += String.fromCharCode((encrypted.charCodeAt(i) - offsetChar.charCodeAt(0) + 256) % 256);
          }
      
          decrypted = decrypted.slice(1, decrypted.length - 1); // remove first and last characters cuz they are quotes
          if (choice == 1){
            (async () => {
              const targetDiv = document.querySelector('#panels > div.t > div:nth-child(4) > div');
              
              decrypted = decrypted.replace(/\\n/g, '\n').replace(/\\"/g, '"');
              var codeString = `The following code was generated using CodeHS+\n\n${decrypted}`;
              let detectedLang = 'plaintext';
          
              // regex to detect common keywords for diff languages
              if (/^\s*#include\b|int main\s*\(/.test(codeString)) {
                detectedLang = 'cpp';
              } else if (/^\s*import\b.*\bfrom\b|def |print\(/.test(codeString)) {
                  detectedLang = 'python';
              } else if (/function\s|\bconst\b|\blet\b|\bvar\b/.test(codeString)) {
                  detectedLang = 'javascript';
              } else if (/public\s+class\s+\w+|System\.out\.println\(/.test(codeString)) {
                  detectedLang = 'java';
              } else if (/<!DOCTYPE html>|<html>|<div>|<head>|<body>/.test(codeString)) {
                  detectedLang = 'html';
              } else if (/{\s*[^}]*:\s*[^}]*}/.test(codeString) && /color|background|font|margin|padding/.test(codeString)) {
                  detectedLang = 'css';
              } else if (/SELECT\s.+\sFROM\s|INSERT\sINTO\s|UPDATE\s.+\sSET\s|DELETE\sFROM\s/i.test(codeString)) {
                  detectedLang = 'sql';
              }
          
              // creating the codeblock
              const pre = document.createElement('pre');
              pre.className = 'hljs';
              const code = document.createElement('code');
              code.className = `language-${detectedLang}`;
              code.textContent = codeString;
              pre.appendChild(code);
              targetDiv.appendChild(pre);
          
              // load highlight.js from cloudflare
              if (!window.hljs) {
                  await new Promise((resolve, reject) => {
                      const script = document.createElement('script');
                      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js';
                      script.onload = resolve;
                      script.onerror = reject;
                      document.head.appendChild(script);
                  });
          
                  const link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/styles/github-dark.min.css';
                  document.head.appendChild(link);
                  //await new Promise(res => setTimeout(res, 100));
              }
          
              // highlighting
              window.hljs.highlightElement(code);
          })();
        } else if (choice == 3) { // destroy codeblocks
            const codeblocks = document.querySelectorAll('pre > code');
            let removedAny = false; // prevent no codeblocks found notif from running a ton of times since its in a foreach loop
        
            codeblocks.forEach(code => {
                if (code.textContent.includes("The following code was generated using CodeHS+")) {
                    const pre = code.parentElement;
                    pre.remove(); // remove pre tag
                    removedAny = true;
                }
            });
        }
        })
    }
})(); // Close devtools after running this in console.