class Explorer {
    constructor(start) {
      this.start = start;
      this.root = { node: this.start, children: [] };
      this.data = [];
      this.expand(this.root.node, this.root.children);
    }
  
    expand(node, children) {
      let actions = node.state.actions();
      children.splice(0, children.length)
      for (let i = 0; i < actions.length; i++) {
        let child = node.state.transition(actions[i]);
        if (child.x == node.x && child.y == node.y) {
          continue;
        }
        let childNode = new SearchNode(child, node, actions[i]);
        children.push({ node: childNode, children: [] });
      }
    }
  
    explorer(key) {
      let d = this.data[key];
      this.expand(d.node, d.children);
      history.splice(0, history.length);
      let nodes =  d.node.get_path_nodes();
      for(let i = 0; i < nodes.length; i++) {
        history.push(nodes[i]);
      }
      state = history[history.length - 1].state
      redraw();
      // this.renderSearchTree();
    }
  
    renderSearchTree() {
      let st = '<h3> AI Mode:</h3>';
      //st.select;
      this.data.splice(0, this.data.length);
      st += '<div class="search-box"><ul>';
      st += this.renderNode(explorer.root.node, explorer.root.children);
      st += '</ul>';
      let explored_count = 0;
      let frontier_count = 0;
      for (let i = 0; i < explorer.data.length; i++) {
        if (explorer.data[i].children.length == 0) {
          frontier_count += 1;
        } else {
          explored_count += 1;
        }
      }
  
      st += '</div>';
      st += '<h3>Explored: ' + explored_count + ' | Frontier: ' + frontier_count + '</h3>';
      divSearchTree.html(st);
  
      let all_li = selectAll('div.search-item');
      for (let i = 0; i < all_li.length; i++) {
        let key = all_li[i].attribute('data');
  
        all_li[i].mouseClicked(this.explorer.bind(this, key));
      }
    }
  
    renderNode(node, children) {
      let st = '<li><div class="search-item" data="'+this.data.length+'">';
      if (node.action) {
        st += node.action + ' -> ';
      } else {
        st += 'S -> ';
      }
      st += node.x + ',' + node.y;
      // fill(0, 0, 0);
      if (children.length == 0){
        st += ' <em>(g: ' + node.g + ')</em> ';
        st += ' <em>(g: ' + node.g + ', h: ' + node.h + ', f: '+node.f+')</em> ';
        // fill(0, 255, 0);
      }
      st += '</div><ul>';
  
      // let xpos = node.x * cz + mz;
      // let ypos = node.y * cz + mz;
      // circle(xpos + cz / 2, ypos + cz / 2, 10);
      this.data.push({node: node, children: children});
      for (let i = 0; i < children.length; i++) {
        st += this.renderNode(children[i].node, children[i].children);
      }
      st += '</ul></li>';
      return st;
    }
  }