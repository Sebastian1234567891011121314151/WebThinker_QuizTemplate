
//
let handPose;
let hands = [];
let video;
let fingerTip;
let platform;

function preload(){

    let options = {
        flipped: false,
        runtime: "tfjs",
        modelType: "lite",
        detectorModelUrl: undefined,
        landmarkModeUrl: undefined,
    }

    handPose = ml5.handPose(options);
}

function setup () {

    new Canvas(640, 480);

    let constraints = {
        video:{
            mandatory:{
                midWidth: width,
                minHeight: height
            },
            optional: [{minFrameRate: 60}]
        },
        audio: false,
        flipped: false,
        };  

    video = createCapture(constraints);
    video.size(width, height);
    video.hide();

    handPose.detectStart(video, gotHands);

    fingerTip=new Sprite();
    fingerTip.diameter=30;
    fingerTip.color="white"

    platform=new Sprite(320,400,300,20);
    platform.collider="static";
    platform.color="yellow";

    ball = new Sprite(320, 100, 40);
    ball.bounciness = 1;
    ball.collider = "static";
    ball.color = "red";


}

function gotHands(results){
    hands = results;
}

function draw () {
    image(video,0,0,640,400);

    if (mouse.presses()) {
        ball.collider = "dynamic";
    }


    for(let i=0;i<hands.length;i++){
        let hand=hands[i]
        let keypoint=hand.keypoints[4];
        fingerTip.x=keypoint.x;
        fingerTip.y=keypoint.y;

        platform.x=width-hand.keypoints[4].x;
        platform.y=height-hand.keypoints[4].y;
    }
    if (ball.collides(platform)) {
        points = points + 1;
    

    // Display points at the top of the screen
    fill("white");
    textSize(24);
    text("Points: " + points, 10, 30);
    }

}

//this is for the commit and push test