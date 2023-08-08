status = "";
object = [];

function setup(){
    canvas = createCanvas(480, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(480, 380);
    video.hide();
}

function draw(){
    image(video, 0, 0, 480, 380);
    if(status != ""){
        objectDetector.detect(video, gotresults);

        for(i=0 ; i<object.length ; i++){
            document.getElementById("status").innerHTML =  "Status : Objects Detected";
            //document.getElementById("number_of_objects").innerHTML = "Number of Objects Detected are: " + objects.length;
            fill("red");
            noFill();
            stroke("red");


            percent = floor(object[i].confidence*100);
            text(object[i].label + " " + percent + "%", object[i].x + 15, object[i].y + 15);
            rect(object[i].x, object[i].y, object[i].width, object[i].height);

            if(object[i].label == object_name){
                video.stop();
                objectDetector.detect(gotresults);
                document.getElementById("object_status").innerHTML = object_name + "found";
                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name + "found");
                synth.speak();
            }
            else{
                document.getElementById("object_status").innerHTML = object_name + " Not found!";
            }
        }
    }

}


function start(){
    objectDetector = ml5.objectDetector('cocossd', modelloaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    object_name = document.getElementById("objectName").value;
}

function gotresults(error, results){
    if(error){
      console.log(error);
    }
    console.log(results);
  
    objects = results;
  }

function modelloaded(){
   console.log("model loaded!");
   status = true;

}