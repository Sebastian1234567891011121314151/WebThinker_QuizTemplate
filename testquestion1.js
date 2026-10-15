
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

    platform=new Sprite();
    plat
}

function gotHands(results){
    hands = results;
}

function draw () {
    image(video,0,0,640,400);

    for(let i=0;i<hands.length;i++){
        let hands=hands[i]
        let keypoint=hands.keypoint[8];
        fingerTip.x=keypoint.x;
        fingerTip.y=keypoint.y;
    }
}