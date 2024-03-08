
// Get the belly button endpoint
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// create start function 
function init() {
    // retreive data
    d3.json(url).then(function(data) {

        // select the dropdown 
        let dropdown = d3.select('#selDataset');
        
        // extract the names
        let names = data.names;
        console.log(names);

        // iterate over the names array and append to dropdown 
        for (i=0; i<names.length; i++){
            dropdown.append("option").text(names[i]).property("value", names[i])
        }

        // set charts with first name data
        bar(names[0])
        bubble(names[0])
        metadata(names[0])
    })
    }
// Update dashboard 
function optionChanged(samplenum) { 
    // log new value
    console.log(samplenum); 
    
    // call functions
    bar(samplenum);
    bubble(samplenum);
    metadata(samplenum);
        
    };

// Bar chart 
function bar(samplenum){
    // retrieve data 
    d3.json(url).then(function(data) {

    // extract samplesdata
    let samplesdata = data.samples;

    // filter samplesdata based on samplenum
    let filterdata = samplesdata.filter(i => i["id"] === samplenum);   
        console.log(filterdata);

    // chart bar top 10 OTUs 
    let trace = [{    
        x: filterdata[0].sample_values.slice(0,10).reverse(),
        y: filterdata[0].otu_ids.slice(0,10).reverse().map((i) => `OTU ${i}`),
        text: filterdata[0].otu_labels.slice(0,10).reverse(),
        type: "bar",
        orientation: "h"
    }];
    // render plot 
    Plotly.newPlot("bar", trace); 
    })
};

// Bubble chart
function bubble(samplenum){
    // retrieve data 
    d3.json(url).then(function(data) {

    // extract samplesdata
    let samplesdata = data.samples;

    // filter samplesdata based on samplenum
    let filterdata = samplesdata.filter(i => i["id"] === samplenum);   
    
    // chart bubble      
    let trace1 = [{
        x: filterdata[0].otu_ids,
        y: filterdata[0].sample_values,
        text: filterdata[0].otu_labels,
        mode: 'markers',
        marker: {
          size: filterdata[0].sample_values ,
          color: filterdata[0].otu_ids,
          opacity: 0.6,
        }
      }];
    // render plot 
    Plotly.newPlot("bubble", trace1); 
    })     
};

// Metadata info 
function metadata(samplenum){
    // retrieve data 
    d3.json(url).then(function(data) {

    // extract metadata
    let metadataset = data.metadata;
     
    // filter samplesdata based on samplenum
    let filterdata = metadataset.filter(i => i["id"].toString() === samplenum);   
    
    // select demographics info and clear 
    d3.select("#sample-metadata").html("");

    // set up object key and value 
    let entries = Object.entries(filterdata[0]);
    
    // iterate over object and append to demographics  
    entries.forEach(([key,value]) => {
        d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
})
}

// Call start function
init(); 