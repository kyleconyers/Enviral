// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");
// var {createworld} = require("./api.js");
// The API object contains methods for each kind of request we'll make
var API = {
  saveExample: function(example) {
    return $.ajax({
      headers: {
        "Content-Type": "application/json"
      },
      type: "POST",
      url: "api/examples",
      data: JSON.stringify(example)
    });
  },
  getExamples: function() {
    return $.ajax({
      url: "api/examples",
      type: "GET"
    });
  },
  deleteExample: function(id) {
    return $.ajax({
      url: "api/examples/" + id,
      type: "DELETE"
    });
  }
};

// refreshExamples gets new examples from the db and repopulates the list
var refreshExamples = function() {
  API.getExamples().then(function(data) {
    var $examples = data.map(function(example) {
      var $a = $("<a>")
        .text(example.text)
        .attr("href", "/example/" + example.id);

      var $li = $("<li>")
        .attr({
          class: "list-group-item",
          "data-id": example.id
        })
        .append($a);

      var $button = $("<button>")
        .addClass("btn btn-danger float-right delete")
        .text("ｘ");

      $li.append($button);

      return $li;
    });

    $exampleList.empty();
    $exampleList.append($examples);
  });
};

// handleFormSubmit is called whenever we submit a new example
// Save the new example to the db and refresh the list
var handleFormSubmit = function(event) {
  event.preventDefault();

  var example = {
    text: $exampleText.val().trim(),
    description: $exampleDescription.val().trim()
  };

  if (!(example.text && example.description)) {
    alert("You must enter an example text and description!");
    return;
  }

  API.saveExample(example).then(function() {
    refreshExamples();
  });

  $exampleText.val("");
  $exampleDescription.val("");
};

// handleDeleteBtnClick is called when an example's delete button is clicked
// Remove the example from the db and refresh the list
var handleDeleteBtnClick = function() {
  var idToDelete = $(this)
    .parent()
    .attr("data-id");

  API.deleteExample(idToDelete).then(function() {
    refreshExamples();
  });
};

// Add event listeners to the submit and delete buttons
$submitBtn.on("click", handleFormSubmit);
$exampleList.on("click", ".delete", handleDeleteBtnClick);




// googlecharts

google.charts.load('current', {'packages':['corechart']});
setTimeout(function() { google.charts.setOnLoadCallback(drawChart) }, 3000);


//onload: create country total array, pupulate graph totals
//oncountry click: select country totals, populate new grapgh

//x-axis time,
//y-axis generation
//input, each line(volume)represented by country
//array of apis, organized by year(x-axis), 
//country by year, generation volumes(y-axis)
//
//


//
function drawChart(region = "world") {

  // var data = google.visualization.arrayToDataTable([
  //   ['Year', 'coal', 'natural gas'],
  //   ['2013',  1000,      400],
  //   ['2014',  1170,      460],
  //   ['2015',  660,       1120],
  //   ['2016',  1030,      540]
  // ]);
  // console.log(geography)
  console.log(regionData);
  console.log(region);
  // console.log(regionChart)
  var data = google.visualization.arrayToDataTable(
      regionData[region]
      );
      console.log(data)
      console.log(regionData[region])
  // var data = createworld();
  // console.log(data) 
  // data = data.map(function(set){
  //   return Object.values(set)
  // })

  // See what 'data' is logging in the console
  console.log(data);

  var options = {
    isStacked: true,
    title: 'Energy Consumption By Fuel Type',
    hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
    vAxis: {title: "Quadrillions of BTUs", minValue: 0}
  };

  if(region == "world"){

     var chart = new google.visualization.AreaChart(document.getElementById('globe_div'));
  }
  else var chart = new google.visualization.AreaChart(document.getElementById('nation_div'));
 
  chart.draw(data, options);


  
  
}








// juan example



// var mapData, svg, leftScale, bottomScale, last_state = false;

// function makeGraph(data){
//   mapData = parseData(data);
//   svg = d3.select("#graph");
//     margin = {top: 20, right: 20, bottom: 30, left: 100};
//   var
//     width = svg.attr('width') - margin.left - margin.right,
//     height = svg.attr('height') - margin.top - margin.bottom;

//   leftScale = d3.scaleBand().domain(["Non-beneficial Use", "Beneficial Use"]).range([height/2,0]).padding(.1);
//   keyLeftScale = d3.scaleBand().domain(["Non-beneficial Use", "Beneficial Use"]).range([height/3,0]).padding(.2);

//   bottomScale = d3.scaleLinear().domain([0,mapData.maxTons]).range([30, width]);
//   var left = d3.axisLeft(leftScale),
//     keyLeft = d3.axisLeft(keyLeftScale),
//     bottom = d3.axisBottom(bottomScale);

//   svg.append("g")
//     .attr("class", "axis axis--y")
//     .attr('transform','translate(30, 0)')
//     .call(left);
// //  drawKey(keyLeft);
// };

// function drawKey(keyLeft){

//   var key_g = svg.append("g")
//     .attr('transform','translate(33, 300)')
//     .attr("class", "axis axis--y")
//     .call(keyLeft);


//   var beneficialKeys = ['Agriculture', 'Forestry', 'Land Reclamation', 'Landscapes and Gardens'],
//     nonBeneficialKeys = ['Landfill', 'Incineration'];

//   var beneficialStack = d3.stack()
//     .keys(beneficialKeys)
//     .order(d3.stackOrderNone)
//     .offset(d3.stackOffsetNone);

//   var nonBeneficialStack = d3.stack()
//     .keys(nonBeneficialKeys)
//     .order(d3.stackOrderNone)
//     .offset(d3.stackOffsetNone);

//   var beneTextLength = 0;
//   for(var key in beneficialKeys) {
//     var beneficialSeries = key_g.append('g')
//       .attr('class', 'stack')
//       .append('g');


//     var beneText = svg.append('text')
//       .text(beneficialKeys[key])
//       .attr('transform','translate(5, 0)')
//       .attr("class", "key-text")
//       .attr('text-anchor', 'right')
//       .attr('x', beneTextLength + 45)
//       .attr("y", keyLeftScale("Beneficial Use")+ (keyLeftScale.bandwidth()/4)  + 337);

//     var beneWidth = beneText.node().getBBox().width;

//     var beneRect = beneficialSeries.append('rect');

//     beneRect.attr('class', beneficialKeys[key].toLowerCase().replace(/ /g,"-"))
//       .attr('transform','translate(5, 0)')
//       .attr('x', beneTextLength )
//       .attr("y", keyLeftScale("Beneficial Use")+ (keyLeftScale.bandwidth()/4) )
//       .transition()
//       .attr('width', beneWidth + 20)
//       .attr('height', keyLeftScale.bandwidth()/2);

//     beneTextLength += beneWidth + 20;
//   }

//   svg.append('text')
//     .attr("class", "key-title-text")
//     .text('Key')
//     .attr('x', beneTextLength/2)
//     .attr("y", keyLeftScale("Beneficial Use") + 300);

//   var nonBeneTextLength = 0;
//   for(var key2 in nonBeneficialKeys) {
//     var nonBeneficialSeries = key_g.append('g')
//       .attr('class', 'stack')
//       .append('g');


//     var nonBeneText = svg.append('text')
//       .text(nonBeneficialKeys[key2])
//       .attr("class", "key-text")
//       .attr('transform','translate(5, 0)')
//       .attr('text-anchor', 'right')
//       .attr('x', nonBeneTextLength + 45)
//       .attr("y", keyLeftScale("Non-beneficial Use") + (keyLeftScale.bandwidth()/4) + 337);

//     var nonBeneWidth = nonBeneText.node().getBBox().width;

//     var nonBeneRect = nonBeneficialSeries.append('rect');

//     nonBeneRect.attr('class', nonBeneficialKeys[key2].toLowerCase().replace(/ /g,"-"))
//       .attr('transform','translate(5, 0)')
//       .attr('x', nonBeneTextLength)
//       .attr("y", keyLeftScale("Non-beneficial Use") + (keyLeftScale.bandwidth()/4))
//       .transition()
//       .attr('width', nonBeneWidth + 20)
//       .attr('height', keyLeftScale.bandwidth()/2);

//     nonBeneTextLength += nonBeneWidth + 20;
//   }
// }


// function drawMap(state_or_province) {
//   if(!last_state){
//     last_state = state_or_province
//   }

//   var beneficialKeys = ['Agriculture', 'Forestry', 'Land Reclamation', 'Landscapes and Gardens'],
//     nonBeneficialKeys = ['Landfill', 'Incineration'];

//   var beneficialStack = d3.stack()
//     .keys(beneficialKeys)
//     .order(d3.stackOrderNone)
//     .offset(d3.stackOffsetNone);

//   var nonBeneficialStack = d3.stack()
//     .keys(nonBeneficialKeys)
//     .order(d3.stackOrderNone)
//     .offset(d3.stackOffsetNone);

//   var nonBeneficialSeries = svg.selectAll('.nb-series')
//     .data(nonBeneficialStack([mapData[state_or_province]]));

//   var nonBeneTotal = 0,
//     nonBeneRect = nonBeneficialSeries.enter()
//     .append('g')
//     .attr('class', 'nb-series')
//     .merge(nonBeneficialSeries)
//     .selectAll('rect')
//     .data(function (d) {
//       //add the key in so we can retrieve it later when getting the class
//       d[0][2] = d['key'];
//       return d;
//     },
//     function(d){
//       return d[2];
//     });

//   nonBeneRect
//     .enter()
//     .append('rect')
//     .merge(nonBeneRect)
//     .attr('class', function(d){
//       return d[2].toLowerCase().replace(" ","-");
//     })
//     .attr('x', function (d) {
//       return bottomScale(d[0]);
//     })
//     .attr("y", leftScale("Non-beneficial Use"))
//     .transition()
//     .attr('width', function (d) {
//       nonBeneTotal += d[1] - d[0];
//       return bottomScale(d[1]) - bottomScale(d[0]);
//     })
//     .attr('height', leftScale.bandwidth());

//   var beneficialSeries = svg.selectAll('.b-series')
//     .data(beneficialStack([mapData[state_or_province]]));


//   var beneTotal = 0,
//   beneRect = beneficialSeries.enter()
//     .append('g')
//     .attr('class', 'b-series')
//     .merge(beneficialSeries)
//     .selectAll('rect')
//     .data(function (d) {
//       d[0][2] = d['key'];
//       return d;
//     },
//     function(d) {
//       return d[2];
//     });

//   beneRect.enter()
//     .append('rect')
//     .merge(beneRect)
//     .attr('class', function(d){
//       return d[2].toLowerCase().replace(/ /g,"-");
//     })
//     .attr('x', function (d) {
//       return bottomScale(d[0]);
//     })
//     .attr("y", leftScale("Beneficial Use"))
//     .transition()
//     .attr('width', function (d) {
//       beneTotal += d[1] - d[0];
//       return bottomScale(d[1]) - bottomScale(d[0]);
//     })
//     .attr('height', leftScale.bandwidth());

//   svg.selectAll('.percent-text').remove();
//   var usePercent = (beneTotal + nonBeneTotal) / 100;
//   svg.append('text')
//     .attr("class", "percent-text")
//     .attr('transform','translate(-520,130)')
//     .attr('text-anchor', 'right')
//     .attr("y", leftScale("Beneficial Use") + 90)
//     .text(beneTotal.toString() + " dt (" + (beneTotal / usePercent).toFixed().toString() + "%)");

//   svg.append('text')
//     .attr("class", "percent-text")
//     .attr('transform','translate(-520,130)')
//     .attr('text-anchor', 'right')
//     .attr("y", leftScale("Non-beneficial Use") + 90)
//     .text(nonBeneTotal.toString() + " dt (" + (nonBeneTotal / usePercent).toFixed().toString() + "%)");

//   beneRect.exit().remove();



//   last_state = state_or_province;
// }

// function parseData(data) {
//   var returnData = {};
//   maxTons = 0;
//   data.forEach(function (d) {
//     if (parseInt(d['Total Dry Tons']) > maxTons) {
//       maxTons = parseInt(d['Total Dry Tons']);
//     }
//     returnData[d['State or Province']] = d;

//   });
//   returnData.maxTons = maxTons;
//   return returnData;
// }
