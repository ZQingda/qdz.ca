window.onload = function() {

    //console.log('Loaded CSS script');
    var sidebar = document.getElementById('menu-sidebar')
    var navLinks = document.getElementsByClassName('nav-link');
    var logo = document.getElementById('logo');

    logo.addEventListener('click', function(e) {
        e.preventDefault();
        sidebar.classList.remove('sidebar-open');
        sidebar.classList.add('sidebar-close');
        window.setTimeout(() => {
            console.log(e.target);
            window.location.href = '/main';
        }, 250)
    });

    Array.prototype.map.call(navLinks, (link, index) => {

        link.addEventListener('click', function(e) {
            e.preventDefault();
            sidebar.classList.remove('sidebar-open');
            sidebar.classList.add('sidebar-close');
            window.setTimeout(() => {
                var link = e.target.href;
                window.location.href = link;
            }, 250)
        });

    });
}