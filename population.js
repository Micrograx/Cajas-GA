function Population(c, tries) {

  if (tries) {
    this.tries = tries
  } else {
    this.tries = []
    for (var i = 0; i < c; i++) {
      this.tries[i] = new Try()
    }
  }

  this.mate = function() {
    var sum = 0;
    for (var i = 0; i < this.tries.length; i++) {
      sum += this.tries[i].fitness;
    }
    for (var i = 0; i < this.tries.length; i++) {
      this.tries[i].prob = this.tries[i].fitness / sum;
    }
    var newTries = []
    for (var i = 0; i < this.tries.length; i++) {
      var mateA = this.pickOne(this.tries)
      var mateB = this.pickOne(this.tries)
      newTries[i] = this.crossOver(mateA, mateB)
    }
    console.log("NEXT GENERATION: " + (generationCount + 1))   
    return newTries
  }

  this.pickOne = function(list) {
    var index = 0;
    var r = random(1);

    while (r > 0) {
      r = r - list[index].prob;
      index++;
    }
    index--;
    return list[index];

  }

  this.crossOver = function(a, b) {
    var newGenes = []
    for (var i = 0; i < cantBoxes; i++) {
      var x = (a.genes[i].x + b.genes[i].x) / 2
      var y = (a.genes[i].y + b.genes[i].y) / 2
      newGenes[i] = createVector(x, y)
    }
    return new Try(newGenes)
  }

}
