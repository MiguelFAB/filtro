let noseX = 0;
let noseY = 0;
let capybara;

function preload() {
  capybara = loadImage('capybara.png');
}

function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(300, 300);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function modelLoaded() {
  console.log('PoseNet foi inicializado');
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    noseX = results[0].pose.nose.x;
    noseY = results[0].pose.nose.y;
  }
}

function draw() {
  image(video, 0, 0, 300, 300);
  
  const faceWidth = dist(noseX, noseY, results[0].pose.leftEar.x, results[0].pose.rightEar.x);
  const capybaraWidth = faceWidth * 1.5; // Ajuste o fator multiplicativo para dimensionar o filtro corretamente

  const capybaraHeight = (capybara.height / capybara.width) * capybaraWidth;
  
  const capybaraX = noseX - capybaraWidth / 2;
  const capybaraY = noseY - capybaraHeight / 2;
  
  image(capybara, capybaraX, capybaraY, capybaraWidth, capybaraHeight);
}

function takeSnapshot() {
  save('myFilterImage.png');
}