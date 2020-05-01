
let img; let objects = []; let status; let imageFile;
let inputImage = document.getElementById('img');
let imgShow = document.getElementsByTagName('img')
imgShow.className += 'imagShow'

function preload() {
  const classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6qPt5DIx-/', modelReady);
}


// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!")
  status = true;
  setImage()
}

function setImage() {
  inputImage.addEventListener('change', (e) => {
    let urlurl = URL.createObjectURL(event.target.files[0]);
    setup(urlurl)
})}


function setup(urlurl) {
  createCanvas(640, 420);
  img = createImg(urlurl);
  img.size(640, 420) 
  img.class('imagShow')
  setTimeout(() => {
    classifier.classify(img, gotResult);
  }, 5000);
}


// A function to run when we get any errors and the results
function gotResult(err, results) {
  if (err) {
    console.log(err);
  }
  console.log(results)
  objects = results; // DATA FOR SQUARES
}


function draw() {
  // unless the model is loaded, do not draw anything to canvas
  if (status != undefined) {
    //image(img, 0, 0);
    for (let i = 0; i < objects.length; i++) {
      noStroke();
      fill(0, 255, 0);
      textSize(20)
      text(objects[i].className + " " + nfc(objects[i].classProb * 100.0, 2) + "%", objects[i].x * width + 5, objects[i].y * height + 15);
      noFill();
      strokeWeight(4);
      stroke(100, 200, 0);
      rect(objects[i].x * width, objects[i].y * height, objects[i].w * width, objects[i].h * height);
    }
  }
}
