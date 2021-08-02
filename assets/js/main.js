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

(function setReadingProgress() {
    var progressBar = document.getElementById('progress'),
        progressText = document.getElementById('progress-text');

    if (!progressBar) return;

    function onProgress() {
        var progress = window.scrollY / (document.body.offsetHeight - window.innerHeight - document.getElementById('footer').offsetHeight);
        progress = Math.min(1, progress);
        progressBar.style.width = progress * 100 + '%';
        progressText.innerText = Math.round(progress * 100) + '%';
    }

    document.addEventListener('scroll', onProgress);
    document.addEventListener('touchmove', onProgress);
})();