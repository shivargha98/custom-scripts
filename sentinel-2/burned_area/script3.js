function setup() {
  return {
    input: [{
      bands: [
                  "B02",
          "B03",
          "B04",
          "B05",
          "B08",
      ]
    }],
    output: { bands: 1 },
    mosaicking: "ORBIT"
  }
}


function stretch(val, min, max) {return (val - min) / (max - min);}

function filterScenes (scenes, inputMetadata) {  
return scenes.filter(function (scene) {
// set dates for pre-and-post fire analysis
var allowedDates = ["2019-05-19","2020-05-18"]; // Knysna fires
// format scene date timestamp to match allowed dates 
var sceneDateStr = dateformat(scene.date);
if (allowedDates.indexOf(sceneDateStr)!= -1) return true;
else return false;
  });
}

// Normalized Burn Ration calculation
function dateformat(d){  
  var dd = d.getDate();
  var mm = d.getMonth()+1;
  var yyyy = d.getFullYear();
  if(dd<10){dd='0'+dd}
  if(mm<10){mm='0'+mm}
  var isodate = yyyy+'-'+mm+'-'+dd;
  return isodate;
}

function evaluatePixel(samples,scenes) {  
  
  var ndvipre = 0;
  var ndvipost = 0;  
  
  // get pre-fire image
  ndvipre = index(samples[1].B08, samples[1].B04);
  // get post-fire image
  ndvipost = index(samples[0].B08, samples[0].B04);  
  // get difference 
  var dnbr = ndvipre - ndvipost;
  // set output display layers
  return [dnbr];
  
}