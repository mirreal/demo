//defiene(require, exports, module) {}


function Scratcher() {
  this.canvas = document.querySelector('canvas');
  this.context = this.canvas.getContext('2d');

  this.last = {};

  this.init();
}

Scratcher.prototype.init = function() {
  this.width = 300;
  this.height = 200;

  this.layer(this.width, this.height);
  this.info();
  this.listen();
};

Scratcher.prototype.info = function() {
  document.querySelector('.g-info').innerHTML = 'Can U see me?';
};

Scratcher.prototype.layer = function(width, height) {
  var ctx = this.context;

  ctx.fillStyle = 'orange';
  ctx.fillRect(0, 0, width, height);

  ctx.globalCompositeOperation = 'destination-out';
};

Scratcher.prototype.listen = function() {
  var self = this;

  var touchdown = false;
  var sessionId = 0;

  var canvas = this.canvas,
      ctx = this.context;

  var color = 'blue',
      size = 48;

  /*
  canvas.onmouseup = function(e) {
    e.preventDefault();
    touchdown = false;
  };

  canvas.onmousedown = function(e) {
    e.preventDefault();
    touchdown = true;
    sessionId = Date.now();
  };

  canvas.onmousemove = function(e) {
    e.preventDefault();
    if (!touchdown && !e.targetTouches) return;

    var bbox = canvas.getBoundingClientRect();
    var x = e.clientX - bbox.left * (canvas.width  / bbox.width);
    var y = e.clientY - bbox.top  * (canvas.height / bbox.height);

    self.move(x, y, color, size, sessionId);
  };
  */
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    touchdown = true;
    sessionId = Date.now();
  });

  canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    touchdown = false;

    var width = self.width,
        height = self.height;
    var data = ctx.getImageData(0, 0, width, height).data;

    for (var i = 0, j = 0; i < data.length; i += 4) {
      if (!(data[i] || data[i+1] || data[i+2] || data[i+3])) {
        j++;
      }
    }

    (j >= width * height * 0.8) && (alert('well done'));
  });

  canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    if (!touchdown && !event.targetTouches) return;

    var x = e.targetTouches[0].clientX;
    var y = e.targetTouches[0].clientY;
    var bbox = canvas.getBoundingClientRect();

    x -= bbox.left * (canvas.width  / bbox.width);
    y -= bbox.top  * (canvas.height / bbox.height);
    x = parseInt(x);
    y = parseInt(y);

    self.move(x, y, color, size, sessionId);
  });
};

Scratcher.prototype.move = function(x, y, color, size, id) {
  var circle = {
    x: x,
    y: y,
    color: color,
    size: size,
    sessionId: id
  };

  this.drawLine(circle);
};

Scratcher.prototype.drawLine = function(circle) {
  var ctx = this.context;

  ctx.strokeStyle = circle.color;
  ctx.fillStyle = circle.color;
  ctx.lineWidth = circle.size;
  ctx.lineCap = 'round';

  ctx.beginPath()

  var sessionId = circle.sessionId;
  if (this.last[sessionId]) {
    ctx.moveTo(this.last[sessionId].x, this.last[sessionId].y);
    ctx.lineTo(circle.x, circle.y);
    ctx.stroke();
  } else {
    ctx.moveTo(circle.x, circle.y);
    ctx.arc(circle.x, circle.y, circle.size / 2, 0,  Math.PI*2, false);
    ctx.fill();
  }
  ctx.closePath();

  this.last[sessionId] = circle;
};


new Scratcher();

