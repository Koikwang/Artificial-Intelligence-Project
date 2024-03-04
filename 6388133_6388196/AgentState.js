class AgentState {
    //----------------------------Initial State---------------------------//
    constructor(x, y, o, assets) {
      this.x = x;
      this.y = y;
      this.o = o;
      this.angles = { n: 180, e: 90, s: 0, w: 270 };
      if (!assets) {
        this.assets = {};
        this.loadAssets();
      } else {
        this.assets = assets;
      }
  
    }
    //-------------------------------------------------------------------//
    
    loadAssets() {
      this.assets['a'] = loadImage('assets/agent.png')
    }
  
    //--------------------------Action Space------------------------------//
    actions() {
      return ['u', 'd', 'l', 'r'];
    }
    //-------------------------------------------------------------------//
  
    //----------------------Cost Function--------------------------------//
    cost() {
      let tile = map.data[this.y][this.x];
      return map.costs[tile];
    }
    //-------------------------------------------------------------------//
  
    //-------------------------Transition Function-----------------------//
    transition(action) {
      let x = this.x;
      let y = this.y;
      let o = this.o;
      switch (action) {
        case 'u':
          y--;
          o = 'n';
          break;
        case 'd':
          y++;
          o = 's';
          break;
        case 'l':
          x--;
          o = 'w';
          break;
        case 'r':
          x++;
          o = 'e';
          break;
      }
      // Agent can walk
      if (!map.check_wall(x, y)) {
        return new AgentState(x, y, o, this.assets);
      } else { // Agengt cannot walk
        return new AgentState(this.x, this.y, o, this.assets);
      }
    }
    //--------------------------------------------------------------------//
    //------------------------ Heuristic Function ------------------------//
    //------------------------ Find Manhattan ---------------------------//
    manhattan(x0, y0, x1, y1) {
      return Math.abs(x0 - x1) + Math.abs(y0 - y1);
    }
  
    euclidean(x0, y0, x1, y1) {
      return Math.sqrt(Math.pow(x0 - x1, 2) + Math.pow(y0 - y1, 2));
    }
    
    heuristic(option) {
      //return this.manhattan(this.x, this.y, map.goal.x, map.goal.y);
      return this.euclidean(this.x, this.y, map.goal.x, map.goal.y);
      //let option = select.value();
      //console.log(option);
      // if (option === 'EUC+'){
      //   console.log('EUC+');
      //   return this.euclidean(this.x, this.y, map.goal.x, map.goal.y);
      // } else if (option === 'MAN+'){
      //   console.log('MAN+');
      //   return this.manhattan(this.x, this.y, map.goal.x, map.goal.y);
      // }
    }  
    //-------------------------------------------------------------------//
    
    render() {
      let xpos = this.x * cz + mz;
      let ypos = this.y * cz + mz;
      rotate_and_draw_image(
        this.assets['a'],
        xpos + cz / 5,
        ypos + cz / 4,
        cz / 1.5,
        cz / 2,
        this.angles[this.o]);
    }
  }
  function resetToHistoryIndex(index) {
    state = history[index].state;
    history = history.slice(0, index + 1);
    redraw();
  }
  
  function renderHistory() {
    let his = '<h3> History: </h3>';
    his += '<ol>';
    let totalE = 0;
    for (let i = 0; i < history.length; i++) {
      if (history[i].action) {
        his += '<li>' + history[i].action + ' -> ';
      } else {
        his += '<li> S -> ';
      }
      his += history[i].state.x + ',' + history[i].state.y + ' | ';
      his += 'energy: ' + history[i].state.cost();
      totalE += history[i].state.cost();
      if (map.data[history[i].state.y][history[i].state.x] == 'e') {
        his += ' |🏁';
      }
      his += '<span>⎌</span>'
      his + '</li>';
    }
    his += '</ol>';
    his += '<h3>Steps: ' + history.length + ' | Total Energy: ' + totalE + ' </h3>';
    divHistory.html(his);
    let all_li = selectAll('div.history ol li');
    for (let i = 0; i < all_li.length; i++) {
      all_li[i].mouseClicked(resetToHistoryIndex.bind(this, i));
    }
  }
  