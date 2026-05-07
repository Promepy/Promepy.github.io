(function () {
  "use strict";

  var quotes = [];
  var quoteText = document.getElementById("quoteText");
  var quoteAuthor = document.getElementById("quoteAuthor");
  var newQuoteButton = document.getElementById("newQuoteButton");

  function renderRandomQuote() {
    if (!quotes.length || !quoteText || !quoteAuthor) return;

    var item = quotes[Math.floor(Math.random() * quotes.length)];
    quoteText.textContent = item.Quote || "No quote available.";
    quoteAuthor.textContent = item.Author ? "— " + item.Author : "";
  }

  fetch("quotes.json")
    .then(function (response) { return response.json(); })
    .then(function (data) {
      quotes = data.slice(0, 20000);
      renderRandomQuote();
    })
    .catch(function () {
      if (quoteText) quoteText.textContent = "Could not load quotes right now.";
    });

  if (newQuoteButton) {
    newQuoteButton.addEventListener("click", renderRandomQuote);
  }
})();
