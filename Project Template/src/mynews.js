import Splide from 'https://cdn.jsdelivr.net/npm/@splidejs/splide@3.6.11/dist/js/splide.esm.js';

document.addEventListener('DOMContentLoaded', function() {
    const splide = new Splide( '#splide', {
        //type: 'loop',
        perPage: 2,
        arrows: true,
        pagination: true,
    }).mount();


        window.addEventListener('load', async function () {
            var news = await fetch('/src/database.json')
            .then(response => response.json())
            .then(data => data.news);
            //.then(data => console.log(data));

            

            var users = await fetch('/src/users.json')
            .then(response => response.json())
            .then(data => data.users);

            var url = new URL(window.location.href);

            for (var i = 0; i < users.length; i++) {
                if (users[i].username == url.searchParams.get("username")) {
                    var user = users[i];
                }
            }

            var filters = user.filters;

            for (var i = 0; i < news.length; i++) {
                for (var j = 0; j < filters.length; j++) {
                    if (news[i].catagories.includes(filters[j])) {
                        var carousel = document.getElementById('news-list');
                        var slide = document.createElement('li');
                        if (i <= 9) {
                            slide.id = 'splide-slide0' + (i);
                        }
                        else {
                            slide.id = 'splide-slide' + (i);
                        }
                        slide.classList.add('splide__slide');
                        slide.style = 'width: calc(100%);'
                        var description = news[i].description;
                        if (description.length > 700) {
                            description = description.substring(0, 600) + '...';
                        }
                        slide.innerHTML = '<div style="background-image: url(' + news[i].img + '); background-size: cover; height: 440px; padding: 10px;"> <div style="background-color: rgb(200, 200, 200); margin: 10px 10px;"><h1>' + news[i].title + '</h1><h3>Development: ' + news[i].development + '</h3><h3 style="float: left; height: 400px">Description: </h3><h3>' + description + '</div></div>';
                        carousel.appendChild(slide);
                        break;
                    }
                }
            
            }
            splide.refresh();
      });
});