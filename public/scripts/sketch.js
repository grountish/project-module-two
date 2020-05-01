p5.disableFriendlyErrors = true;

let classifier;
let img;
let currentIndex = 0;
let allImages = [];
let predictions = [];

let inputImage = document.getElementById('img')
let urlImg

inputImage.addEventListener('change', (e)=>{
  urlImg = URL.createObjectURL(event.target.files[0])
  imageReady(urlImg)
})

function preload() {
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/6qPt5DIx-/model.json');
  data = loadJSON('assets/data.json');
}

function setup() {
 
  // leave setup here, do not delete!
 
}

function imageReady(img1) {
  img1 = createImg(urlImg,'alt' ,()=>{
    classifier.classify(img1, gotResult)
  })
  img1.hide()
}


let workHome
function gotResult(err, results) {
  if (err) {
    console.error(err);
  }
  console.log(results)
  information = {
    name: allImages[currentIndex],
    result: results
  };

  predictions.push(information);

  let plantArr = ['asd','asdf','asdd','dsfsdf']
  switch (results[0].label) {
    case 'PLANT':
      workHome = ' someth with plants'
      break;
      case 'CAT':
      workHome = ' let your cat join your gym session!'
      break;
      case 'SOFA':
      workHome = ' someth with sofa'
      break;
      case 'COFFEE TABLE':
      workHome = ' someth with coffee '
      break;
      case 'CHAIR':
      workHome = ' someth with chairs'
      break;

    default: workHome = 'asdd'
      break;
  }
  createDiv('thats seems like a ' + results[0].label + ' you can ' +workHome);
  
}
