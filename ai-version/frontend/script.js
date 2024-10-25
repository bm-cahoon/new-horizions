document.addEventListener('DOMContentLoaded', function () {
    // Get all the links in the sidebar
    const links = document.querySelectorAll('#sidebar ul li a');

    // Loop over each link and add a click event listener
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
            });

            // Remove the 'active' class from all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.classList.remove('active');
            });

            // Show the selected section and add the 'active' class
            const target = this.getAttribute('data-target');
            document.getElementById(target).style.display = 'block';
            document.getElementById(target).classList.add('active');
        });
    });

    // Set default active section (optional)
    document.getElementById('vision').style.display = 'block';
    document.getElementById('vision').classList.add('active');
});

document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chat-form');
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');

    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const userMessage = userInput.value;
        addMessage('You', userMessage);
        userInput.value = '';

        const response = await fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        addMessage('ChatGPT', data.reply);
    });

    function addMessage(sender, text) {
        const messageElement = document.createElement('p');
        messageElement.classList.add(sender.toLowerCase());
        messageElement.textContent = `${sender}: ${text}`;
        chatBox.appendChild(messageElement);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
});
