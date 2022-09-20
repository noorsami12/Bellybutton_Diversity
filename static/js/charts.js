function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("../data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("../data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("../data/samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
      var samples = data.samples;
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSample = samples.filter(obj => obj.id == sample);

    //  5. Create a variable that holds the first sample in the array.
    var first = filteredSample.slice(0);

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = filteredSample.otu_ids;
    var otu_labels = filteredSample.otu_labels;
    var sample_values = filteredSample.sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    reversedData = filteredSample.slice(0,10).reverse();
    var yticks = reversedData.map(otu_ids[9],otu_ids[0])

    // 8. Create the trace for the bar chart. 
    var barData = {
      x: sample_values.slice[0,10],
      y: yticks,
      text: otu_labels.slice[0,10],
      name: "Bacterial Species",
      type: "bar",
      orientation: "v"
    };

    // 9. Create the layout for the bar chart. 
    var barLayout = {
      title: "Top 10 Bacterial Species Found",
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("plot", data, layout);
  });
}

// Bubble Chart 
// Create the buildCharts function.
function buildCharts(sample) {
  // Use d3.json to load and retrieve the samples.json file 
  d3.json("../data/samples.json").then((data) => {
    

    // Deliverable 1 Step 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("plot", data, layout); 

    // 1. Create the trace for the bubble chart.
    var bubbleData = {
      x: sample_values.slice[0,10],
      y: yticks,
      mode: 'markers',
      marker: {
        color: ['rgb(93, 164, 214)', 'rgb(255, 144, 14)',  'rgb(44, 160, 101)', 'rgb(255, 65, 54)'],
        opacity: [1, 0.8, 0.6, 0.4],
        size: [40, 60, 80, 100]
      }
    };

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: 'Top 10 Bacterial Species Found',
      showlegend: false,
      height: 600,
      width: 600,
      hovermode: 'closest'
    };

    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("plot", bubbleData, bubbleLayout); 
  });
}

// Create the buildChart function.
function buildCharts(sample) {
  // Use d3.json to load the samples.json file 
  d3.json("../data/samples.json").then((data) => {
    console.log(data);

    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var metadata = data.metadata;
    var metadataArray = metadata.filter(metaObj => metaObj.id == sample);

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMeta = metadataArray.slice(0);


    // 3. Create a variable that holds the washing frequency.
    var washfreq = metadataArray.wfreq;

    // Use Plotly to plot the bar data and layout.
    Plotly.newPlot("plot", data, layout);
    
    // Use Plotly to plot the bubble data and layout.
    Plotly.newPlot("plot", bubbleData, bubbleLayout);
  
    
    // 4. Create the trace for the gauge chart.
    var gaugeData = [{
      value: washfreq,
      type: "indicator",
      mode: "gauge_number",
      title: {text: "Belly Button Washing Frequency Scrubs Per Week"},
      gauge: {
        axis: {range: [null, 10], dtick: "2"},
        bar: {color: "black"},
        steps: [
          {range: [0,2], color: "red"}
          {range: [2,4], color: "orange"}
          {range: [4,6], color: "yellow"}
          {range: [6,8], color: "green"}
          {range: [8,10], color: "blue"}
        ]
      }
     
  }];
    
    // 5. Create the layout for the gauge chart.
    var gaugeLayout = { 
     automargin: true
    };

    // 6. Use Plotly to plot the gauge data and layout.
    Plotly.newPlot("gauge", gaugeData, gaugeLayout);
  });
}
