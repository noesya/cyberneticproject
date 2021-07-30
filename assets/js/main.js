var sjs = SimpleJekyllSearch({
    searchInput: document.getElementById('js-search-input'),
    resultsContainer: document.getElementById('js-results-container'),
    json: '/search/index.json',
    searchResultTemplate: `
        <li>
            <a href="{url}">{title} <small>{type}</small></a>
        </li>
        `
});

document.getElementById('search-button').addEventListener('click', function(){
    document.getElementById('header').classList.toggle('search-opened');
});