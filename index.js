var step = 40;
var sceneSize = 10;

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

window.onload = function() {
  var scene = document.createElement("div");
  scene.className = "scene";
  scene.style.height = step * sceneSize + "px";
  scene.style.width = step * sceneSize + "px";
  document.body.appendChild(scene);

  var walls = [];

  for (var i = 1; i < sceneSize - 1; i++) {
    var wall = document.createElement("div");
    wall.className = "wall";
    wall.style.height = step + "px";
    wall.style.width = step + "px";
    wall.style.top = "0px";
    wall.style.left = i * step + "px";
    scene.appendChild(wall);
    walls.push(wall);

    var wall = document.createElement("div");
    wall.className = "wall";
    wall.style.height = step + "px";
    wall.style.width = step + "px";
    wall.style.top = step * (sceneSize - 1) + "px";
    wall.style.left = i * step + "px";
    scene.appendChild(wall);
    walls.push(wall);

    var wall = document.createElement("div");
    wall.className = "wall";
    wall.style.height = step + "px";
    wall.style.width = step + "px";
    wall.style.top = i * step + "px";
    wall.style.left = "0px";
    scene.appendChild(wall);
    walls.push(wall);

    var wall = document.createElement("div");
    wall.className = "wall";
    wall.style.height = step + "px";
    wall.style.width = step + "px";
    wall.style.top = i * step + "px";
    wall.style.left = step * (sceneSize - 1) + "px";
    scene.appendChild(wall);
    walls.push(wall);
  }

  var player = document.createElement("div");
  player.className = "player";
  player.style.height = step + "px";
  player.style.width = step + "px";
  player.style.top = step + "px";
  player.style.left = step + "px";
  scene.appendChild(player);

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 38:
        moveElement(player, -1, 0, step, walls)
        break;
      case 39:
        moveElement(player, 0, 1, step, walls)
        break;
      case 40:
        moveElement(player, 1, 0, step, walls)
        break;
      case 37:
        moveElement(player, 0, -1, step, walls)
        break;
      default:
        break;
    }
  });
}
