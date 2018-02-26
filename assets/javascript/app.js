// Setup variables
// ===================================================
var apiKey = "d11361d2415e42dba87af6d021ea375b";

var queryTerm = "";
var numResults = 0;
var startYear = 0;
var endYear = 0;

// URL
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?" + "api-key=" + apiKey;

// Variable to track num of articles
var articleCounter = 0;

// Functions
// ===================================================

function runQuery(numArticles, queryURL) {
    // AJAX Function
    $.ajax({
        url: queryURL,
        method: "GET"
    }).done(function (NYTData) {
        for (var i = 0; i < NYTData.response.docs.length; i++) {
            console.log(NYTData.response.docs[i].headline.main);
            console.log(NYTData.response.docs[i].section_name);
            console.log(NYTData.response.docs[i].pub_date);
            console.log(NYTData.response.docs[i].web_url);
        }
        // Logging to console
        console.log(queryURL);
        console.log(numArticles);
        console.log(NYTData);
    })
}

// Main processes
// ===================================================

$("#searchBtn").on("click", function () {

    // Get the Search Term
    queryTerm = $("#search").val().trim();

    // Add in the Search Term
    var newURL = queryURL + "&q=" + queryTerm;

    // Get the Number of Records
    numResults = $("#numRecords").val();

    // Get the Start Year and End Year
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();

    if (parseInt(startYear)) {
        // Add the necessary fields
        startYear = startYear + "0101";
        // Add the date information to the URL
        newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(endYear)) {
        // Add the necessary fields
        endYear = endYear + "0101";
        // Add the date information to the URL
        newURL = newURL + "&end_date=" + endYear;
    }

    console.log(newURL);

    // Send the AJAX call the newly assembled URL
    runQuery(numResults, newURL);

    return false;
})



// 1. Retrieve user inputs convert to variables
// 2. Use those variables to run an AJAX call to the NY Times
// 3. Breakdown the NYT object into useable fields
// 4. Dynamically generate html content