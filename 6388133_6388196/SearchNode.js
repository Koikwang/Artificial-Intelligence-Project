class SearchNode {
    constructor(state, parent, action) {
      this.state = state;
      this.parent = parent;
      this.action = action;
      this.x = this.state.x;
      this.y = this.state.y;
      this.good = true
      if (parent) {
        this.g = parent.g + state.cost();
      } else {
        this.g = state.cost();
      }
      let Hoption = new findHeuristic();
      console.log(Hoption.option);
      this.h = state.heuristic(Hoption.option);
      this.f = this.g + this.h; // f(n)
    }
  
    value() {
      return this.f;
    }
  
    get_path() {
      let path = [];
      let node = this;
      while (node.parent) {
        path.push(node.action);
        node = node.parent;
      }
      return path.reverse();
    }
  
    get_path_nodes() {
      let path = [];
      let node = this;
      while (node.parent) {
        path.push(node);
        node = node.parent;
      }
      path.push(node);
      return path.reverse();
    }
  }
  