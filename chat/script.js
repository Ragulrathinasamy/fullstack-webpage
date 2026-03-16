// Load messages from localStorage on startup
window.onload = displayMessages;

function sendMessage() {
    const user = document.getElementById('userInput').value || "Guest";
    const msg = document.getElementById('msgInput').value;

    if (msg.trim() === "") return;

    const chatData = { user, msg, time: new Date().toLocaleTimeString() };

    // Get existing messages or create new array
    let messages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    messages.push(chatData);

    // Save back to localStorage
    localStorage.setItem('chatHistory', JSON.stringify(messages));

    document.getElementById('msgInput').value = "";
    displayMessages();
}

function displayMessages() {
    const chatBox = document.getElementById('chatBox');
    const messages = JSON.parse(localStorage.getItem('chatHistory')) || [];
    
    chatBox.innerHTML = messages.map(m => `
        <div class="msg ${m.user === document.getElementById('userInput').value ? 'sent' : 'received'}">
            <small><b>${m.user}</b></small><br>${m.msg}
        </div>
    `).join('');

    chatBox.scrollTop = chatBox.scrollHeight; // Auto-scroll to bottom
}

function clearChat() {
    localStorage.removeItem('chatHistory');
    displayMessages();
}
