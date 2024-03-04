
let map_data = `
012340
1gdgd1
2wgrd2
3gmdm3
4dggr4
512e45
`
let mz = 10;
let cz = 50;


function rotate_and_draw_image(img, img_x, img_y, img_width, img_height, img_angle) {
  imageMode(CENTER);
  translate(img_x + img_width / 2, img_y + img_width / 2);
  rotate(-PI / 180 * img_angle);
  image(img, 0, 0, img_width, img_height);
  rotate(PI / 180 * img_angle);
  translate(-(img_x + img_width / 2), -(img_y + img_width / 2));
  imageMode(CORNER);
}

let map;
let state;
let history = [];
let explorer;
let divHistory;
let divSearchTree;
let divHeuristic;

function preload() {
  map = new WorldMap(map_data);
  state = new AgentState(1, 1, 'd');
  let start = new SearchNode(state, null, null)
  history.push(start);
  explorer = new Explorer(start)
}
/////////////////////// Main Function ////////////////////////////
function setup() {
  
  createCanvas(cz * map.cols + mz * 2, cz * map.rows + mz * 2);
  divHistory = createDiv();
  divHistory.addClass('history')
  divHistory.position(cz * map.cols + mz * 2, 0);
  divSearchTree = createDiv();
  divSearchTree.addClass('search-tree')
  divSearchTree.position(0, cz * map.rows + mz * 2);
  
  ///////////////////// Modified /////////////////////
  // divHeuristic = createDiv();
  // divHeuristic.addClass('heur')
  // divHeuristic.position(80, cz * map.rows + mz * 3.2);
  selectOption();
  ////////////////////////////////////////////////////

  redraw();
  noLoop();
}

function draw() {
  background(220);
  map.render();
  state.render();
  renderHistory();
  explorer.renderSearchTree();
}
////////////////////////////////////////////////////////////////

///////////////// Modified //////////////////////////
//select heuristic options
let select;

function selectOption() {
  select = createSelect();
  select.position(80, cz * map.rows + mz * 3.2);
  select.option('-');
  select.option('EUC+');
  select.option('MAN+');
  
}

function HeuristicOption() {
  let x = select.value();
  if(x == 'EUC+'){
    console.log(select.value());
    return this.euclidean(this.x, this.y, map.goal.x, map.goal.y);
  }
  else if(x == 'MAN+'){
    return this.manhattan(this.x, this.y, map.goal.x, map.goal.y);
  }
}

// function renderSelectOption() {
//   let so = '<select> <option>EUC+</option> <option>MAN+</option> </select>';
//   console.log('Hi');
//   divHeuristic.html(so);
// }

class findHeuristic{
  constructor() {
    this.option;
  }
}
//-----------------------------------------------------------------//



// function keyReleased() {
//   let action = 0;
//   if (keyCode === UP_ARROW) {
//     action = 'u';
//   } else if (keyCode === DOWN_ARROW) {
//     action = 'd';
//   } else if (keyCode === LEFT_ARROW) {
//     action = 'l';
//   } else if (keyCode === RIGHT_ARROW) {
//     action = 'r';
//   }
//   if (state.actions().includes(action)) {
//     state = state.transition(action);
//     history.push(new SearchNode(state, history[history.length - 1], action));
//     redraw();
//   }
// }
