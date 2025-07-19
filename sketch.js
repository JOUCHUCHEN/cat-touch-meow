let classifier, video, label = "";
let meowSound;
let userStarted = false;

function preload() {
  meowSound = loadSound('cat-is-purring-27823.mp3');
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
      () => classifyStart()
    );
  } else {
    meowSound.play(); // 手動測試用
  }
}

function classifyStart() {
  classifier.classify(video, gotResult);
}

function gotResult(error, results) {
  if (error) return console.error(error);
  label = results[0].label;
  if (label === "Touching_Cat" && !meowSound.isPlaying()) meowSound.play();
  classifyStart();
}

function draw() {
  background(0);

  // 鏡像翻轉，畫面變正常
  translate(width, 0);
  scale(-1, 1);
  image(video, 0, 0);

  // 顯示現在分類結果
  fill(255);
  textSize(32);
  textAlign(LEFT);
  text("現在分類：" + label, 10, height - 20);

  if (!userStarted) {
    fill(255, 0, 0);
    textSize(24);
    text("請點一下畫面才能開始", 10, 50);
  }

  if (label === "Touching_Cat") {
    fill(0, 255, 0);
    textSize(24);
    text("已觸發！Touching_Cat", 10, 80);
  }
}
