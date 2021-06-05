song="";
left_wristx=0;
left_wristy=0;
right_wristx=0;
right_wristy=0;
scoreLeftWrist=0;
scoreRightWrist=0;
leftWristNum=0;
function preload(){
    song=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,600);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide()

    posenet=ml5.poseNet(video,modelLoaded);
    posenet.on('pose',gotPoses);

}
function draw(){
    image(video,0,0,600,600);
    fill("#4733ff");
    stroke("#000000");
    circle(right_wristx,right_wristy,20);
    if(scoreRightWrist > 0.2){
        if(right_wristy>0 && right_wristy<=100){
            document.getElementById("speed").innerHTML="Speed = 0.5x";
            song.rate(0.5);
        }
        else if(right_wristy>100 && right_wristy<=200){
            document.getElementById("speed").innerHTML="Speed  = 1x";
            song.rate(1);
        }
        else if(right_wristy>200 && right_wristy<=300){
            document.getElementById("speed").innerHTML="Speed  = 1.5x";
            song.rate(1.5);
        }
        else if(right_wristy>300 && right_wristy<=400){
            document.getElementById("speed").innerHTML="Speed  = 2x";
            song.rate(2);
        }
        else if(right_wristy>400 && right_wristy<=500){
            document.getElementById("speed").innerHTML="Speed  = Super FAST!!";
            song.rate(2.5);
        }
    }
    if(scoreLeftWrist > 0.2){
        circle(left_wristx,left_wristy,20);
        leftWristNum=Number(left_wristy);
        removeDece=floor(leftWristNum);
        volume=removeDece/500;
        document.getElementById("volume").innerHTML="Volume = "+volume;
        song.setVolume(volume);
    }
    
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function gotPoses(results){
    if(results.length>0){
        console.log(results);
       left_wristx=results[0].pose.leftWrist.x;
       left_wristy=results[0].pose.leftWrist.y;
       right_wristx=results[0].pose.rightWrist.x;
       right_wristy=results[0].pose.rightWrist.y;
       console.log("Left Wrist x= "+left_wristx+", Left Wrist y= "+left_wristy);
       console.log("Right Wrist x= "+right_wristx+", Right Wrist y= "+right_wristy);
       scoreRightWrist=results[0].pose.keypoints[10].score;
       scoreLeftWrist=results[0].pose.keypoints[9].score;
       console.log("Score Right wrisit = "+scoreRightWrist);
       console.log("Score Left wrisit = "+scoreLeftWrist);
    }
}
function modelLoaded()
{
    console.log("MODEL LADED!")
}