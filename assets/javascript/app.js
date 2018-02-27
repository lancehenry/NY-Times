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
        // Empties the wellSection each time you hit search
        $("#wellSection").empty();

        // When searching through numArticles, this returns was user inputs (1, 5, 10)
        for (var i = 0; i < numArticles; i++) {
            
            // Start dumping HTML to DOM
            var wellSection = $("<div>");
            wellSection.addClass("well");
            wellSection.attr("id", "articleWell-" + i);
            $("#wellSection").append(wellSection);

            // Check if headline exists, only run code if it does
            if (NYTData.response.docs[i].headline != "null") {
                $("#articleWell-" + i).append("<h3>" + NYTData.response.docs[i].headline.main + "</h3>");
            }

            // Check if byline exists, only run code if it does
            if (NYTData.response.docs[i].byline && NYTData.response.docs[i].byline.hasOwnProperty("original")) {
                $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].byline.original + "</h5>");
            }

            // Attach content to the appropriate well            
            $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].section_name + "</h5>");
            $("#articleWell-" + i).append("<h5>" + NYTData.response.docs[i].pub_date + "</h5>");
            $("#articleWell-" + i).append("<a href=" + NYTData.response.docs[i].web_url + ">" + NYTData.response.docs[i].web_url + "</a>");    
        }
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

    // Send the AJAX call the newly assembled URL
    runQuery(numResults, newURL);

    return false;
})

$("#clearBtn").on("click", function(){
    $("#wellSection").empty();
    $("form").trigger("reset");
})