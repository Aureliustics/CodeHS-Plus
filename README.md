<h1>CodeHS Plus</h1>
<h3>Adds general utility and quality of life to CodeHS. Currently the only features are saving sandbox links to collaborate on CodeHS easier, showing assignment answers in a codeblock or printing it to console. The cheat menu is built with stealth in mind. There is a self destruct button (press left alt to activate) to destroy cheat menu and codeblock. This makes it harder to get caught by teachers.</h3>

<h1>Installation</h1>
<ul>
  <li>To run this script, you need to install Tampermonkey</li>
  <li>Install Tampermonkey <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en" target="_blank">here</a></li>
  <li>Click on the Tampermonkey extensions icon once installed and press "Dashboard"</li>
  <li>Click the + icon to the left of "Installed Userscripts"</li>
  <li>If you want to have updates to come with your install (recommended), replace the initial code with the following: </li>

```js
// ==UserScript==
// @name         CodeHS+
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Adds general utility and quality of life to CodeHS.
// @author       Aureliustics
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codehs.com
// @match        https://codehs.com/sandbox*
// @match        https://codehs.com/student/*/section/*/assignment/*
// @grant        GM_setValue
// @grant        GM_getValue
// @grant        GM_xmlhttpRequest
// @require      https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/refs/heads/main/main.js
// ==/UserScript==
```
  <li>If you <b>don't</b> want updates to come with your install, simiply replace the initial code with the <a href="https://github.com/Aureliustics/CodeHS-Plus/blob/main/main.js" target="_blank">script</a></li>
  <li>Go to <a href="https://codehs.com/" target="_blank">CodeHS</a> and make sure the script is running. You should see a red (1) icon on the Tampermonkey icon.</li>
</ul>

<h1>Usage</h1>
<ul>
  <li>Navigate to https://codehs.com/sandbox</li>
  <li>Create, rename, delete, or copy link for sandboxes you save.</li>
  <li>When doing an assignment, you should see a new button next to the CodeHS logo on the top left.</li>
  <li>It is called "Cheat Menu". Clicking on it will show you the features.</li>
</ul>
<h1>Known Bugs</h1>
<ul>
  <li>If either the Cheat menu or saved links UI is not showing up, refresh the page. This usually happens because Tampermonkey doesn't reinject upon subdomain changes.</li>
  <li>Running print answer to console whilst the dev console is open, will pause you in debugger. I know it's stupid, just a side effect from obfuscation. Print to console before opening the console.</li>
</ul>
<h1>Disclaimer</h1>
<b>I am not responsible if you get caught using the cheat option aswell as any damages that may occur during usage. CodeHS has anticheating measures in place, and I cannot promise that the cheat is undetected.</b>
<li>Below is a dumped result of CodeHS's anticheat flags so you can understand how to circumvent it:</li>

```js
CheatFlagType: {
                CHEAT_TOOL_DETECTED: 6,
                CHOICES: [[0, "None"], [1, "Not Enough Time Spent"], [2, "Insufficent History"], [3, "Copy and Pasted"], [4, "Similarity to Solution"], [5, "Similarity to Student"], [6, "Cheat Tool Detected"]],
                COPY_AND_PASTED: 3,
                INSUFFICENT_HISTORY: 2,
                NONE: 0,
                NOT_ENOUGH_TIME_SPENT: 1,
                SIMILARITY_TO_SOLUTION: 4,
                SIMILARITY_TO_STUDENT: 5,
                STRINGS: {
                    0: "None",
                    1: "Not Enough Time Spent",
                    2: "Insufficent History",
                    3: "Copy and Pasted",
                    4: "Similarity to Solution",
                    5: "Similarity to Student",
                    6: "Cheat Tool Detected"
                }
            }
```
<li>Make sure you aren't just copy pasting the answer into your IDE. Instead manually type out the answer with different variable names, function names, and running the code frequently to have code history. I might implement some anticheat bypasses in the future but for now, stay vigilant when using the cheat.</li>
<li>If you are trying to get answers to a quiz, the cheat menu will currently not do that for you. If you want CodeHS quiz answers refer to these repositories: <a href="https://github.com/aditeyapatakoti/CodeHS-IntroIntoPython/tree/main" target="_blank">python</a> <a href="https://github.com/aditeyapatakoti/CodeHS-IntroIntoJavascript" target="_blank">javascript</a>.</li>
