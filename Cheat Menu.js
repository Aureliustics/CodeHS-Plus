/*
You can also run this by itself without tampermonkey. Control + Shift + I, then paste it into console and enter.
*/
(function () { // project rain gui css (gui style inspired from an old project i was involved in)
    const style = document.createElement("style");
    style.textContent = `
        .project-rain-gui {
        display: none;
        position: fixed;
        top: 100px;
        left: 100px;
        width: 600px;
        height: 500px;
        background-color: #0e0e1a;
        color: #00bfff;
        font-family: monospace;
        font-size: 13px;
        border: 2px solid #00bfff;
        z-index: 9999;
        overflow-y: scroll;
        padding: 10px;
        }

        .project-rain-gui::-webkit-scrollbar {
          width: 0;
          height: 0;
        }

        .project-rain-header {
        cursor: move;
        font-size: 16px;
        font-weight: bold;
        color: white;
        margin-bottom: 10px;
        }

        .tab-bar {
        display: flex;
        margin-bottom: 10px;
        gap: 10px;
        }

        .tab-bar div {
        padding: 2px 6px;
        background-color: #141421;
        border: 1px solid #00bfff;
        cursor: pointer;
        }

        .tab-bar div.active {
        background-color: #0e0e1a;
        }

        .section {
        margin-bottom: 20px;
        padding: 10px 0;
        border-bottom: 2px solid rgb(34, 34, 34);
        }

        .section:last-child {
        border-bottom: none;
        }

        .section-title {
        color: white;
        margin: 5px 0;
        }

        .checkbox-group,
        .slider-group {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        }

        label {
        display: flex;
        align-items: center;
        gap: 4px;
        }

        input[type="checkbox"] {
        accent-color: #00bfff;
        }

        input[type="range"] {
        width: 200px;
        }

        .button {
        background: #141421;
        color: #00bfff;
        border: 1px solid #00bfff;
        padding: 2px 5px;
        margin: 5px 0;
        cursor: pointer;
        }

        input[type="text"],
        select {
        background: #141421;
        color: #00bfff;
        border: 1px solid #00bfff;
        padding: 2px;
        }
    `;
    document.head.appendChild(style);

    const gui = document.createElement("div");
    gui.className = "project-rain-gui";
    gui.innerHTML = `
      <div class="project-rain-header" id="drag-header">CodeHS+ Cheat Menu | Developed By @aureliustics</div>

      <div class="tab-bar">
        <div class="active" id="mainTab">Automation</div>
        <div id="exploitsTab">Exploits</div>
        <div id="uiSettingsTab">UI Settings</div>
        <div id="showAllTab">Everything</div>
      </div>

      <div class="section" id="automationSection">
        <div class="section-title">CodeHS Automation</div>
        <div class="checkbox-group">
          <label><input type="checkbox" id="autoSubmit">Auto Submit</label>
        </div>
        <div class="checkbox-group">
          <label><input type="checkbox" id="blockLogs">Block Paste Logs</label>
        </div>
        <div class="slider-group">
          Submit Delay: <input type="range" min="0" max="1000" value="350" id="submitDelay">
        </div>
      </div>

      <div class="section" id="exploitsSection">
        <div class="section-title">CodeHS Exploits</div>
        <button class="button" id="codeblockBtn">Dump to Codeblock</button>
        <button class="button" id="clipboardBtn">Copy to Clipboard</button>
        <button class="button" id="destroyBtn">Destroy Codeblocks</button>
      </div>

      <div class="section" id="uiSettingsSection">
        <div class="section-title">UI Settings</div>
        <div class="checkbox-group">
          <label>Main Color: <input type="color" id="mainColor" value="#0e0e1a"></label>
        </div>
        <div class="checkbox-group">
          <label>Accent Color: <input type="color" id="accentColor" value="#00bfff"></label>
        </div>
        <div class="checkbox-group">
          <label>Button Background Color: <input type="color" id="buttonBgColor" value="#141421"></label>
        </div>
        <div class="checkbox-group">
          <label><input type="checkbox" id="rainbowToggle"> Enable Rainbow Accent</label>
        </div>
        <div class="slider-group">
          Rainbow Speed: <input type="range" min="10" max="200" value="100" id="rainbowSpeed">
        </div>
        <button class="button" id="resetBtn">Reset to Default</button>
      </div>

      <p>- To self destruct cheat menu, middle click with your mouse.</p>
      <p>- Automation has not yet been implemented. It will be added soon.</p>
    `;
    document.body.appendChild(gui);

    // notification css stuff
    if (!document.getElementById('rain-notif-css')) {
        const style = document.createElement('style');
        style.id = 'rain-notif-css';
        style.textContent = `
        .rain-notif {
            position: fixed;
            right: 20px;
            z-index: 9999;
            display: flex;
            align-items: stretch;
            background: none;
            margin: 4px 0;
            border-radius: 0;
            opacity: 0;
            transform: scaleX(0);
            transform-origin: right;
            animation: slide-in-x 0.25s ease-out forwards;
        }
    
        .custom-bar {
            width: 2px;
            background-color: #00b4ff;
        }
    
        .notif-body {
            background: rgba(20, 20, 20, 0.95);
            color: white;
            font-family: monospace;
            font-size: 14px;
            font-weight: normal;
            padding: 4px 10px;
            white-space: pre;
            box-shadow: 0 0 6px rgba(0, 0, 0, 0.6);
        }
    
        @keyframes slide-in-x {
            from {
                opacity: 0;
                transform: scaleX(0);
            }
            to {
                opacity: 1;
                transform: scaleX(1);
            }
        }
    
        @keyframes slide-out-x {
            from {
                opacity: 1;
                transform: scaleX(1);
            }
            to {
                opacity: 0;
                transform: scaleX(0);
            }
        }
        `;
        document.head.appendChild(style);
    }
    
    const activeNotifs = [];
    
    function repositionNotifs() {
        activeNotifs.forEach((el, i) => {
            el.style.top = `${50 + i * 40}px`; // initial position + spacing of notifs
        });
    }
    
    // notification logic
    function rainNotify(text, duration = 5000) {
        const notif = document.createElement('div');
        notif.className = 'rain-notif';
    
        const bar = document.createElement('div');
        bar.className = 'custom-bar';
    
        const body = document.createElement('div');
        body.className = 'notif-body';
        body.textContent = text;
    
        notif.appendChild(bar);
        notif.appendChild(body);
    
        notif.style.right = '20px';
    
        document.body.appendChild(notif);
        activeNotifs.push(notif);
        repositionNotifs();
    
        setTimeout(() => { // notification appear and disappear anim
            notif.style.animation = 'slide-out-x 0.3s ease-in forwards';
            notif.addEventListener('animationend', () => {
                notif.remove();
                const index = activeNotifs.indexOf(notif);
                if (index !== -1) activeNotifs.splice(index, 1);
                repositionNotifs();
            });
        }, duration);
    }
    
    rainNotify('[CodeHS+]: Cheat Menu Loaded!'); // later make this show time to load

    // dragging n shit
    const dragEl = document.getElementById("drag-header");
    let isDragging = false;
    let offsetX, offsetY;

    dragEl.addEventListener("mousedown", function (e) {
      isDragging = true;
      offsetX = e.clientX - gui.offsetLeft;
      offsetY = e.clientY - gui.offsetTop;
      e.preventDefault();
    });

    document.addEventListener("mousemove", function (e) {
      if (isDragging) {
        gui.style.left = e.clientX - offsetX + "px";
        gui.style.top = e.clientY - offsetY + "px";
      }
    });

    document.addEventListener("mouseup", function () {
      isDragging = false;
    });

    // ui color change logic
    const mainColorInput = document.getElementById('mainColor');
    const accentColorInput = document.getElementById('accentColor');
    const buttonBgColorInput = document.getElementById('buttonBgColor');

    mainColorInput.addEventListener('input', (e) => {
      document.querySelector('.project-rain-gui').style.backgroundColor = e.target.value;
    });

    accentColorInput.addEventListener('input', (e) => {
        // sync color changes
        const accentColor = e.target.value;
        document.querySelectorAll('.project-rain-gui, .tab-bar div, .button, input[type="text"], select').forEach(element => {
            element.style.borderColor = accentColor;
            element.style.color = accentColor;
        });
    
        // update the .custom-bar color for notifs
        document.querySelectorAll('.custom-bar').forEach(bar => {
            bar.style.backgroundColor = accentColor;
        });
    });

    buttonBgColorInput.addEventListener('input', (e) => {
      document.querySelectorAll('.button, .tab-bar div').forEach(button => {
        button.style.backgroundColor = e.target.value;
      });
    });



    const rainbowToggle = document.getElementById('rainbowToggle');
    const rainbowSpeedInput = document.getElementById('rainbowSpeed');
    let rainbowInterval;
    let rainbowSpeed = parseInt(rainbowSpeedInput.value);
    
    rainbowSpeedInput.addEventListener('input', (e) => {
        rainbowSpeed = parseInt(e.target.value);
        if (rainbowToggle.checked) {
            startRainbowEffect();
        }
    });
    
    function startRainbowEffect() {
        if (rainbowInterval) clearInterval(rainbowInterval);
    
        const updateInterval = 50; // 50ms update interval
    
        rainbowInterval = setInterval(() => {
            const now = Date.now();
            const speedFactor = rainbowSpeed / 100; // scale speed
            const r = Math.floor(Math.sin(now * 0.001 * speedFactor) * 127 + 128);
            const g = Math.floor(Math.sin(now * 0.002 * speedFactor) * 127 + 128);
            const b = Math.floor(Math.sin(now * 0.003 * speedFactor) * 127 + 128);            
            const rgb = `rgb(${r}, ${g}, ${b})`;
    
            // update other elements colors
            document.querySelectorAll('.project-rain-gui, .tab-bar div, .button, input[type="text"], select').forEach(element => {
                element.style.borderColor = rgb;
                element.style.color = rgb;
            });
    
            // also apply the rainbow effect to the custom notification bars
            document.querySelectorAll('.custom-bar').forEach(bar => {
                bar.style.backgroundColor = rgb;
            });
        }, updateInterval);
    }
    
    rainbowToggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            startRainbowEffect();
        } else {
            clearInterval(rainbowInterval);
            const defaultAccentColor = "#00bfff"; // default accent color
            document.querySelectorAll('.project-rain-gui, .tab-bar div, .button, input[type="text"], select').forEach(element => {
                element.style.borderColor = defaultAccentColor;
                element.style.color = defaultAccentColor;
            });
    
            // reset notification bars to the default color
            document.querySelectorAll('.custom-bar').forEach(bar => {
                bar.style.backgroundColor = defaultAccentColor;
            });
        }
    });

    // reset to default Logic
    document.getElementById('resetBtn').onclick = () => {
        mainColorInput.value = "#0e0e1a";
        accentColorInput.value = "#00bfff";
        buttonBgColorInput.value = "#141421";
      
        // reset rainbow effect
        rainbowToggle.checked = false;
        rainbowSpeedInput.value = "100";
        clearInterval(rainbowInterval);
      
        // reset the background and border colors of everything
        document.querySelector('.project-rain-gui').style.backgroundColor = "#0e0e1a";
        document.querySelectorAll('.project-rain-gui, .tab-bar div, .button, input[type="text"], select').forEach(element => {
          element.style.borderColor = "#00bfff";
          element.style.color = "#00bfff";
          if (element.classList.contains('button') || element.classList.contains('tab-bar')) {
            element.style.backgroundColor = "#141421"; // reset button background color
          }
        });
      
        // reset tab bar buttons to default state
        document.getElementById("showAllTab").classList.add("active");
        document.getElementById("mainTab").classList.remove("active");
        document.getElementById("exploitsTab").classList.remove("active");
        document.getElementById("uiSettingsTab").classList.remove("active");
      
        // show all sections
        document.getElementById("automationSection").style.display = "block";
        document.getElementById("exploitsSection").style.display = "block";
        document.getElementById("uiSettingsSection").style.display = "block";
      
        // reset tab button background color to default as well
        document.getElementById("mainTab").style.backgroundColor = "#141421";
        document.getElementById("exploitsTab").style.backgroundColor = "#141421";
        document.getElementById("uiSettingsTab").style.backgroundColor = "#141421";
        document.getElementById("showAllTab").style.backgroundColor = "#141421";

        rainNotify("[CodeHS+]: Resetted settings and menu colors to default.");
    };

    // tab button click logic
    document.getElementById("mainTab").onclick = () => {
      document.getElementById("mainTab").classList.add("active");
      document.getElementById("exploitsTab").classList.remove("active");
      document.getElementById("uiSettingsTab").classList.remove("active");
      document.getElementById("showAllTab").classList.remove("active");

      document.getElementById("automationSection").style.display = "block";
      document.getElementById("exploitsSection").style.display = "none";
      document.getElementById("uiSettingsSection").style.display = "none";
    };

    document.getElementById("exploitsTab").onclick = () => {
      document.getElementById("mainTab").classList.remove("active");
      document.getElementById("exploitsTab").classList.add("active");
      document.getElementById("uiSettingsTab").classList.remove("active");
      document.getElementById("showAllTab").classList.remove("active");

      document.getElementById("automationSection").style.display = "none";
      document.getElementById("exploitsSection").style.display = "block";
      document.getElementById("uiSettingsSection").style.display = "none";
    };

    document.getElementById("uiSettingsTab").onclick = () => {
      document.getElementById("mainTab").classList.remove("active");
      document.getElementById("exploitsTab").classList.remove("active");
      document.getElementById("uiSettingsTab").classList.add("active");
      document.getElementById("showAllTab").classList.remove("active");

      document.getElementById("automationSection").style.display = "none";
      document.getElementById("exploitsSection").style.display = "none";
      document.getElementById("uiSettingsSection").style.display = "block";
    };

    // everything tab logic
    document.getElementById("showAllTab").onclick = () => {
      document.getElementById("mainTab").classList.remove("active");
      document.getElementById("exploitsTab").classList.remove("active");
      document.getElementById("uiSettingsTab").classList.remove("active");
      document.getElementById("showAllTab").classList.add("active");

      document.getElementById("automationSection").style.display = "block";
      document.getElementById("exploitsSection").style.display = "block";
      document.getElementById("uiSettingsSection").style.display = "block";
    };

    function whitelist() { // not super necessary anymore because I open sourced the cheat menu
      // https://codehs.com/student/7654321/section/246810/assignment/123456789 the userid here would be: 7654321 for example.
      const db = []; // put userid here (you can get userid from codehs) make empty if you want to whitelist everyone

      const currentUrl = window.location.href;
      const parsed = currentUrl.split('/');
      const userID = parsed[4]; // index 4 is where the user ID appears in the URL
      if (db.includes(userID) || db.length === 0) { // checks if the current userid is valid in the db
        return [true, userID];
      } else {
        return [false, userID];
      }
    }

    function checkKillswitch(url, choice) { // not super necessary anymore because I open sourced the cheat menu.
      fetch(url, { method: "GET" }) // checks if the cheat menu file on my github repo is still valid, if it is then dump the solution
        .then(response => {
          if (!response.ok) return;

          const contentType = response.headers.get('Content-Type') || '';
          const isWhitelisted = whitelist();

          if (isWhitelisted[0] && (contentType.includes('javascript') || contentType.includes('text/plain'))) {
            dump_solution(choice);
          }
          else if (isWhitelisted[0] === false) {
            rainNotify(`[CodeHS+]: ${isWhitelisted[1]} is not a whitelisted userID`);
          }
          else {
            rainNotify("[CodeHS+]: Sorry, the cheat menu has been killswitched by its owner");
          }
        });
    }

    // hooking cheat menu functionality to lib
    document.getElementById('codeblockBtn').onclick = () => { // https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/refs/heads/main/solution_decryptor.js
        // checkKillswitch("https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/refs/heads/main/Cheat%20Menu.js", 1); // 1 for codeblock
        dump_solution(1);
    };

    document.getElementById('clipboardBtn').onclick = () => {
        // checkKillswitch("https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/refs/heads/main/Cheat%20Menu.js", 2); // 2 for copy
        dump_solution(2);
    };

    document.getElementById('destroyBtn').onclick = () => {
        //checkKillswitch("https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/refs/heads/main/Cheat%20Menu.js", 3); // 3 for destroying codeblocks
        dump_solution(3);
    };

    // WIP: automation settings
    const autoSubmitCheckbox = document.getElementById('autoSubmit');
    const blockLogsCheckbox = document.getElementById('blockLogs');

    autoSubmitCheckbox.addEventListener('change', () => {
      if (autoSubmitCheckbox.checked) {
        rainNotify("[CodeHS+]: Sorry this feature has not yet been implemented.");
      }
    });

    blockLogsCheckbox.addEventListener('change', () => {
      if (blockLogsCheckbox.checked) {
        rainNotify("[CodeHS+]: Sorry this feature has not yet been implemented.");
      }
    });

    let submitDelaySlider = document.getElementById('submitDelay');

    submitDelaySlider.addEventListener('input', () => {
      if (autoSubmitCheckbox.checked) {
          rainNotify("[CodeHS+]: Sorry this feature has not yet been implemented.");
      }
    });

    let navBar = document.getElementsByClassName("collapse navbar-collapse");
    let node = navBar[0];
    
    if (node) {
      let btn = Object.assign(document.createElement("button"), {
        id: 'codehs-cheat-btn',  // unique ID for future access
        className: 'nav navbar-nav navbar-left'
      });
    
    node.insertBefore(btn, node.childNodes[0]);
    
    // cheat menu button css
    btn.innerHTML = "  Cheat Menu";
    btn.style = "position: absolute";
    btn.style = "margin-left: auto";
    btn.style.height = '60px';
    btn.style.width = '110px';
    btn.style.border = 'none';
    btn.style.fontWeight = 'bold';
    btn.style.fontSize = '11.5px';
    btn.style.background = 'none';
    
    // cheat menu button hovering logic
    btn.addEventListener("mouseenter", function( event ) {
       event.target.style.background = "#20a6df";
     }, false);
     btn.addEventListener("mouseleave", function( event ) {
       event.target.style.background = "white";
     }, false);
    
     btn.addEventListener("mouseenter", function( event ) {
      event.target.style.background = "#20a6df";  // change background color
      event.target.style.color = "white";          // change text color to white
    }, false);
    
    btn.addEventListener("mouseleave", function( event ) {
      event.target.style.background = "white";    // revert background color to white
      event.target.style.color = "#28384A";         // revert text color back to black
    }, false);
    
    function initUI(){
        const gui = document.querySelector('.project-rain-gui');
        
        // if visible, hide else show
        if (gui.style.display == 'none' || gui.style.display == '') {
            gui.style.display = 'block';
        } else {
            gui.style.display = 'none';
        }
    }
    
    btn.onclick = () => {
       initUI();
      }
    }

    document.onmousedown = function(e) {
        e = e || window.event;
        var key = e.which || e.keyCode;
    
        if (e.button === 1) { // middle click
            // destroy the cheat menu button
            e.preventDefault(); // prevent autoscroll
            const cheatBtn = document.getElementById("codehs-cheat-btn");
            if (cheatBtn) {
                cheatBtn.remove();
            }
    
            // completely destroy the project rain menu
            const gui = document.querySelector('.project-rain-gui');
            if (gui) {
                gui.remove();
            }
    
            // remove any code blocks generated
            const codeblocks = document.querySelectorAll('pre > code');
            codeblocks.forEach(code => {
                if (code.textContent.includes("The following code was generated using CodeHS+")) {
                    const pre = code.parentElement;
                    pre.remove();
                }
            });
    
            // destroy all active notifications
            activeNotifs.forEach(notif => notif.remove());
            activeNotifs.length = 0;
    
            // clear the dev console
            console.clear();
        }
    };

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
          if (choice == 2){
              decrypted = decrypted.replace(/\\n/g, '\n');  // replace \n with an actual new line
              var parsed_decrypted = decrypted.replace(/\\/g, '');
              if (parsed_decrypted.length < 1){
                parsed_decrypted += "[CodeHS+]: Error, no solution was resolved. Are you trying to run this on an example and not an assignment?";
              }
              //console.log(parsed_decrypted);
                navigator.clipboard.writeText(parsed_decrypted);
                rainNotify("[CodeHS+]: Answer has been copied to clipboard! Don't directly paste the code into the CodeHS IDE, it will be suspicious.");
          }
          else if (choice == 1){
            (async () => {
              const targetDiv = document.querySelector('#panels > div.t > div:nth-child(4) > div');
              
              decrypted = decrypted.replace(/\\n/g, '\n').replace(/\\"/g, '"');
              var codeString = `The following code was generated using CodeHS+\n\n${decrypted}`;
              if (decrypted.length < 1) {
                codeString += "No solution was resolved.\nAre trying to run this on an example\nand not an assignment?";
              }
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
              rainNotify("[CodeHS+]: Answer dumped to codeblock. Don't copy and paste, read it and type it in your IDE.");
          })();
        } else if (choice == '3') { // destroy codeblocks
            const codeblocks = document.querySelectorAll('pre > code');
            let removedAny = false; // prevent no codeblocks found notif from running a ton of times since its in a foreach loop
        
            codeblocks.forEach(code => {
                if (code.textContent.includes("The following code was generated using CodeHS+")) {
                    const pre = code.parentElement;
                    pre.remove(); // remove pre tag
                    removedAny = true;
                }
            });
        
            if (removedAny) {
                rainNotify("[CodeHS+]: Destroyed all codeblocks.");
            } else {
                rainNotify("[CodeHS+]: No codeblocks found.");
            }
        }
        })
    }
})(); // Close devtools after running this in console.