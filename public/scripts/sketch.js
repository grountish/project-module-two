const yolo = ml5.YOLO(modelReady); 
let img; let objects = []; let status; let imageFile;
let inputImage = document.getElementById('img');
//let imageTry = document.getElementById('imageTest')
let imgShow = document.getElementsByTagName('img')
imgShow.className += 'imagShow'

inputImage.addEventListener('change', (e) => {
    let urlurl = URL.createObjectURL(event.target.files[0]);
    // imageTry.src = urlurl;
    // imageTry.width = '200'
    // imageTry.height = '200'
    console.log(urlurl)

    setImg(urlurl)
})

function setImg(urlurl) {
  createCanvas(640, 420);
  img = createImg(urlurl, imageReady);
  //img.hide();
  img.size(640, 420) 
  img.class('imagShow')
  //let inputFile = createFileInput(setImg);
}

// Change the status when the model loads.
function modelReady() {
  console.log("model Ready!")
  status = true;
}

// When the image has been loaded, // get a prediction for that image
function imageReady() {
  console.log('Detecting') 
  yolo.detect(img, gotResult);
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
