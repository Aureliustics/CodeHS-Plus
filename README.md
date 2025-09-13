<h1>CodeHS Plus</h1>
<img src="https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/main/Screenshots/Screenshot_1.png" alt="Main UI and codeblock"/>
<img src="https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/main/Screenshots/Screenshot_2.png" alt="Notifications"/>
<img src="https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/46925fc3719fa2008a4722b353e3c14b5de24cb3/Screenshots/Screenshot_3.png" alt="Saved Links">
<h3>Adds general utility and quality of life to CodeHS. Currently the only features are saving sandbox links to collaborate on CodeHS easier, showing assignment answers in a codeblock or copying to clipboard, some color customization to the cheat menu, displaying the amount of time you spent in a sandbox. The cheat menu is built with stealth in mind. There is a self destruct button (middle click to activate) to destroy cheat menu and codeblock. This makes it harder to get caught by teachers. If you like this repository, a star would be greatly appreciated, thank you. </h3>
<h1>Installation</h1>
<ul>
  <h3>
    Method 1: Lazy
  </h3>
  <li>If you just want to cheat on your assignments without installing anything:</li>
  <li>Copy the cheat menu script <a href="https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/refs/heads/main/Cheat%20Menu.js" target="_blank">here</a>, control + A then control + C on your keyboard</li>
  <li>Go to your CodeHS assignment and right click, click inspect then navigate to the "Console" at the top of inspect element</li>
  <li>Type "allow pasting" into the console then press enter</li>
  <li>Control + V to paste the cheat menu script then enter and you should have the cheat</li>
  <li>The only caveat with this installion method is you have to keep pasting the script into the console for every assignment or refresh, so its better to do method 2.</li>
</ul>
<ul>
  <h3>
    Method 2: Proper
  </h3>
  <li>You need the Tampermonkey extension for the cheat menu and misc CodeHS+ features to load automatically.</li>
  <li>Install Tampermonkey <a href="https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en" target="_blank">here</a></li>
  <li>Make sure you enabled developer mode in chrome extensions, and gave UserScript access to Tampermonkey (right click icon -> "Manage extension")</li>
  <li>Click on the Tampermonkey extensions icon once installed and press "Dashboard"</li>
  <li>Click the + icon to the left of "Installed Userscripts"</li>
  <li>If you want to have updates to come with your install (recommended), replace the initial code with the following: </li>

```js
// ==UserScript==
// @name         CodeHS+
// @namespace    http://tampermonkey.net/
// @version      2.0
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
  <li>If you <b>don't</b> want updates to come with your install, simiply paste this <a href="https://github.com/Aureliustics/CodeHS-Plus/blob/main/main.js" target="_blank">script</a> into tampermonkey instead.</li>
  <li>Go to <a href="https://codehs.com/" target="_blank">CodeHS</a> and make sure the script is running. You should see a red (1) icon on the Tampermonkey icon.</li>
</ul>

<h1>Usage</h1>
<ul>
  <li>Navigate to https://codehs.com/sandbox</li>
  <li>Create, rename, delete, or copy link for sandboxes you save.</li>
  <li>When doing an assignment, you should see a new button next to the CodeHS logo on the top left.</li>
  <li>It is called "Cheat Menu". Clicking on it will toggle the menu</li>
  <li>When are you in a sandbox, it will display the amount of time you have spent inside of it in real time. This does save and sync across tabs.</li>
</ul>
<h1>Known Bugs</h1>
<ul>
  <li>If either the Cheat menu or saved links UI is not showing up, refresh the page. This usually happens because Tampermonkey doesn't reinject upon subdomain changes.</li>
  <li>You might notice some buttons and text be affected by the CSS in the cheat menu aka they will have the same color. It's an easy fix but it isn't super severe so I might just leave it for now.</li>
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
<li>If you are trying to get answers to a quiz, the cheat menu will currently not do that for you. If you want CodeHS quiz answers refer to these repositories: <a href="https://github.com/aditeyapatakoti/CodeHS-IntroIntoPython/tree/main" target="_blank">python</a>, <a href="https://github.com/aditeyapatakoti/CodeHS-IntroIntoJavascript" target="_blank">javascript</a>, <a href="https://github.com/terrasky064/codehs-terrasky064-java-answers" target="_blank">java</a></li>
