
var Engine = function(el, Experiment) {
    // container infos
    this.el = el;
  
    this.width = this.el.offsetWidth;
    this.height = this.el.offsetHeight;
  
    var deltaTop = this.el.offsetTop;
    var deltaLeft = this.el.offsetLeft;
  
    // an Array of inputs
    this.inputs = [];
  
    // WHY SHOULD NAME BE A FUNCTION???
  
    // CanvasInfos
    this.canvas =  null;
    this.ctx =  null;
  
    this.start = function() {
      // We call the run function
      run.bind(this)();
    };
  
    this.destroy = function() {
      // Notify gameObject
      this.gameObject.destroy();
      // kill it!
      this.gameObject = null;
    };
  
    this.reset = function() {
      // we call game object reseter
      this.gameObject.reset();
    };
  
    this.getImage = function() {
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
      this.canvas.width =  this.width;
      this.canvas.height =  this.height;
  
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
  
    function initInputListener() {
      
      // Multitouch Events!
      // this.canvas.addEventListener('touchstart', manageTouch.bind(this));
      // this.canvas.addEventListener('touchmove', manageTouch.bind(this));
      // this.canvas.addEventListener('touchend', manageTouch.bind(this));
      // this.canvas.addEventListener('touchleave', manageTouch.bind(this));
      // this.canvas.addEventListener('touchcancel', manageTouch.bind(this));
      // this.canvas.addEventListener('touchenter', manageTouch.bind(this));
  
      // this.canvas.addEventListener('mousedown', mouseDown.bind(this));
      // this.canvas.addEventListener('mousemove', mouseMove.bind(this));
      // this.canvas.addEventListener('mouseup', mouseUp.bind(this));
      // this.canvas.addEventListener('mouseout', mouseUp.bind(this));

      // SETUP RESIZE
    }
  
    // /**
    //  * Inputs methods
    //  */
    // var lastCapture = 0;
    // function manageTouch(event) {
    //   var inputs = [];
    //   for (var i = 0; i < event.targetTouches.length; ++i) {
    //     var type = event.type;
  
    //     if (type === 'touchstart') {
    //       type = 'start';
    //       lastCapture = 0;
    //     } else if (type === 'touchmove') {
    //       type = 'move';
  
    //       var now = new Date().getTime();
  
    //       if (lastCapture) {
    //         this.captureTime = lastCapture - now;
    //       }
  
    //       lastCapture = now;
    //     } else  {
    //       type = 'up';
    //       lastCapture = 0;
    //     }
  
  
    //     targetTouche = event.targetTouches[i];
    //     inputs.push({
    //       x : targetTouche.clientX - deltaLeft - window.scrollX,
    //       y : targetTouche.clientY - deltaTop + window.scrollY,
    //       id : targetTouche.identifier,
    //       type : type
    //     });
    //   }
    //   event.preventDefault();
    //   event.stopPropagation();
    //   this.inputs = inputs;
    // }
  
    // var mouseIsDown = 0;
    // var mouseId = 0;
  
  
    // function mouseDown(event) {
    //   mouseIsDown = 1;
    //   lastCapture = 0;
    //   this.inputs = [{
    //     x : event.clientX - deltaLeft - window.scrollX,
    //     y : event.clientY - deltaTop + window.scrollY,
    //     id : ++mouseId,
    //     type : 'down'
    //   }];
    // }
  
  
    // function mouseMove(event) {
    //   if (mouseIsDown) {
    //     this.inputs = [{
    //       x : event.clientX - deltaLeft - window.scrollX,
    //       y : event.clientY - deltaTop + window.scrollY,
    //       id : mouseId,
    //       type : 'move'
    //     }];
    //   }
  
    //   var now = new Date().getTime();
  
    //   if (lastCapture) {
    //     this.captureTime = lastCapture - now;
    //   }
  
    //   lastCapture = now;
  
    // }
  
    // function mouseUp(event) {
    //   mouseIsDown = 0;
    //   lastCapture = 0;
    //   this.inputs = [{
    //     x : event.clientX - deltaLeft - window.scrollX,
    //     y : event.clientY - deltaTop + window.scrollY,
    //     id : mouseId,
    //     type : 'up'
    //   }];
    // }
  
  
    function run() {
      requestAnimFrame(run.bind(this));
      // update inputs!
      this.now = new Date().getTime();
  
      // run game
      this.gameObject.run();
    }
  
    // Paul irish requestAnimFramePolyfill
    var requestAnimFrame = (function() {
      return window.requestAnimationFrame ||
         window.webkitRequestAnimationFrame ||
         window.mozRequestAnimationFrame ||
         window.oRequestAnimationFrame ||
         window.msRequestAnimationFrame ||
         function(/* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
           window.setTimeout(callback, 1000/60);
         };
    })();
  
    // Call the initers
    initCanvas.bind(this)();
    initInputListener.bind(this)();
    initGameObject.bind(this)();
  
  };
  
  
  
  
  var ChineseInk = function(engine) {
    
    this.engine = engine;
  
    var BG_COLOR = '#000000'
    var COLORS = [
      '#ffffff'
    ];
  
    var TEAMS_COUNT = COLORS.length;
    // ideal to fine tune your brush!
    var WORLD = [];
    var WORLD_LINK = [];
      
    var WIDTH = this.engine.width / 40 | 0;
    var HEIGHT = this.engine.height / 40 | 0;
      
    /**
     * This function is called after we created your pobject
     */
    this.init = function() {
      // Init your experience here
      
      // example : we paint canvas with blue color
      // this.engine.ctx.fillStyle = BG_COLOR;
      // this.engine.ctx.fillRect(0,0, this.engine.width, this.engine.height);
  
      for (var x = 0; x < WIDTH; ++x) {
        WORLD[x] = [];
        for (var y = 0; y < HEIGHT; ++y) {
          WORLD[x][y] = -1;
        }
      }
  
      for (var i = 0; i <= TEAMS_COUNT; ++i) {
        WORLD[Math.random() * WIDTH | 0 ][Math.random() * HEIGHT | 0] = i;
      }
  
  
    };
  
    var ctx = engine.ctx;
  
    /**
     * This function is called every frames
     */
    this.run = function () {
      // you should manage input, render and animation here
      // TIPS : Just create functions, avoid code wall!
      
      // example : we run throught input and draw red squares
     
      
      this.animate();
      this.render();
  
  
    };
  
  
    this.animate = function() {
      var TEAM_SCORE = [];
      var TEAM_MAP = [];
      for (var i = 0; i <= TEAMS_COUNT; ++i) {
        TEAM_SCORE[i] = 0 ;
        TEAM_MAP[i] = [] ;
      }
  
      for (var x = 0; x < WIDTH; ++x) {
        for (var y = 0; y < HEIGHT; ++y) {
          if (WORLD[x][y] != -1) {
            TEAM_SCORE[WORLD[x][y]]++;
            TEAM_MAP[WORLD[x][y]].push([x,y]);
          }
        }
      }
  
      for (var i = 0; i < TEAMS_COUNT; ++i) {
        var stamina = TEAM_SCORE[i] / 10 + 1 | 0;
  
        while (TEAM_MAP[i] && TEAM_MAP[i].length && stamina > 0) {
          popTeam(i, TEAM_MAP[i]);
          stamina--;
        }
      }
    }
    
    function popTeam(team, map) {
      var cell = map[map.length * Math.random() | 0];
  
      var x = cell[0];
      var y = cell[1];
  
      var potential = [];
  
      if (x > 0 && WORLD[x - 1][y] != team) {
        potential.push([x - 1,y]);
      }
  
      if (x < WIDTH - 1 && WORLD[x + 1][y] != team) {
        potential.push([x + 1,y]);
      }
  
      if (y > 0 && WORLD[x][y - 1] != team) {
        potential.push([x,y - 1]);
      }
  
      if (y < HEIGHT - 1 && WORLD[x][y + 1] != team) {
        potential.push([x,y + 1]);
      }
  
      if (potential.length) {
        var p = potential[potential.length * Math.random() | 0];
        WORLD[p[0]][p[1]] = team;
        WORLD_LINK.push({
          a  : [x, y],
          b : [p[0], p[1]],
          c : team
        });
      }
    }
  
    this.render = function() {
      // this.engine.ctx.fillStyle = BG_COLOR;
      // this.engine.ctx.fillRect(0,0, this.engine.width, this.engine.height);
      var ctx = this.engine.ctx;
      var dx = (this.engine.width - WIDTH * 40) / 2 | 0;
      var dy = (this.engine.height - HEIGHT * 40) / 2 | 0;
      
      // render loop
      for (var x = 0; x < WIDTH; ++x) {
        for (var y = 0; y < HEIGHT; ++y) {
          if (WORLD[x][y] != -1) {
  
            ctx.fillStyle = COLORS[WORLD[x][y]];
            ctx.beginPath();
            ctx.arc(x * 40 + dx, y * 40 + dy, 5, 0, Math.PI *2,true);
            ctx.fill();
          }
        }
      }
  
      ctx.lineWidth = 3;
      for (var i = 0; i < WORLD_LINK.length; ++i) {
        var link = WORLD_LINK[i];
        if (WORLD[link.a[0]][link.a[1]] != WORLD[link.b[0]][link.b[1]] || WORLD[link.a[0]][link.a[1]] != link.c) {
          WORLD_LINK.splice(i--, 1);
          continue;
        }
  
          ctx.strokeStyle = COLORS[link.c];
          ctx.beginPath();
          var ddx = link.a[0] - link.b[0];
          var ddy = link.a[1] - link.b[1];
          ctx.moveTo(link.a[0] * 40 + dx - ddx * 5, link.a[1] * 40 + dy - ddy * 5);
          ctx.lineTo(link.b[0] * 40 + dx + ddx * 5, link.b[1] * 40 + dy + ddy * 5);
          ctx.stroke();
      }
    }
  
  
    /**
     * This function is called when user click reset button
     */
    this.reset = function() {
      // Here handle what happen when user click reset button
      // TIPS : Clean the canvas or paint it with bg color
      // TIPS2 : Throw away all your particles!
      
      // example : we paint canvas with blue color
      this.engine.ctx.fillStyle = BG_COLOR;
      this.engine.ctx.fillRect(0,0, this.engine.width, this.engine.height);
    };
  
    /**
     * This function is called when this brush will be deleted
     */
    this.destroy = function() {
      // Do wathever you should do here (kill timer?)
      // We will Destroy this object when we leave this function
    };
  
  
  };
  // Main.js
  
  var engine = new Engine(document.getElementById('circuit'), ChineseInk);
  engine.start();