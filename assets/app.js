var datalist = [
    { /* --- Done --- */
        name:'Orbit',
        desc:'3D tech demo',
        date:'May 3rd 2017',
        src :'assets/img/orbit.png',
        quote:'A Three.js 3D tech demo',
        filler:['Orbit is a solarsystem simulation project in JavaScript built with the Three.js library, which extends the regular canvas element to make use of the computers GPU.',
		'This means that a couple hundred objects can be rendered in three dimensions at 60 frames per second with relative ease. This project demonstrates this rendering capacity, and shows what can be accomplished with a modern web browser.'],
        technologies:['JavaScript', 'Three.js'],
        projectImgOne:'assets/img/orbit-web.png',
        projectImgTwo:'assets/img/orbit-mobile.png',
        href: 'pages/orbit'
    },
    { /* --- Done --- */
        name:'Firebase Chat',
        desc:'Database chat application.',
        date:'March 2017',
        src :'assets/img/firebasechat.png',
        quote:'A database chat application.',
        filler:['Firebase Chat is a chat application built for Googles Firebase Database-as-a-service. It is a live chat application that you can log in to. The best way for you to experience it is to just check it out. ^^'],
        technologies:['HTML5 + Materialize', 'CSS3', 'JavaScript & Firebase'],
        projectImgOne:'assets/img/firebasechat-web.png',
        projectImgTwo:'assets/img/firebasechat-mobile.png',
        href: 'pages/firebasechat'
    },
    { /* --- Done --- */
        name:'Booklist',
        desc:'Book list application.',
        date:'March 2017',
        src :'assets/img/booklist.png',
        quote:'A list for all your books.',
        filler:['A JavaScript proof-of-concept, like a to-do-list, can be used to store book titles and their authors. Connected to a database to store data, uses localstorage to store current API key and contains an ability to fetch random books from the Google Books API.'],
        technologies:['HTML5 + Materialize', 'CSS3 & Animations', 'JavaScript + AJAX', 'APIS: GoogleBooks', 'Database' ],
        projectImgOne:'assets/img/booklist-web.png',
        projectImgTwo:'assets/img/booklist-mobile.png',
        href: 'pages/booklist'
    },
	{ /* --- Done --- */
        name:'Pick',
        desc:'Application for people who does not know where to go.',
        date:'March 2017',
        src :'assets/img/pick.png',
        quote:'Take the quiz to know where you should go.',
        filler:['Pick is a travel app that uses a questionnaire to determine what country you should travel to. My contribution was mainly the JavaScript get country functions and search algorithms, working as a Scrum master in the project.',
        		'Collaborated together with Christina, Imran, Klara and Mona.'],
        technologies:['HTML5 + BootStrap', 'CSS', 'UX/UI(Balsamiq Mockups,PhotoShop)', 'JavaScript + AJAX', 'APIS: MediaWiki, FourSquare, Pixabay, Google Maps, OpenWeatherMap' ],
        projectImgOne:'assets/img/pick-web.png',
        projectImgTwo:'assets/img/pick-mobile.png',
        href: 'pages/pick'
    },
    { /* --- Done --- */
        name:'Astrocy',
        desc:'Astronomy webshop built as part of a graphics and user-interface course.',
        date:'January 2017',
        src :'assets/img/astrocy.png',
        quote:'Exploration cause curiosity - curiosity brings value',
        filler:['Astrocy is an astronomy webshop build as part of a graphics- and user-interface course. It is not a website for a real company - it is made up for the sake of the course.', 
                'The project was made to show off user-interface design and general graphics programs skills. Complete together with wireframes, style-tile and sitemap.'],
        technologies:['HTML5', 'CSS', 'PhotoShop', 'Balsamiq Mockups', 'BootStrap'],
        projectImgOne:'assets/img/astrocy-web.png',
        projectImgTwo:'assets/img/astrocy-mobile.png',
        href: 'pages/astrocy'
    },
    { 
        name:'Atoms',
        desc:'A simple JavaScript game made during my off-time from school.',
        date:'November, 2016',
        src :'assets/img/atoms.png',
        quote:'Explode your way to victory',
        filler:['Atoms is a JavaScript canvas game about destroying all blobs on screen to become victorious. There is currently no skill to the game beside randomly exploding blobs - however - in future versions, the user will be able to control the atoms angle of explosion.',
                'It is fully featured with explosion audio, depending on the atoms size - if you dont enjoy wacky audio, i suggest turning it off while on the project :-)',
                'Ps. Hold down up-arrow for more atoms(if on pc).'],
        technologies:['HTML5', 'CSS & Animations', 'JavaScript & Canvas', 'Audio', 'Web Video'],
        projectImgOne:'assets/img/atoms-web.png',
        projectImgTwo:'assets/img/atoms-mobile.png',
        href: 'pages/atom'    
    },
    { 
        name:'Kaffelicious',
        desc:'A coffee webshop made as part of a HTML & CSS course. Collaborated with Carl Hultkrantz & Zeena.',
        date:'October, 2016',
        src :'assets/img/kaffelicious.png',
        quote:'Coffee made easy',
        filler:['Kaffelicious was made as part of an HTML & CSS course. It provides coffee solutions, wether you are a company or an individual Kaffelicious got you covered.',
                'Collaborated together with two classmates, Carl and Zeena. My contribution was the welcome, about us and contact page. All made with modified bootstrap. No JavaScript.'],
        technologies:['HTML5', 'CSS', 'BootStrap', 'Mediaqueries'],
        projectImgOne:'assets/img/kaffelicious-web.png',
        projectImgTwo:'assets/img/kaffelicious-mobile.png',
        href: 'pages/kaffelicious'
    },
    { 
        name:'Sci Archive',
        desc:'Web development project about science news articles',
        date:'April, 2016',
        src :'assets/img/sciarchive.png',
        quote:'Science news articles',
        filler:['Web development project during highschool. A complete website for browsing the latest science news articles. Contains flash banners, print functionality and news. Lots of news.'],
        technologies:['XHTML 1.0', 'CSS', 'Flash', 'JavaScript', 'Photoshop', 'EasyPrint'],
        projectImgOne:'assets/img/sciarchive-web.png',
        projectImgTwo:'assets/img/sciarchive-mobile.png',
        href: 'pages/sciarchive/klar.html'
    },
    { 
        name:'Authentic', 
        desc:'JavaScript Web Weather App',
        date:'Alpha release - December 2016<br/> Beta release - April 2017',
        src :'assets/img/authentic.png',
        quote:'When you want the weather, you just want the weather',
        filler:['When you want the weather, you dont want all the fuss, just the weather. Authentic is a weather app created to solve that problem. When released, it will provide users with the correct weather data in a simple and fun way.', 
                'For future versions : In the settings the user could let the app know what types of weather the user likes and dislikes. The app would then accomodate the user by, if for say the user chose to let the app know he or she dislikes rain, the app would say ´Its raining again, go get you umbrella´ - or something similar.'],
        technologies:['HTML5', 'CSS', 'JavaScript AJAX & JSON', 'Free Weather API'],
        projectImgOne:'assets/img/authentic-web.png',
        projectImgTwo:'assets/img/authentic-mobile.png',
        href: 'pages/authentic'
    },
    { 
        name:'Subsurge', 
        desc:'In development JavaScript dungeoncrawler & sci-fi game',
        date:'Not released',
        src :'assets/img/subsurge.png',
        quote:'In development JavaScript game',
        filler:['Currently in development, the JavaScript title Subsurge will be set in the far-distant future, combining future assets with a classic dungeon crawling experience.', 
                'The game will have live updates, but the user should be able to slow down time in order to accomodate the increasingly difficult floors full of alien activity.',
                'No release date as of yet.'],
        technologies:['HTML5', 'CSS + less', 'MeteorJS', 'Materialize', 'PhoneGap', 'A* pathfinder'],
        projectImgOne:'assets/img/subsurge-web.png',
        projectImgTwo:'assets/img/subsurge-mobile.png',
        href: 'pages/subsurge'
    },
    { 
        name:'Physics', 
        desc:'JavaScript-based physics- and collision detection project',
        date:'November, 2017',
        src :'assets/img/physics.png',
        quote:'JavaScript-based physics engine',
        filler:['Physics engine built in JavaScript. Supports fully elastic rebounds of particles, gravitation toggle, RGB-color slider, size slider, and general randomization settings.',
                'Future versions will contain a quad-tree implementation of the collision-detection algorithm for smoother animations and better performance.'],
        technologies:['HTML5', 'CSS + transitions', 'JavaScript + Canvas'],
        projectImgOne:'assets/img/physics-web.png',
        projectImgTwo:'assets/img/physics-mobile.png',
        href: 'pages/physics'
    },
    { 
        name:'Drawing', 
        desc:'JavaScript functional drawing program',
        date:'December, 2016',
        src :'assets/img/drawing.png',
        quote:'JavaScript-based physics engine',
        filler:['A JavaScript program for drawing figures in different colors, and exporting/importing with JSON. Currently supports circle, triangle, rectangle and polygon. Also supports moving already placed objects.'],
        technologies:['HTML5', 'CSS + animations', 'JavaScript + canvas'],
        projectImgOne:'assets/img/drawing-web.png',
        projectImgTwo:'assets/img/drawing-mobile.png',
        href: 'pages/drawing'
    },
    { 
        name:'Zen Garden', 
        desc:'CSS style-challenge',
        date:'October, 2016',
        src :'assets/img/zengarden.png',
        quote:'JavaScript-based physics engine',
        filler:['Open source CSS style challenge from <a href="http://www.csszengarden.com/">http://www.csszengarden.com/</a>. Overall planning was large pictures, awe-inducing parallax and smooth animations.'],
        technologies:['CSS', 'Animations', 'Parallax'],
        projectImgOne:'assets/img/zengarden-web.png',
        projectImgTwo:'assets/img/zengarden-mobile.png',
        href: 'pages/zengarden'
    }
    
];


let getID = id => document.getElementById(id);
let cardsContainer = getID('cards-container');
let projectView = getID('project-viewport');

let displayProject = obj => {
    projectView.style.visibility = 'visible';
    projectView.style.opacity = '1';
    projectView.style.zIndex = '1000';
    projectView.style.top = '0';
    let descHeader = document.createElement('h5');
        descHeader.innerHTML = obj.quote;
    getID('description-span').appendChild(descHeader);
    getID('project-url').href = obj.href;
    getID('project-header').innerHTML = obj.name.toUpperCase();
    getID('project-release-date').innerHTML = obj.date;
    getID('projectOpacityControl').style.opacity = '1';
    getID('first-project-image').src = obj.projectImgOne;
    getID('second-project-image').src = obj.projectImgTwo;
    getID('description-span').style.opacity = '1';
    scroll = document.body.scrollTop;
    document.body.style.height = '100vh';
    document.body.style.overflowY = 'hidden';
    for(let i=0; i<obj.technologies.length; i++) {
        let li = document.createElement('li');
            li.innerHTML = obj.technologies[i];
        getID('technology-list').appendChild(li);
    }
    for(let i=0; i<obj.filler.length; i++) {
        let p = document.createElement('p');
            p.innerHTML = obj.filler[i];
        getID('description-span').appendChild(p);
    }
    setTimeout(function() {
        getID('first-project-image').style.transition = '0.4s ease';
        getID('first-project-image').style.left = '0';
        getID('first-project-image').style.opacity = '1';
    },400);
    setTimeout(function() {
        getID('second-project-image').style.transition = '0.4s ease';
        getID('second-project-image').style.right = '75px';
        getID('second-project-image').style.opacity = '1';
    },600);
}







let closeProject = () => {
    setTimeout(function() {
        getID('first-project-image').style.transition = '0.15s ease';
        getID('first-project-image').style.left = '70px';
        getID('first-project-image').style.opacity = '0';
    },100);
    setTimeout(function() {
        getID('second-project-image').style.transition = '0.15s ease';
        getID('second-project-image').style.right = '150px';
        getID('second-project-image').style.opacity = '0';
        getID('projectOpacityControl').style.opacity = '0';
    },200);
    setTimeout(function() {
        document.body.style.height = 'auto';
        document.body.style.overflowY = '';
        window.scrollTo(0,scroll);
    },380);
    setTimeout(function() {
        projectView.style.visibility = 'hidden';
        projectView.style.opacity = '0';
        projectView.style.zIndex = '-1000';
        projectView.style.top = '-250px';
    },400);
    setTimeout(function() {
        getID('technology-list').innerHTML = '';
        getID('description-span').innerHTML = '';
    },600);
}







let createCards = () => {
    for(let i in datalist) {
        let obj = datalist[i];

        let card = document.createElement('div');
            card.className = 'card';

            // --- | Title section | --- \\
            let cardImage = document.createElement('div');
                cardImage.className = 'card-image';

                let img = document.createElement('img');
                    img.src = obj.src;
                    img.alt = obj.name;

            cardImage.appendChild(img);
            card.appendChild(cardImage);

            // --- | Content section | --- \\
            let cardContent = document.createElement('div');
                cardContent.className = 'card-content';

                let span = document.createElement('span');
                    span.className = 'card-title';
                    span.innerHTML = obj.name;
                    cardContent.appendChild(span);

                let desc = document.createElement('p');
                    desc.className = 'card-desc';
                    desc.innerHTML = obj.desc;
                    cardContent.appendChild(desc);

            card.appendChild(cardContent);

            // --- | Action section | --- \\
            let cardAction = document.createElement('div');
                cardAction.className = 'card-action';

                let link = document.createElement('a');
                    link.onclick = function() {displayProject(obj);}
                    link.innerHTML = 'View project <i class="fa fa-arrow-right" aria-hidden="true"></i>';
                    cardAction.appendChild(link);

            card.appendChild(cardAction);

        cardsContainer.appendChild(card);
    }
}



function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}


function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    } return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY); return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 25);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for ( var i=startY; i<stopY; i+=step ) {
            setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
            leapY += step; if (leapY > stopY) leapY = stopY; timer++;
        } return;
    }
    for ( var i=startY; i>stopY; i-=step ) {
        setTimeout("window.scrollTo(0, "+leapY+")", timer * speed);
        leapY -= step; if (leapY < stopY) leapY = stopY; timer++;
    }
}
