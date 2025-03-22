document.addEventListener('DOMContentLoaded', function () {
    // Get all the links in the top nav
    const links = document.querySelectorAll('#topnav ul li a');

    // Loop over each link and add a click event listener
    links.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Hide all sections
            document.querySelectorAll('.content-section').forEach(section => {
                section.style.display = 'none';
                section.classList.remove('active');
            });

            // Show the selected section and add the 'active' class
            const target = this.getAttribute('data-target');
            const section = document.getElementById(target);
            if (section) {
                section.style.display = 'block';
                section.classList.add('active');
            }
        });
    });

    // Set default active section
    const defaultSection = document.getElementById('vision');
    if (defaultSection) {
        defaultSection.style.display = 'block';
        defaultSection.classList.add('active');
    }
});
