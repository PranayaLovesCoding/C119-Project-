
random_number = Math.floor((Math.random()*quick_draw_data_set.length)+1);
Element_of_array = quick_draw_data_set[random_number];
document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn: "+Element_of_array;

timer_counter = 0;
timer_check = "";
drawn_sketch = "";
answer_holder = "";
score = 0;
sketch = Element_of_ray;

function preload(){
    classifier = ml5.imageClassifier("DoodleNet");
}

function draw()
{
    stroke(0);
    strokeWeight(10);
    if(mouseIsPressed){
    line(pmouseX,pmouseY,mouseX,mouseY);
    }

    check_sketch();
    if(drawn_sketch == sketch){
        answer_holder = "set";
        score = score+1;
        document.getElementById("score").innerHTML = "Score: "+score;
    }
}

function check_sketch(){
timer_counter++;
document.getElementById("timer").innerHTML = "Timer: "+timer_counter;
if(timer_counter>400){
    document.getElementById("your_sketch").innerHTML = "Your Sketch";
    document.getElementById("confidence").innerHTML = "Confidence";
    timer_counter= 0;
    timer_check = "completed";
}
if(timer_check = "completed"){
    answer_holder = "set";
    timer_check = "";
    answer_holder = "";
    update_canvas();
}
}

function update_canvas(){
     background("white");
     sketch = Element_of_array;
     document.getElementById("sketch_to_be_drawn").innerHTML = "Sketch To Be Drawn"+sketch;
}

function setup(){
    canvas = createCanvas(400,300);
    canvas.position(480,300);
    background("white");
}

function ClassifyCanvas(){
    classifier.classify(canvas,gotResults);
}

function gotResults(error,results){
    if(error){
        console.error(error);
    }
    console.log(results);
    drawn_sketch = results[0].label;   
    document.getElementById("your_sketch").innerHTML = "Your Sketch: "+results[0].label;
    document.getElementById("confidence").innerHTML = "Confidence: "+Math.round(results[0].confidence * 100)+'%';
}   