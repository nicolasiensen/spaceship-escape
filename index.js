window.onload = function() {
  var scene = document.createElement("div");
  scene.className = "scene";
  scene.style.height = "1000px";
  scene.style.width = "1000px";
  document.body.appendChild(scene);

  var player = document.createElement("div");
  player.className = "player";
  scene.appendChild(player);

  window.addEventListener("keydown", function(e) {
    switch (e.keyCode) {
      case 38:
        player.style.top = ((parseInt(player.style.top) || 0) - 50) + "px";
        break;
      case 39:
        player.style.left = ((parseInt(player.style.left) || 0) + 50) + "px";
        break;
      case 40:
        player.style.top = ((parseInt(player.style.top) || 0) + 50) + "px";
        break;
      case 37:
        player.style.left = ((parseInt(player.style.left) || 0) - 50) + "px";
        break;
      default:
        break;
    }
  });
}
