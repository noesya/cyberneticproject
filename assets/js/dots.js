
var Engine = function (el, Experiment) {
  // container infos
  this.el = el;

  this.width = this.el.offsetWidth;
  this.height = this.el.offsetHeight;

  // an Array of inputs
  this.inputs = [];

  // WHY SHOULD NAME BE A FUNCTION???

  // CanvasInfos
  this.canvas = null;
  this.ctx = null;

  this.start = function () {
    // We call the run function
    run.bind(this)();
  };

  this.destroy = function () {
    // Notify gameObject
    this.gameObject.destroy();
    // kill it!
    this.gameObject = null;
  };

  this.reset = function () {
    // we call game object reseter
    this.gameObject.reset();
  };

  this.getImage = function () {
    return this.canvas.toDataURL();
  };

  // The current Date
  this.now = 0;

  // Device capture Time
  this.captureTime = 0;


  /**
   * Private Methods
   */

  function initCanvas() {
    // create The Canvas
    this.canvas = document.createElement('canvas');
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    // we clean the DOM
    this.el.innerHTML = '';
    // append canvas to DOM
    this.el.appendChild(this.canvas);

    // get 2d Context
    this.ctx = this.canvas.getContext('2d');
  }

  function initGameObject() {
    this.gameObject = new Experiment(this);
    this.gameObject.init();
  }

  function run() {
    requestAnimFrame(run.bind(this));
    // update inputs!
    this.now = new Date().getTime();

    // run game
    this.gameObject.run();
  }

  // Paul irish requestAnimFramePolyfill
  var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.oRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
        window.setTimeout(callback, 1000 / 60);
      };
  })();

  // Call the initers
  initCanvas.bind(this)();
  initGameObject.bind(this)();
};


var Dots = function (engine) {
  this.engine = engine;
  var COLOR_1 = '#a0eff4';
  var COLOR_2 = '#000000';
  var COLOR_3 = 'red';
  var COLOR_4 = 'blue';
  var CELL_SIZE = 30;
  var point_color = COLOR_1;
  var WORLD = [];
  var WIDTH = this.engine.width / CELL_SIZE | 0;
  var HEIGHT = this.engine.height / CELL_SIZE | 0;
  var MAX_QTY = WIDTH * HEIGHT;
  var qty = 0;
  var tick = 0;
  var tick2 = 0;
  var pass = 0;
  /**
   * This function is called after we created your pobject
   */
  this.init = function () {
    for (var x = 0; x < WIDTH; ++x) {
      WORLD[x] = [];
      for (var y = 0; y < HEIGHT; ++y) {
        WORLD[x][y] = -1;
      }
    }
    this.animate();
  };

  var ctx = engine.ctx;

  /**
   * This function is called every frames
   */
  this.run = function () {
    if (qty > MAX_QTY * 2) {
      this.empty();
    }
    this.animate();

    // this.fill();
  };


  this.animate = function () {
    tick += 1;
    if (tick % 3 !== 0) return;

    if (tick % 100 === 0) {
      // this.fill();
      // this.engine.ctx.clearRect(0, 0, this.engine.width, this.engine.height);
    }

    if (qty > MAX_QTY) {
      point_color = point_color === COLOR_1 ? COLOR_2 : COLOR_1;
    }

    for( var i = 0; i < 30; i += 1) {
      this.point(Math.round(Math.random() * WIDTH), Math.round(Math.random() * HEIGHT));
    }
  }

  this.fill = function () {
    // tick += 1;

    // if (tick % 30 !== 0) return;

    this.engine.ctx.clearRect(0, 0, this.engine.width, this.engine.height);

    for (var x = 0; x < WIDTH; ++x) {
      for (var y = 0; y < HEIGHT; ++y) {
        this.point(x, y);
      }
    }
  }

  this.point = function (x, y, forceColor) {
    var dx = (this.engine.width - WIDTH * CELL_SIZE) / 2 | 0;
    var dy = (this.engine.height - HEIGHT * CELL_SIZE) / 2 | 0;

    var size = point_color === COLOR_1 ? 1 : 0.5
    // ctx.fillStyle = point_color + Math.round(y / HEIGHT * 100);
    ctx.fillStyle = point_color;

    if (Math.random() > 0.9) {
      ctx.fillStyle = COLOR_3;
    }

    if (forceColor) {
      ctx.fillStyle = forceColor;
    }
    ctx.shadowBlur = 20;
    ctx.shadowColor = ctx.fillStyle;
    

    // if (x % 2 == 0 && y % 2 == 0) {
      this.addLine(x * CELL_SIZE + dx, y * CELL_SIZE + dy, ctx.fillStyle);

      ctx.beginPath();
      ctx.arc(x * CELL_SIZE + dx, y * CELL_SIZE + dy, 5, 0, Math.PI * 2, true);
      ctx.fill();
      
    // }

    qty += 1;
  }

  this.empty = function () {
    ctx.clearRect(tick2 * CELL_SIZE, 0, CELL_SIZE, this.engine.height);

    tick2 += 1;
    
    if (tick2 > WIDTH * 2) {
      qty = 0;
      tick2 = 0;
    }

    // ctx.fillStyle = COLOR_2;
    // ctx.shadowBlur = 0;
    // ctx.beginPath();
    // ctx.arc(x * CELL_SIZE + dx, y * CELL_SIZE + dy, 5, 0, Math.PI * 2, true);
    // ctx.fill();
  }


  this.empty = function () {
    ctx.clearRect(0, tick2 * CELL_SIZE, this.engine.width, CELL_SIZE);

    for (var i = 0; i < WIDTH; i += 1) {
      // this.point(i, tick2, COLOR_2)
    }
    tick2 += 1;
    
    if (tick2 > HEIGHT) {
      qty = 0;
      tick2 = 0;
    }
  }
  // this.empty = function () {
  //   ctx.clearRect(tick2 % WIDTH *CELL_SIZE, (tick2 / WIDTH)*CELL_SIZE, CELL_SIZE, CELL_SIZE);

  //   // for (var i = 0; i < WIDTH; i += 1) {
  //   //   this.point(i, tick2, COLOR_3)
  //   // }
  //   tick2 += 1;
    
  //   if (tick2 > HEIGHT*WIDTH) {
  //     qty = 0;
  //     tick2 = 0;
  //   }
  // }

  this.addLine = function (x, y, color) {
    var dir = Math.ceil(Math.random() * 4);

    ctx.beginPath();
    ctx.strokeStyle = COLOR_1;
    ctx.moveTo(x, y);
    switch(dir) {
      case 0: 
        y -= CELL_SIZE;
        break;
      case 1:
        x += CELL_SIZE;
        break;
      case 2:
        y += CELL_SIZE;
        break;
      case 3:
        x -= CELL_SIZE;
        break;
    } 
    ctx.lineTo(x, y);
    ctx.stroke()
  }

  /**
   * This function is called when user click reset button
   */
  this.reset = function () {
    this.engine.ctx.fillRect(0, 0, this.engine.width, this.engine.height);
  };

  /**
   * This function is called when this brush will be deleted
   */
  this.destroy = function () {
    // Do wathever you should do here (kill timer?)
    // We will Destroy this object when we leave this function
  };
};

var dom = document.getElementById('circuit');
if (dom) {
  var engine = new Engine(document.getElementById('circuit'), Dots);
  engine.start();
}