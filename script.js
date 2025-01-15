const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=4f32f7e45c7e74d03e6d2fc1710e743f&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=4f32f7e45c7e74d03e6d2fc1710e743f&query=";


const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies (APILINK)

function returnMovies(url) {
    fetch(url)
        .then(res => res.json())
        .then(function(data) {
            console.log(data.results);
            main.innerHTML = '';

            if(data.results){
                data.results.forEach(element => {
                    if(!element.poster_path){
                        return;
                    }
                    const div_card = document.createElement('div');
                    div_card.setAttribute ('class', 'card');
    
                    const div_row = document.createElement('div');
                    div_row.setAttribute ('class', 'row');
    
                    const div_column = document.createElement('div');
                    div_column.setAttribute ('class', 'column');
    
                    const image = document.createElement('img');
                    image.setAttribute ('class', 'thumbnil');
                    image.setAttribute('alt', element.title); 
    
                    const title = document.createElement('h3');
                    title.setAttribute ('id', 'title');
    
                    const center = document.createElement ('center');
                    
                    title.innerHTML = `${element.title}` ;
    
                    image.src = IMG_PATH + element.poster_path;
                    center.appendChild(image);
                    div_card.appendChild(center);
                    div_card.appendChild(title);
                    div_column.appendChild(div_card);
                    div_row.appendChild(div_column);
    
                    main.appendChild(div_row);
    
                });
            }else{
                main.innerHTML = '<h2>No movies found.</h2>';
            }
        })
        .catch(err => console.error('Error fetching data:', err));
}


form.addEventListener("submit", (event) => {
    event.preventDefault();
    main.innerHTML = ''
    const searchItem = search.value;

    if (searchItem) {
        returnMovies(SEARCHAPI + searchItem);
        search.value = ''; 
    }
});
