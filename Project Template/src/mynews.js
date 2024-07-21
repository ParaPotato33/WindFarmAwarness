//import Splide
import Splide from 'https://cdn.jsdelivr.net/npm/@splidejs/splide@3.6.11/dist/js/splide.esm.js';

//listen for a new slide to be added
document.addEventListener('DOMContentLoaded', function() {
    const splide = new Splide( '#splide', {
        //type: 'loop',
        perPage: 2,
        arrows: true,
        pagination: true,
    }).mount();

        //wait for the page to load
        window.addEventListener('load', async function () {
            var news = await fetch('/src/database.json')
            .then(response => response.json())
            .then(data => data.news);
            //.then(data => console.log(data));

            
            //open the users data
            var users = await fetch('/src/users.json')
            .then(response => response.json())
            .then(data => data.users);

            //get the current url
            var url = new URL(window.location.href);
            
            //get the users name from the url
            for (var i = 0; i < users.length; i++) {
                if (users[i].username == url.searchParams.get("username")) {
                    var user = users[i];
                }
            }

            //get the users filters
            var filters = user.filters;

            //loop through the news and filters
            for (var i = 0; i < news.length; i++) {
                for (var j = 0; j < filters.length; j++) {
                    //if the news has a filter that the user has
                    if (news[i].catagories.includes(filters[j])) {
                        //create a new slide
                        var carousel = document.getElementById('news-list');
                        var slide = document.createElement('li');
                        if (i <= 9) {
                            slide.id = 'splide-slide0' + (i);
                        }
                        else {
                            slide.id = 'splide-slide' + (i);
                        }
                        //add the data to the slide
                        slide.classList.add('splide__slide');
                        slide.style = 'width: calc(100%);'
                        var description = news[i].description;
                        //crop the text if it is too long
                        if (description.length > 700) {
                            description = description.substring(0, 600) + '...';
                        }
                        //add the html to the slide
                        slide.innerHTML = '<div style="background-image: url(' + news[i].img + '); background-size: cover; height: 440px; padding: 10px;"> <div style="background-color: rgb(200, 200, 200); margin: 10px 10px;"><h1>' + news[i].title + '</h1><h3>Development: ' + news[i].development + '</h3><h3 style="float: left; height: 400px">Description: </h3><h3>' + description + '</div></div>';
                        //add the slide to the carousel
                        carousel.appendChild(slide);
                        break;
                    }
                }
            
            }
            //refresh the carousel
            splide.refresh();
      });
});