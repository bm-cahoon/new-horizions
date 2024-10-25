document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('.content-section');
    const links = document.querySelectorAll('#sidebar ul li a');

    // Hide all sections except the first one
    sections.forEach((section, index) => {
        if (index === 0) {
            section.style.display = 'block';
            section.classList.add('active');
        } else {
            section.style.display = 'none';
        }
    });

    // Add event listeners to sidebar links
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const target = this.getAttribute('data-target');
            sections.forEach(section => {
                if (section.id === target) {
                    section.style.display = 'block';
                    section.classList.add('active');
                } else {
                    section.style.display = 'none';
                    section.classList.remove('active');
                }
            });

            // Handle AI Assistant pop-up
            if (target === 'chat') {
                startChat();
            }
        });
    });

    function startChat() {
        const userMessage = prompt("What certification are you interested in?");
        if (userMessage) {
            sendMessageToChatGPT(userMessage);
        }
    }

    function sendMessageToChatGPT(message) {
        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message }),
        })
        .then(response => response.json())
        .then(data => {
            alert(`ChatGPT: ${data.reply}`);
        })
        .catch(error => {
            console.error('Error communicating with ChatGPT:', error);
            alert('Error communicating with ChatGPT');
        });
    }
});

document.getElementById('ai-assist-sidebar').addEventListener('click', function (e) {
    e.preventDefault();

    const userQuery = prompt("What type of certification are you looking for?");

    if (userQuery) {
        fetch(`/api/certification?q=${userQuery}`)
            .then(response => response.json())
            .then(data => {
                document.getElementById('ai-response').innerText = 'Suggested Certifications: ' + data.suggestions;
            })
            .catch(error => {
                document.getElementById('ai-response').innerText = 'Error: ' + error.message;
            });
    }
});


