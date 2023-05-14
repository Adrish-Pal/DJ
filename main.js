Peter_pan="";
Harry_potter="";
rightWristX = 0;
rightWristY = 0;
leftWristX = 0;
leftWristY = 0;
scoreleftWrist = 0;
song_name = "";
scoreRightWrist = 0;
song_2 = "";


function preload(){
    Peter_pan = loadSound("music2.mp3");
    Harry_potter = loadSound("music.mp3");
}

function setup()
{

    canvas = createCanvas(510,440);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();


    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded()
{
    console.log('PoseNet Is Initialized');
}

function draw()
{
    image(video,0,0,510,440);

    fill("#0000FF");
    stroke("#0000FF");

    song_name = Peter_pan.isPlaying();
    console.log(song_name);

    song_2 = Harry_potter.isPlaying();
    console.log(song_2);

    if(scoreleftWrist > 0.2){
        circle(leftWristX,leftWristY,20);
        Harry_potter.stop();
        if(song_name == false){
            Peter_pan.play();

            console.log("Song Name: Peter Pan Song");
            document.getElementById("song_name").innerHTML = "Song Name: Peter Pan Song";
        }
             
        
    }

    if(scoreRightWrist > 0.2){
        circle(rightWristX,rightWristY,20);
        Peter_pan.stop();
        if(song_2 == false){
            Harry_potter.play();

            console.log("Song Name: Harry Potter Theme Song");
            document.getElementById("song_name").innerHTML = "Song Name: Harry Potter Theme Song";
        }
          
    }
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreleftWrist = " + scoreleftWrist);
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreleftWrist = " + scoreleftWrist);



        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX =" +leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX +"rightWristY = " + rightWristY);

    }
}
