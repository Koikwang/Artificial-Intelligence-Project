class WorldMap {

    constructor(map_data) {
      this.map_data = map_data;
      this.data = [];
      this.assets = {};
      this.rows = 0;
      this.cols = 0;
      this.goal = { x: -1, y: -1 };
      this.walkable = ['d', 'm', 'g', 'e'];
      this.costs = {
        e: 1, d: 1, g: 2, m: 4,
        r: 10000, t: 10000, w: 10000, b: 10000
      };
      this.setupMap();
      this.loadAssets();
    }
  
    setupMap() {
      let lines = this.map_data.split('\n');
      for (let i = 0; i < lines.length; i++) {
        let line = lines[i].trim()
        if (line.length > 0) {
          this.data.push(line.split(''));
        }
      }
      this.rows = this.data.length;
      this.cols = this.data[0].length;
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < this.cols; j++) {
  
          //----------------------Goal Test Function-----------------//
          if (this.data[i][j] == 'e') {
            this.goal = { x: j, y: i };
          }
           //--------------------------------------------------------//
        }
      }
    }
  
    loadAssets() {
      this.assets['d'] = loadImage('assets/dirt.png');
      this.assets['e'] = loadImage('assets/end.png');
      this.assets['g'] = loadImage('assets/grass.png');
      this.assets['m'] = loadImage('assets/mud.png');
      this.assets['r'] = loadImage('assets/rock.png');
      this.assets['t'] = loadImage('assets/tree.png');
      this.assets['w'] = loadImage('assets/water.png');
      this.assets['b'] = loadImage('assets/brick.png');
    }
  
    render() {
      textAlign(CENTER, CENTER);
      for (let i = 0; i < this.rows; i++) {
        for (let j = 0; j < map.cols; j++) {
          let xpos = j * cz + mz;
          let ypos = i * cz + mz;
          fill(240);
          stroke(0);
          rect(xpos, ypos, cz, cz);
          fill(0);
          noStroke();
          //
          let a = 0;
          if (this.data[i][j] in this.assets) {
            if (this.data[i][j] == 'e') {
              rotate_and_draw_image(this.assets['b'], xpos, ypos, cz, cz, a);
            } else {
              rotate_and_draw_image(this.assets['d'], xpos, ypos, cz, cz, a);
            }
            rotate_and_draw_image(this.assets[this.data[i][j]], xpos, ypos, cz, cz, a);
          } else {
            rotate_and_draw_image(this.assets['b'], xpos, ypos, cz, cz, a);
            text(this.data[i][j], xpos, ypos, cz, cz);
          }
        }
      }
    }
    // Make agent cannot walk
    check_wall(x, y) {
      return !(this.walkable.includes(this.data[y][x]));
    }
  }