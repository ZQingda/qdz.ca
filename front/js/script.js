window.onload = function () {

    //console.log('Loaded CSS script');
    var sidebar = document.getElementById('menu-sidebar')
    var navLinks = document.getElementsByClassName('nav-link');
    var logo = document.getElementById('logo');

    var tagView = document.getElementById('tag-view');
    var albumView = document.getElementById('album-view');

    var catalogView = document.getElementById('catalog');
    
    var homeRightCover = document.getElementById('right-cover');

    logo.addEventListener('click', function (e) {
        e.preventDefault();
        
        addLinkClickListeners();

        window.setTimeout(() => {
            console.log(e.target);
            window.location.href = '/main';
        }, 400)
    });

    Array.prototype.map.call(navLinks, (link, index) => {

        link.addEventListener('click', function (e) {
            e.preventDefault();

            addLinkClickListeners();
            
            window.setTimeout(() => {
                var link = e.target.href;
                window.location.href = link;
            }, 400)
        });

    });

    function addLinkClickListeners() {
        if (albumView) {
            albumView.classList.remove('album-view-in');
            albumView.classList.add('album-view-out');
    
        }
        if (tagView) {
            tagView.classList.remove('tag-view-in');
            tagView.classList.add('tag-view-out');
        }
    
        if (catalogView) {
            catalogView.classList.remove('catalog-in');
            catalogView.classList.add('catalog-out');
        }
    
        if (homeRightCover) {
            homeRightCover.classList.remove('right-cover-out');
            homeRightCover.classList.add('right-cover-in');
        }
    };
}

