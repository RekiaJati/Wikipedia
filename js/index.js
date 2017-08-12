var viewEntries = function(json) {
  // empty the container
  $("#resultsContainer").empty();
  //  Fill the container
  for(var i=0; i< json.query.search.length; i++) {
    // Add one more div
    var entrieDiv = createEntryDiv(json.query.search[i].title, json.query.search[i].snippet,
                                  "https://en.wikipedia.org/wiki/" + json.query.search[i].title);
    $('#resultsContainer').append(entrieDiv)
  }
};

var createEntryDiv = function(title, content, link) {
  var wrapperDiv = document.createElement('div');
  wrapperDiv.classList.add("row");
  wrapperDiv.classList.add("entry");
  
  var titleDiv = document.createElement('div');
  titleDiv.classList.add("row");
  var titleLink = document.createElement('a');
  titleLink.setAttribute('href', link);
	titleLink.setAttribute('target', '_blank');
  var titleHtml = document.createElement('h3');
  titleHtml.textContent = title;
  titleLink.appendChild(titleHtml);
  titleDiv.appendChild(titleLink);
  
  var summaryDiv = document.createElement('div');
  summaryDiv.classList.add("row");
  var summaryPar = document.createElement('p');
  summaryPar.innerHTML = content;
  summaryDiv.appendChild(summaryPar);
  
  wrapperDiv.appendChild(titleDiv);
  wrapperDiv.appendChild(summaryDiv);
  return wrapperDiv;
}

$(document).ready(function() {
  
  $("#random").on("click", function() {
    window.open("https://en.wikipedia.org/wiki/Special:Random", '_blank');
  });
  
  $("#search").on("click", function() {
    $.ajax({
		  url: 'https://en.wikipedia.org/w/api.php',
      jsonp: 'callback',
      dataType: 'jsonp',
      data: {
        action: 'query',
        list: 'search',
        srsearch: $("#searchText").val(),
        format: 'json'
      },
      xhrFields: { withCredentials: true },
      success: function(response) {
        viewEntries(response);
      },
	});   
 });
  
});