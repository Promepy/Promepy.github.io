window.onload = function () {
    readQuotes();
};


readQuotes = () => {
    fetch("http://127.0.0.1:5500/quotes.json")
        .then(response => response.json())
        .then(data => {
            console.log(data.length());
            data.forEach(item => {
                console.log(item.Quote, item.Author);
            });
        })
        .catch(error => console.error(error));
}