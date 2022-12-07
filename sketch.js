async function setup() {
  createCanvas(700, 700);
  background(30);
  // drawTree(400, 700, 30, 50, 180);
  for (let y = 0; y < height; y += 6) {
    for (let x = 0; x < width; x += 6) {
      let noiseY = y + noise(x * 0.005, y * 0.007) * 100;

      fill(0);
      circle(x, noiseY, 12);
      let grassNoise = noise(x * 0.012, y * 0.006, 6000);
      if (grassNoise < 0.6) {
        let distRatio = grassNoise / 0.6;
        let heightRatio = 1 - distRatio;

        let from = color(255, 239, 196);
        let to = color(252, 184, 0);
        let interColor = lerpColor(from, to, noiseY);
        fill(interColor);
        drawGrass(x, noiseY, 30 * heightRatio, random(10, 20), 180);
      }

      let treeNoise = noise(x * 0.012, y * 0.006, 6000);
      if (treeNoise < 0.25) {
        stroke(255);
        fill(30);
        if (random(0, 1) < 0.025) {
          drawTree(x, noiseY, 40, 40, 180);
        }
      }
    }
    await sleep(10);
  }
}

function drawGrass(_x, _y, _nodeWidth, _nodeCount, _startDir) {
  let xPos = _x;
  let yPos = _y;
  let nowDir = _startDir;
  let nowNodeWidth = _nodeWidth;
  for (let i = 0; i < _nodeCount; i++) {
    let t = i / _nodeCount;
    let size = 1 - t;
    nowNodeWidth = _nodeWidth * size;
    xPos += sin(radians(nowDir)) * nowNodeWidth;
    yPos += cos(radians(nowDir)) * nowNodeWidth;

    let noiseValue = noise(xPos * 0.02, yPos * 0.7);
    nowDir += lerp(-10, 10, noiseValue);

    push();

    translate(xPos, yPos);
    rotate(radians(-nowDir));

    // rect(-0.5 * _nodeWidth, -0.5 * _nodeWidth, nowNodeWidth, nowNodeWidth);
    // circle(-0.5 * _nodeWidth, -0.5 * _nodeWidth, nowNodeWidth);
    ellipse(
      -0.5 * _nodeWidth,
      -0.5 * _nodeWidth,
      nowNodeWidth / 2,
      nowNodeWidth
    );
    pop();
  }
}

function drawTree(_x, _y, _nodeWidth, _nodeCount, _startDir) {
  let xPos = _x;
  let yPos = _y;
  let nowDir = _startDir;
  let nowNodeWidth = _nodeWidth;
  for (let i = 0; i < _nodeCount; i++) {
    let t = i / _nodeCount;
    let size = 1 - t;
    nowNodeWidth = _nodeWidth * size;

    if (random(0, 1) < 0.05 && nowNodeWidth > 6) {
      drawTree(
        xPos,
        yPos,
        nowNodeWidth,
        (_nodeCount - i) * random(0.5, 1.6),
        nowDir + random(-30, 30)
      );
    }

    xPos += sin(radians(nowDir)) * nowNodeWidth;
    yPos += cos(radians(nowDir)) * nowNodeWidth;

    let noiseValue = noise(xPos * 0.02, yPos * 0.7);
    nowDir += lerp(-10, 10, noiseValue);

    push();

    translate(xPos, yPos);
    rotate(radians(-nowDir));

    rect(
      -0.5 * _nodeWidth,
      -0.5 * _nodeWidth,
      nowNodeWidth * 0.6,
      nowNodeWidth * 0.8
    );
    pop();
  }
}

function draw() {}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
