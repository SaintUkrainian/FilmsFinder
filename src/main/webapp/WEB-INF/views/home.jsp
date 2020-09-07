<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%> <%@ taglib prefix="form"
uri="http://www.springframework.org/tags/form" %> <%@ taglib prefix="c"
uri="http://java.sun.com/jsp/jstl/core" %>

<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300&family=Squada+One&display=swap"
            rel="stylesheet"
        />
        <link
            rel="stylesheet"
            href="${pageContext.request.contextPath}/styles/home.css"
        />
        <script
            src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"
            defer
        ></script>
        <script
            src="${pageContext.request.contextPath}/scripts/home.js"
            defer
        ></script>
        <link rel="shortcut icon" type="image/x-icon" href="${pageContext.request.contextPath}/images/logo-small.png" />
        <title>FilmsFinder</title>
    </head>
    <body>
        <div class="backdrop">
            <h1>Searching...</h1>
        </div>
        <header>
            <div class="logo">
                <svg
                    width="200"
                    height="200"
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <rect
                        x="0.5"
                        y="0.5"
                        width="199"
                        height="199"
                        stroke="white"
                    />
                    <path
                        d="M42.2449 79.6967V93.6667H34.5449V58.0817H50.6049V64.7367H42.2449V73.2617H50.0549V79.6967H42.2449ZM62.3212 63.4717C61.5512 64.2417 60.6162 64.6267 59.5162 64.6267C58.4162 64.6267 57.4628 64.2417 56.6562 63.4717C55.8495 62.665 55.4462 61.7117 55.4462 60.6117C55.4462 59.475 55.8495 58.5217 56.6562 57.7517C57.4628 56.945 58.4162 56.5417 59.5162 56.5417C60.6162 56.5417 61.5512 56.945 62.3212 57.7517C63.1278 58.5217 63.5312 59.475 63.5312 60.6117C63.5312 61.7483 63.1278 62.7017 62.3212 63.4717ZM55.8312 93.6667V66.8267H63.2012V93.6667H55.8312ZM75.7463 93.6667H68.3763V58.0817H75.7463V93.6667ZM104.876 66.2767C109.423 66.2767 111.696 68.6967 111.696 73.5367V93.6667H104.326V72.6567C104.326 72.3633 104.216 72.1067 103.996 71.8867C103.813 71.6667 103.574 71.5567 103.281 71.5567H100.916C100.623 71.5567 100.366 71.6667 100.146 71.8867C99.9628 72.1067 99.8711 72.3633 99.8711 72.6567V93.6667H92.5011V72.6567C92.5011 72.3633 92.3911 72.1067 92.1711 71.8867C91.9878 71.6667 91.7495 71.5567 91.4561 71.5567H89.0911C88.7978 71.5567 88.5411 71.6667 88.3211 71.8867C88.1378 72.1067 88.0461 72.3633 88.0461 72.6567V93.6667H80.6761V66.8267H87.3861V68.2017C88.5228 66.9183 90.2461 66.2767 92.5561 66.2767H93.0511C95.7645 66.2767 97.6528 67.12 98.7161 68.8067C99.8528 67.12 101.741 66.2767 104.381 66.2767H104.876ZM129.688 76.8367C134.235 76.8367 136.508 79.2567 136.508 84.0967V86.9567C136.508 91.7967 134.235 94.2167 129.688 94.2167H123.583C119.037 94.2167 116.763 91.7967 116.763 86.9567V85.2517H123.583V87.6717C123.583 87.965 123.675 88.2217 123.858 88.4417C124.078 88.6617 124.335 88.7717 124.628 88.7717H129.138C129.432 88.7717 129.67 88.6617 129.853 88.4417C130.073 88.2217 130.183 87.965 130.183 87.6717V84.3717C130.183 84.0783 130.073 83.8217 129.853 83.6017C129.67 83.3817 129.432 83.2717 129.138 83.2717H123.473C118.927 83.2717 116.653 80.8517 116.653 76.0117V73.5367C116.653 68.6967 118.927 66.2767 123.473 66.2767H129.248C133.795 66.2767 136.068 68.6967 136.068 73.5367V74.5267H129.248V72.8217C129.248 72.5283 129.138 72.2717 128.918 72.0517C128.735 71.8317 128.497 71.7217 128.203 71.7217H124.023C123.73 71.7217 123.473 71.8317 123.253 72.0517C123.07 72.2717 122.978 72.5283 122.978 72.8217V75.7367C122.978 76.03 123.07 76.2867 123.253 76.5067C123.473 76.7267 123.73 76.8367 124.023 76.8367H129.688ZM42.2449 137.697V151.667H34.5449V116.082H50.6049V122.737H42.2449V131.262H50.0549V137.697H42.2449ZM62.3212 121.472C61.5512 122.242 60.6162 122.627 59.5162 122.627C58.4162 122.627 57.4628 122.242 56.6562 121.472C55.8495 120.665 55.4462 119.712 55.4462 118.612C55.4462 117.475 55.8495 116.522 56.6562 115.752C57.4628 114.945 58.4162 114.542 59.5162 114.542C60.6162 114.542 61.5512 114.945 62.3212 115.752C63.1278 116.522 63.5312 117.475 63.5312 118.612C63.5312 119.748 63.1278 120.702 62.3212 121.472ZM55.8312 151.667V124.827H63.2012V151.667H55.8312ZM75.7463 151.667H68.3763V124.827H75.0863V126.202C76.223 124.918 77.9463 124.277 80.2563 124.277H81.4113C85.958 124.277 88.2313 126.697 88.2313 131.537V151.667H80.8613V130.657C80.8613 130.363 80.7513 130.107 80.5313 129.887C80.348 129.667 80.1097 129.557 79.8163 129.557H76.7913C76.498 129.557 76.2413 129.667 76.0213 129.887C75.838 130.107 75.7463 130.363 75.7463 130.657V151.667ZM101.219 124.277C103.089 124.277 104.593 124.717 105.729 125.597V116.082H113.099V151.667H106.884V149.687C105.748 151.373 103.859 152.217 101.219 152.217H100.064C95.5178 152.217 93.2445 149.797 93.2445 144.957V131.537C93.2445 126.697 95.5178 124.277 100.064 124.277H101.219ZM105.729 145.837V130.657C105.729 130.363 105.619 130.107 105.399 129.887C105.216 129.667 104.978 129.557 104.684 129.557H101.659C101.366 129.557 101.109 129.667 100.889 129.887C100.706 130.107 100.614 130.363 100.614 130.657V145.837C100.614 146.13 100.706 146.387 100.889 146.607C101.109 146.827 101.366 146.937 101.659 146.937H104.684C104.978 146.937 105.216 146.827 105.399 146.607C105.619 146.387 105.729 146.13 105.729 145.837ZM131.148 124.277C135.694 124.277 137.968 126.697 137.968 131.537V140.227H125.483V145.837C125.483 146.13 125.574 146.387 125.758 146.607C125.978 146.827 126.234 146.937 126.528 146.937H129.553C129.846 146.937 130.084 146.827 130.268 146.607C130.488 146.387 130.598 146.13 130.598 145.837V142.867H137.968V144.957C137.968 149.797 135.694 152.217 131.148 152.217H124.933C120.386 152.217 118.113 149.797 118.113 144.957V131.537C118.113 126.697 120.386 124.277 124.933 124.277H131.148ZM125.483 135.387H130.598V130.437C130.598 130.143 130.488 129.887 130.268 129.667C130.084 129.447 129.846 129.337 129.553 129.337H126.528C126.234 129.337 125.978 129.447 125.758 129.667C125.574 129.887 125.483 130.143 125.483 130.437V135.387ZM153.454 124.277H154.884V131.427H151.254C150.007 131.427 149.384 132.068 149.384 133.352V151.667H142.014V124.827H148.724V127.412C149.787 125.322 151.364 124.277 153.454 124.277Z"
                        fill="white"
                    />
                    <circle
                        cx="146.154"
                        cy="51.7949"
                        r="12.8205"
                        fill="white"
                    />
                    <circle
                        cx="174.872"
                        cy="21.0256"
                        r="12.8205"
                        fill="#FFFBFB"
                    />
                    <circle cx="100" cy="21.0256" r="12.8205" fill="white" />
                </svg>
            </div>

            <div class="entry-text">
                <h1>Welcome to my Web Application!</h1>
            </div>
        </header>
        <hr class="hr-list"/>
        <section id="genres-section">
            <div class="search-text">
                <h1>Search by Title</h1>
            </div>
            <form id="search-film">
                <div>
                    <input type="text" id="film-title" placeholder="Search for film">
                    <input type="submit" value="Search" id="search-btn">
                </div>
            </form>
            <div class="search-text">
                <h1>Get Films by Genre</h1>
                <p>You'll get random 20 films, every time you click on genre!</p>
            </div>
            <ul class="genres-list">
               <div class="genres-container">
                    <li class="genre-btn" id="28">
                        <h3 class="genre-category">Action</h3>
                    </li>
                    <li class="genre-btn" id="12">
                        <h3 class="genre-category">Adventure</h3>
                    </li>
                    <li class="genre-btn" id="16">
                        <h3 class="genre-category">Animation</h3>
                    </li>
                    <li class="genre-btn" id="35">
                        <h3 class="genre-category">Comedy</h3>
                    </li>
                    <li class="genre-btn" id="80">
                        <h3 class="genre-category">Crime</h3>
                    </li>
                </div>
                <div class="genres-container">
                    <li class="genre-btn" id="99">
                        <h3 class="genre-category">Documentary</h3>
                    </li>
                    <li class="genre-btn" id="18">
                        <h3 class="genre-category">Drama</h3>
                    </li>
                    <li class="genre-btn" id="10751">
                        <h3 class="genre-category">Family</h3>
                    </li>
                    <li class="genre-btn" id="14">
                        <h3 class="genre-category">Fantasy</h3>
                    </li>
                    <li class="genre-btn" id="36">
                        <h3 class="genre-category">History</h3>
                    </li>
                </div>
                <div class="genres-container">
                    <li class="genre-btn" id="27">
                        <h3 class="genre-category">Horror</h3>
                    </li>
                    <li class="genre-btn" id="10402">
                        <h3 class="genre-category">Music</h3>
                    </li>
                    <li class="genre-btn" id="9648">
                        <h3 class="genre-category">Mystery</h3>
                    </li>
                    <li class="genre-btn" id="10749">
                        <h3 class="genre-category">Romance</h3>
                    </li>
                    <li class="genre-btn" id="878">
                        <h3 class="genre-category">Science Fiction</h3>
                    </li>
                </div>
                <div class="genres-container">
                    <li class="genre-btn" id="10770">
                        <h3 class="genre-category">TV Movie</h3>
                    </li>
                    <li class="genre-btn" id="53">
                        <h3 class="genre-category">Thriller</h3>
                    </li>
                    <li class="genre-btn" id="10752">
                        <h3 class="genre-category">War</h3>
                    </li>
                    <li class="genre-btn" id="37">
                        <h3 class="genre-category">Western</h3>
                    </li>
                </div>
            </ul>
        </section>
        <hr class="hr-list"/>
        <section class="films" id="films-section">
            <ul id="movie-list"></ul>
        </section>
        <section id="searched-film"></section>
    </body>
</html>
