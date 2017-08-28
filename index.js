var step = 40;
var sceneSize = 50;
var sightRadius = step * 5;

function moveElement(element, top, left, step, colliders) {
  var oldTopPosition = element.style.top;
  var oldLeftPosition = element.style.left;

  var newTopPosition = (parseInt(element.style.top) || 0) + (step * top);
  var newLeftPosition = (parseInt(element.style.left) || 0) + (step * left);

  element.style.top = newTopPosition + "px";
  element.style.left = newLeftPosition + "px";

  if (isColliding(element, colliders)) {
    element.style.top = oldTopPosition;
    element.style.left = oldLeftPosition;
  }
}

function isColliding(element, colliders) {
  for (var i = 0; i < colliders.length; i++) {
    if (element.style.left === colliders[i].style.left && element.style.top === colliders[i].style.top) {
      return true;
    }
  }

  return false;
}

function centerCamera(scene, player) {
  scene.style.left = (document.body.clientWidth/2) - parseInt(player.style.left) + "px";
  scene.style.top = (document.body.clientHeight/2) - parseInt(player.style.top) + "px";
}

function createElement(className, height, width, x, y) {
  var element = document.createElement("div");
  element.className = className;
  element.style.height = height + "px";
  element.style.width = width + "px";
  element.style.left = x + "px";
  element.style.top = y + "px";
  return element;
}

function getDistance (element1, element2) {
  var element1X = parseInt(element1.style.left) + parseInt(element1.style.width)/2;
  var element1Y = parseInt(element1.style.top) + parseInt(element1.style.height)/2;
  var element2X = parseInt(element2.style.left) + parseInt(element2.style.width)/2;
  var element2Y = parseInt(element2.style.top) + parseInt(element2.style.height)/2;

  return Math.sqrt(Math.pow(element1X - element2X, 2) + Math.pow(element1Y - element2Y, 2));
}

function updateObjectsVisibility(element, objects, sightRadius) {
  for (var i = 0; i < objects.length; i++) {
    var distance = getDistance(element, objects[i]);

    if (distance >= sightRadius) {
      objects[i].style.opacity = 0;
    } else if (distance < sightRadius * 0.8) {
      objects[i].style.opacity = 1;
    } else {
      objects[i].style.opacity = 1 - (distance/sightRadius);
    }
  }
}

window.onload = function() {
  var scene = createElement("scene", step * sceneSize, step * sceneSize, 0, 0)
  document.body.appendChild(scene);

  var walls = [];
  var floor = [];

  for (var i = 1; i < sceneSize - 1; i++) {
    for (var j = 1; j < sceneSize - 1; j++) {
      var floorPiece = createElement("floor", step, step, step * i, step * j)
      floorPiece.style.transform = "rotate(" + parseInt(Math.random() * 4) * 90 +  "deg)";
      floorPiece.style.boxShadow = "inset 0 0 " + step + "px " + step + "px rgba(0, 0, 0, " + [0, 0.25, 0.5][Math.ceil(Math.random() * 3)] + ")";
      scene.appendChild(floorPiece);
      floor.push(floorPiece);
    }

    // Create north walls
    var wall = createElement("wall", step, step, i * step, 0);
    wall.style.transform = "rotate(180deg)";
    scene.appendChild(wall);
    walls.push(wall);

    // Create south walls
    var wall = createElement("wall", step, step, i * step, step * (sceneSize - 1));
    wall.style.transform = "rotate(0deg)";
    scene.appendChild(wall);
    walls.push(wall);

    // Create west walls
    var wall = createElement("wall", step, step, 0, i * step);
    wall.style.transform = "rotate(90deg)";
    scene.appendChild(wall);
    walls.push(wall);

    // Create east walls
    var wall = createElement("wall", step, step, step * (sceneSize - 1), i * step);
    wall.style.transform = "rotate(-90deg)";
    scene.appendChild(wall);
    walls.push(wall);
  }

  var player = createElement("player", step, step, step, step);
  scene.appendChild(player);

  centerCamera(scene, player);
  updateObjectsVisibility(player, [].concat(walls).concat(floor), sightRadius);

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 38:
        moveElement(player, -1, 0, step, walls)
        centerCamera(scene, player)
        updateObjectsVisibility(player, [].concat(walls).concat(floor), sightRadius);
        break;
      case 39:
        moveElement(player, 0, 1, step, walls)
        centerCamera(scene, player)
        updateObjectsVisibility(player, [].concat(walls).concat(floor), sightRadius);
        break;
      case 40:
        moveElement(player, 1, 0, step, walls)
        centerCamera(scene, player)
        updateObjectsVisibility(player, [].concat(walls).concat(floor), sightRadius);
        break;
      case 37:
        moveElement(player, 0, -1, step, walls)
        centerCamera(scene, player)
        updateObjectsVisibility(player, [].concat(walls).concat(floor), sightRadius);
        break;
      default:
        break;
    }
  });
}
