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
