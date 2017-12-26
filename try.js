function Try(genes) {

  this.genes = []
  this.fitness = 0

  if (genes) {
    this.genes = genes
  } else {
    for (var i = 0; i < cantBoxes; i++) {
      x = random(0 + 25 + boxSize, width / 4 - 25 - boxSize )
      //y = 25 + boxSize
      y = random(0 + 25 + boxSize, height / 3 - (i * boxSize) )
      pos = createVector(x, y)
      this.genes.push(pos)
    }
  }

  this.evaluate = function(num) {
    for (var i = 0; i < this.genes.length; i++) {
      if ( abs(boxes[num + i * 9].body.angle) < 10) {
        for (var j = 0; j < this.genes.length; j++) {
          if (i != j) {
            var diffX = floor(abs(boxes[num + i * 9].body.position.x - boxes[num + j * 9].body.position.x))
            var diffY = floor(boxes[num + i * 9].body.position.y) - floor(boxes[num + j * 9].body.position.y) + boxSize
            if (abs(boxes[num + j * 9].body.angle) < 10 && diffY < 5 && diffY > -5 && diffX <= boxSize) {
              var altura = (height / 3 - boxes[num + i * 9].body.position.y) / boxSize - 1
              this.fitness += map(diffX, 0, boxSize, 10, 0) * altura
            }
          }
        }
      }
    }
    if (this.fitness > bestFitness){
      bestFitness = this.fitness
      bestBoxes.splice(0,bestBoxes.length)
      for ( var i = 0; i < this.genes.length;i++){
          bestBoxes.push(boxes[num + i * 9])
      }


      console.log("BEST: " + this.fitness)

    }
  }

}
