// Setup variables
// ===================================================
var apiKey = "d11361d2415e42dba87af6d021ea375b";

var queryTerm  = "";
var numResults = 0;
var startYear  = 0;
var endYear    = 0;

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
    }).done(function(NYTData) {
        
        // Logging to console
        console.log(queryURL);
        console.log(NYTData);
    })
}

// Main processes
// ===================================================

$("#searchBtn").on("click", function(){

    queryTerm = $("#search").val().trim();
    console.log(queryTerm);

    // Add in the Search Term
    var newURL = queryURL + "&q=" + queryTerm;
    console.log(newURL);

    // Get the Number of Records
    numResults = $("")

    // Get the Start Year and End Year
    startYear = $("#startYear").val().trim();
    endYear = $("#endYear").val().trim();


    if (parseInt(startYear)) {
        startYear = startYear + "0101";
        newURL = newURL + "&begin_date=" + startYear;
    }

    if (parseInt(endYear)) {
        endYear = endYear + "0101";
        newURL = newURL + "&end_date=" + endYear;
    }

    // Add the date information to the URL
    
    console.log(newURL);

    // Send the AJAX call the newly assembled URL
    runQuery(10, newURL);
    
    return false;
})



// 1. Retrieve user inputs convert to variables
// 2. Use those variables to run an AJAX call to the NY Times
// 3. Breakdown the NYT object into useable fields
// 4. Dynamically generate html content