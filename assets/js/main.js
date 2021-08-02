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

function onProgress() {
    var progress = window.scrollY / (document.body.offsetHeight - window.innerHeight - document.getElementById('footer').offsetHeight);
    console.log(progress);
    document.getElementById('progress').style.width = progress * 100 + '%';
}


document.addEventListener('scroll', onProgress);
document.addEventListener('touchmove', onProgress);