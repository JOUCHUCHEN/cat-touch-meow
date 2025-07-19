let classifier, video, label = "";
let meowSound, catImage;
let userStarted = false;

function preload() {
  meowSound = loadSound('cat-is-purring-27823.mp3');
  catImage = loadImage('sleeping cat.png'); // 這是貓咪圖片
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();
}

function mousePressed() {
  if (!userStarted) {
    userStarted = true;
    classifier = ml5.imageClassifier(
      'https://teachablemachine.withgoogle.com/models/QnJMdBDOh/model.json',
      video,
      () => classifier.classify(gotResult)
    );
  }
}

function gotResult(error, results) {
  if (error) return console.error(error);
  label = results[0].label;
  if (label === "Touching_Cat" && !meowSound.isPlaying()) meowSound.play();
  classifier.classify(gotResult);
}

function draw() {
  background(0);
  image(video, 0, 0);
  image(catImage, width / 2 - 100, height / 2 - 100, 200, 200); // 顯示貓在畫面中間
  
  fill(255);
  textSize(32);
  textAlign(LEFT);
  text("現在分類：" + label, 10, height - 20);

  if (!userStarted) {
    fill(255, 0, 0);
    textSize(24);
    text("請點一下畫面才能開始", 10, 50);
  }
}
