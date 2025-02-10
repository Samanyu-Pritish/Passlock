document.addEventListener("DOMContentLoaded", function () {
    const numberInput = document.getElementById("number");
    const usernameInput = document.querySelector("input[name='username']");
    const useName = document.getElementById("name");
    const useUppercase = document.getElementById("Uppercase");
    const useLowercase = document.getElementById("Lowercase");
    const useSymbols = document.getElementById("Symbols");
    const generateButton = document.querySelector("button");
    
    const output = document.createElement("p");
    output.style.fontSize = "18px";
    output.style.fontWeight = "bold";
    output.style.marginTop = "20px";
    document.body.appendChild(output);
    
    // Manage Section
    const manageSection = document.createElement("div");
    manageSection.innerHTML = "<h2>Saved Passwords</h2><ul id='passwordList'></ul>";
    document.body.appendChild(manageSection);
    const passwordList = document.getElementById("passwordList");
    
    function generatePassword() {
        const length = parseInt(numberInput.value) || 8;
        const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
        const symbolChars = "!@#$%^&*()_+[]{}|;:,.<>?/";
        let allChars = "0123456789";
        
        if (useUppercase.checked) allChars += uppercaseChars;
        if (useLowercase.checked) allChars += lowercaseChars;
        if (useSymbols.checked) allChars += symbolChars;

        if (!useUppercase.checked && !useLowercase.checked && !useSymbols.checked) {
            output.textContent = "Please select at least one character type!";
            return;
        }

        let password = "";
        for (let i = 0; i < length; i++) {
            password += allChars[Math.floor(Math.random() * allChars.length)];
        }
        
        if (useName.checked && usernameInput.value.trim()) {
            password = usernameInput.value.trim() + password;
        }
        
        output.textContent = "Generated Password: " + password;
        savePassword(password);
    }
    
    function savePassword(password) {
        const listItem = document.createElement("li");
        listItem.textContent = password;
        
        // Copy button
        const copyButton = document.createElement("button");
        copyButton.textContent = "Copy";
        copyButton.style.marginLeft = "10px";
        copyButton.onclick = function () {
            navigator.clipboard.writeText(password);
            alert("Password copied to clipboard!");
        };
        
        // Delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";
        deleteButton.onclick = function () {
            listItem.remove();
        };
        
        listItem.appendChild(copyButton);
        listItem.appendChild(deleteButton);
        passwordList.appendChild(listItem);
    }
    
    generateButton.addEventListener("click", generatePassword);
});
