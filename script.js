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

document.getElementById('ai-assist-sidebar').addEventListener('click', function (e) {
    e.preventDefault(); // Prevents the default anchor behavior
    const userQuery = prompt("What type of certification are you looking for?");
    
    if (userQuery) {
        fetch('https://api.openai.com/v1/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer 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` // Replace with your OpenAI API key
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: `Recommend a certification for someone who wants to specialize in ${userQuery}`,
                max_tokens: 100
            })
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('ai-response').innerText = 'Suggested Certifications: ' + data.choices[0].text.trim();
        })
        .catch(error => {
            document.getElementById('ai-response').innerText = 'Error: ' + error.message;
        });
    }
});

