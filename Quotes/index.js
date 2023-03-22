window.onload = function () {
    var data = JSON.parse(localStorage.getItem("data"));
    if (!data) {
        console.log("No issue if");
        readQuotes();
    }
    displayQuote();
};

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

readQuotes = () => {
    console.log("No Issue");
    fetch("https://raw.githubusercontent.com/Promepy/Promepy.github.io/master/Quotes/quotes.json")
        .then(response => response.json())
        .then(data => {
            var i = 1;
            var quotes = [];
            data.forEach(item => {

                var quote = { Quote: item.Quote, Author: item.Author };
                if (i < 20001) {
                    //localStorage.setItem("data"+i, );
                    quotes.push(quote);
                }
                i++;
            });
            localStorage.setItem("data", JSON.stringify(quotes));

        })
        .catch(error => console.error(error));
}

displayQuote = () =>{
    var target = document.querySelector('div');
    let x = Math.round(Math.random() * (20000));
    data = JSON.parse(localStorage.getItem("data"));
    console.log(x);
    console.log(data[x].Quote, data[x].Author);
    target.innerHTML = data[x].Quote + " - " + data[x].Author;
}