//VERSION=3 (auto-converted from 1)

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
var allowedDates = ["2019-05-19","2019-05-19"]; // Knysna fires
// format scene date timestamp to match allowed dates 
var sceneDateStr = dateformat(scene.date);
if (allowedDates.indexOf(sceneDateStr)!= -1) return true;
else return false;
  });
}

// Normalized Burn Ration calculation
function calcNDVI(sample) {
  var denom = sample.B08+sample.B04;
  var nbrval = ((denom!=0) ? (sample.B08-sample.B04) / denom : 0.0);
  return nbrval;
}

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
  ndvipre = calcNDVI(samples[1]);
  // get post-fire image
  ndvipost = calcNDVI(samples[0]);  
  // get difference 
  var dnbr = nbrpre - nbrpost;
  // set output display layers
  return [dnbr];
  
}