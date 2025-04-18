<h1>CodeHS Plus</h1>
<h3>Adds general utility and quality of life to CodeHS. Currently the only features are saving sandbox links to collaborate on CodeHS easier, and copying assignment solution code to clipboard.</h3>

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
  <li>When doing an assignment, you should see a new button next to the CodeHS logo on the top right.</li>
  <li>It is called "Cheat Menu". Clicking on it will allow you to copy any assignments answer code to your clipboard.</li>
</ul>
