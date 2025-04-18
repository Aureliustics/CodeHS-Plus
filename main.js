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
// ==/UserScript==

(function () {
    'use strict';

    const link_icon = "https://cdn-icons-png.flaticon.com/512/6994/6994770.png"; // link icon image sniped off of google

    // since codehs doesnt load all elements instantly, we will use a mutation observer to wait for an element to appear before trying to append to it. otherwise you might get null cuz not loaded
    function waitForElement(selector, callback) {
        const observer = new MutationObserver(() => {
            const element = document.querySelector(selector);
            if (element) {
                observer.disconnect();  // if found then stop observing
                callback(element);           // callback with the found element
            }
        });
        observer.observe(document.body, { childList: true, subtree: true });
    }

    if (window.location.href.match(/https:\/\/codehs\.com\/student\/.*\/section\/.*\/assignment\/.*/)) {
        // Obfuscated to protect the code from reverse engineering
        GM_xmlhttpRequest({
            method: "GET",
            url: "https://raw.githubusercontent.com/Aureliustics/CodeHS-Plus/refs/heads/main/solution_decryptor.js", // Correct raw URL format
            onload: function(response) {
                const script = document.createElement('script');
                script.textContent = response.responseText;
                document.body.appendChild(script);
            },
            onerror: function(err) {
                console.error("Failed to load external script:", err);
            }
        });
    }

    waitForElement('.sandbox-program-container', async function (programSection) { // wait for the sandbox program container
        let savedLinks = await GM_getValue("savedLinks", []); // using await makes it so it finishes getting value before moving on
        // trying to make the css look like codehs
        const wrapper = document.createElement("div");
        wrapper.className = "row";
        const container = document.createElement("div");
        container.className = "sandbox-program-container";
        container.style = "margin-top: 20px;";
        const header = document.createElement("div");
        header.className = "header";
        header.style = "display: flex; justify-content: space-between; align-items: center;";
        const title = document.createElement("h3");
        title.className = "header-title";
        title.textContent = `Saved Links (${savedLinks.length})`;  // use .length to count the amount of links
        const inputField = document.createElement("div");
        inputField.style = "display: flex; align-items: center; gap: 10px;";
        inputField.innerHTML = `
            <input type="text" placeholder="Name" id="linkName" style="padding:5px; width: 150px;">
            <input type="url" placeholder="https://codehs.com/sandbox/..." id="linkURL" style="padding:5px; width: 250px;">
            <button id="createButton" style="padding:5px 10px;">Create</button>
        `;

        header.appendChild(title);
        header.appendChild(inputField);
        container.appendChild(header);

        // codehs table format
        const table = document.createElement("table");
        table.className = "sandbox-table table-dark";
        table.style = "width: 100%; table-layout: fixed;";
        table.innerHTML = `
            <thead style="background-color: #26a9e0; color: white; height: 30px;">
                <tr>
                    <th class="name-col" style="width: 30%; text-indent: 5px; font-size: 15px;">Name</th>
                    <th style="width: 15%; font-size: 15px; text-indent: 175px;">Type</th>
                    <th style="width: 25%; font-size: 15px; text-indent: 235px;">Created</th>
                    <th style="width: 25%; font-size: 15px; text-indent: 130px;">Updated</th>
                    <th style="width: 5%; font-size: 15px;" text-indent: 130px;></th>
                </tr>
            </thead>
            <tbody id="savedLinksBody"></tbody>
        `; // i hate and html css sm bruh

        container.appendChild(table);
        wrapper.appendChild(container);

        // injecting the mimic codehs ui back into its parent
        programSection.parentNode.insertBefore(wrapper, programSection);

        const tbody = table.querySelector("#savedLinksBody");

        function renderLinks() { // to display the saved links
            tbody.innerHTML = ""; // clear rows
            title.textContent = `Saved Links (${savedLinks.length})`; // $ is essentially just an fstring in python

            savedLinks.forEach((link, index) => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td class="name-col" style="word-wrap: break-word;">
                        <img src="${link_icon}" style="width: 20px; height: 20px; margin: 0 8px 0 5px; vertical-align: middle;">
                        <a href="${link.url}" target="_blank">${link.name}</a>
                    </td>
                    <td style = "text-indent: 180px;">Link</td>
                    <td style = "text-indent: 235px;">${link.created}</td>
                    <td style = "text-indent: 130px;">${link.updated}</td>
                    <td style="position: relative;">
                        <div class="dropdown-trigger" style="cursor: pointer; font-weight: bold; font-size: 20px; padding: 0 8px;">...</div>
                        <div class="link-dropdown" style="display: none; position: absolute; right: 0; background: #1e1e2f; color: white; border-radius: 5px; box-shadow: 0 2px 8px rgba(0,0,0,0.3); z-index: 999;">
                            <div class="dropdown-item" click_action="rename">Rename</div>
                            <div class="dropdown-item" click_action="delete">Delete</div>
                            <div class="dropdown-item" click_action="copy">Copy Link</div>
                        </div>
                    </td>
                `;

                const trigger = row.querySelector(".dropdown-trigger");
                const menu = row.querySelector(".link-dropdown");

                trigger.addEventListener("click", (event) => { // detect when clicking the dropdown menu icon
                    event.stopPropagation(); // prevent trigging other things when clicking
                    document.querySelectorAll(".link-dropdown").forEach(dropdownItem => dropdownItem.style.display = "none");
                    menu.style.display = "block";
                });

                document.addEventListener("click", () => { // when clicking elsewhere, hide dropdown
                    menu.style.display = "none";
                });

                menu.querySelectorAll(".dropdown-item").forEach(dropdown => {
                    dropdown.style.padding = "8px 12px";
                    dropdown.style.cursor = "pointer";
                    dropdown.style.background = "#ffffff"; // background colour
                    dropdown.style.color = "black"; // text colour

                    dropdown.addEventListener("mouseenter", () => {
                        dropdown.style.background = "#f2f2f2"; // light grey background on hover
                    });
                
                    // turn back white when mouse hovers off
                    dropdown.addEventListener("mouseleave", () => {
                        dropdown.style.background = "#ffffff"; // back to original white
                    });
                    //item.addEventListener("mouseleave", () => item.style.background = "transparent");

                    dropdown.addEventListener("click", async () => {
                        const action = dropdown.getAttribute("click_action");

                        if (action === "rename") {
                            const newName = prompt("Enter a new name:", link.name);
                            if (newName) {
                                link.name = newName;
                                link.updated = new Date().toLocaleDateString("en-US");
                                await GM_setValue("savedLinks", savedLinks);
                                renderLinks();
                            }
                        }

                        else if (action === "delete") {
                            savedLinks.splice(index, 1); // Remove the link
                            await GM_setValue("savedLinks", savedLinks);
                            renderLinks();
                        }

                        else if (action === "copy") {
                            navigator.clipboard.writeText(link.url); // copy to link to clipboard
                            alert("[CodeHS+]: Link copied to clipboard!");
                        }
                    });
                });

                tbody.appendChild(row); // add row to table
            });
        }

        renderLinks();

        document.getElementById("createButton").addEventListener("click", async () => { // when clicked, 
            const name = document.getElementById("linkName").value.trim();
            const url = document.getElementById("linkURL").value.trim();
            if (!name || !url) {
                alert("[CodeHS+]: Both name and URL are required.");
            } 
            
            else {
                const today = new Date().toLocaleDateString("en-US");
                const newLink = { name, url, created: today, updated: today };

                savedLinks.push(newLink); // append to list/array using .push (equvilant to .append)
                await GM_setValue("savedLinks", savedLinks); // save value to gm
                renderLinks(); // refresh after adding a new link
                document.getElementById("linkName").value = ""; // clear input fields after entering
                document.getElementById("linkURL").value = "";
        }});
    });
})();
