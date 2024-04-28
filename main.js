song = ""
scoreRightWrist = 0
scoreLeftWrist = 0
rightWristX = 0
rightWristY = 0
leftWristX = 0
leftWristY = 0

function setup()
{
    canvas = createCanvas(500,400)
    canvas.center()
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, model_loaded)
    poseNet.on('pose', got_poses)
}

function draw()
{
    image(video,0,0,500,400)
    fill('#0B60B0')
    stroke('#0B60B0')
    if (scoreRightWrist > 0.2){
        circle(rightWristX, rightWristY, 20)

        if(rightWristY > 0 && rightWristY <=100){
            document.getElementById('speed').innerHTML = "Speed 0.5"
            song.rate(0.5)
        }

        else if(rightWristY > 100 && rightWristY <=200){
            document.getElementById('speed').innerHTML = "Speed 1"
            song.rate(1)
        }

        else if(rightWristY > 200 && rightWristY <= 300){
            document.getElementById('speed').innerHTML = "Speed 1.5"
            song.rate(1.5)
        }

        else if(rightWristY > 300 && rightWristY <= 400){
            document.getElementById('speed').innerHTML = "Speed 2"
            song.rate(2)
        }

        else if(rightWristY > 400){
            document.getElementById('speed').innerHTML = "Speed 2.5"
            song.rate(2.5)
        }
    }
}

function start()
{
    song.play()
    song.setVolume(1)
    song.rate(1)
}

function preload()
{
    song = loadSound("music.mp3")
}

function model_loaded()
{
    console.log("Model is loaded")
}

function got_poses(results)
{
    if (results.length > 0){
        scoreRightWrist = results[0].pose.keypoints[10].score
        scoreLeftWrist = results[0].pose.keypoints[9].score
        console.log("scoreRightWrist" + scoreRightWrist + "scoreLeftWrist" + scoreLeftWrist)
        rightWristX = results[0].pose.rightWrist.x
        rightWristY = results[0].pose.rightWrist.y
        console.log("rightwristX" + rightWristX + "rightWristY" + rightWristY)
        leftWristX = results[0].pose.leftWrist.x
        leftWristY = results[0].pose.leftWrist.y
        console.log("leftWristX" + leftWristX + "leftWristY" + leftWristY)
    }

}