// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68

// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var cantBoxes = 15
var boxSize = 40

var wallsV = [];
var wallsH = [];

var population

var testing = 0
var created = 0
var rate = 90
var loopY = 0
var generationCount = 0

var bestFitness = 0
var bestBoxes = []

function setup() {
  createCanvas((boxSize * cantBoxes + 100) * 2, (boxSize * cantBoxes + 100) * 3);
  engine = Engine.create();
  world = engine.world;
  Engine.run(engine);
  engine.timing.timeScale = 1.1
  //Engine.run(engine);
  var options = {
    isStatic: true
  }
  for (var i = 0; i < 3; i++) {
    wallsH.push(Bodies.rectangle(width / 2, height - (height / 3) * i, width, 50, options))
  }
  for (var i = 0; i < 5; i++) {
    wallsV.push(Bodies.rectangle(width - (width / 4) * i, height / 2, 50, height, options))
  }

  World.add(world, wallsV)
  World.add(world, wallsH);


  population = new Population(108)

}


function mousePressed() {

}

function draw() {
  background(51);


  if (testing < population.tries.length - 8) {
    // Comienzo de TRY Code
    for (var i = 0; i < 9; i++) {
      if (created < cantBoxes * rate ) {
        if (created % rate == 0) {
          x = population.tries[testing + i].genes[created / rate].x + (width / 4 * (i % 3))
          y = population.tries[testing + i].genes[created / rate].y + (height / 3 * loopY)
          boxes.push(new Box(x, y, boxSize, boxSize));
          if (i % 3 == 2) loopY++
        }
      } else {
        for (var j = 0; j < 9; j++) {
          population.tries[testing + j].evaluate(j)
        }
        nextTry()
        break
      } // End Try Code
    }
    created++
    loopY = 0
  } else {
    // Comienzo phase 2
    //  population.createPool()
    result = population.mate()
    //population.mutate(result)
    population = new Population(0, result)
    nextGen()
    // Fin phase 2
  }

  for (var i = 0; i < boxes.length; i++) {
    boxes[i].show();
  }
  for (var i = 0; i < bestBoxes.length; i++) {
    bestBoxes[i].display()
  }

  noStroke(255);
  fill(170);
  rectMode(CENTER);
  for (var i = 0; i < wallsH.length; i++) {
    rect(wallsH[i].position.x, wallsH[i].position.y, width, 50)
  }

  for (var i = 0; i < wallsV.length; i++) {
    rect(wallsV[i].position.x, wallsV[i].position.y, 50, height)
  }

}


function nextTry() {
  testing += 9
  created = -1
  loopY = 0
  World.clear(world, true)
  boxes.splice(0, boxes.length)
}

function nextGen() {
  testing = 0
  generationCount++
}
