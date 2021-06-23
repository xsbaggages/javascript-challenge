// from data.js
var tableData = data;

// YOUR CODE HERE!
// function to display UFO sightings
function tableDisplay(ufoSightings) {
    var tbody = d3.select("#ufo-table tbody");
    ufoSightings.forEach((sighting) => {
      var row = tbody.append("tr");
      

      // drilling into dataset and printing out property name and value
      Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.html(value);
      });
    });
  };

  
// clear the table for new data
function deleteTbody() {
    d3.select("#ufo-table tbody")
      .selectAll("tr").remove();   
  };
  
  // initial display of all UFO sightings

  tableDisplay(tableData);
  
  // filter button
  var button = d3.select("#filter-btn");
  var datebox = d3.select("#datetime");

  // search on "Enter" keypress "date"
  datebox.on("keypress", function(event) {
    if (d3.event.keyCode === 13) {
      d3.event.preventDefault();
      button.dispatch('click');
    }
  });

  // prevent page from refreshing
  button.on("click", function(event) {
    d3.event.preventDefault();
    deleteTbody();

    var dateInput = d3.select("#datetime").property("value");
    if (dateInput.trim() === "" ) {
      // display the whole database if the date field has no date
      var filteredData = tableData;
    } else {
      // display the filtered dataset  
      var filteredData = tableData.filter(ufoSighting => 
        ufoSighting.datetime === dateInput.trim());
    };
  
    // display message if no records found
    if (filteredData.length == 0) {
      d3.select("#ufo-table tbody")
        .append("tr")
        .append("td")
          .attr("colspan", 7)
          .html("<h3>Data Not Found</h3>");
    };
  
    
    tableDisplay(filteredData);
  });