let classifier, video, label = "";
let meowSound;

function preload() {
  meowSound = loadSound('https://purr.objects-us-east-1.dream.io/Purr.ogg');
}

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(640, 480);
  video.hide();

  classifier = ml5.imageClassifier(
    'https://teachablemachine.withgoogle.com/models/UYk5d1ceR/model.json',
    video,
    () => classifier.classify(gotResult)
  );
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
  fill(255);
  textSize(32);
  textAlign(LEFT);
  text("現在分類：" + label, 10, height - 20);
}
