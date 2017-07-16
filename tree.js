class Node {
  constructor(data,parent,children) {
    this.data = data;
    this.parent = parent;
    this.children = children;
  }

  in_order_traversal() { return this._iot().join(" -> "); }

  _iot() {
    var result = [this.data];
    if (this.children) {
      for (var i = 0; i < this.children.length; i++) {
        var tmp = this.children[i]._iot();
        result = result.concat(tmp);
      }
    }
    return result;
  }

  find(value) {
    if (this.data == value) { return this; }
    if (this.children != undefined) {
      for (var i = 0; i < this.children.length; i++) {
        var tmp = this.children[i].find(value);
        if (tmp) {
          return tmp;
        }
      }
    }
    return null;
  }

  trace(value, map) {
    if (map === undefined) { map = []; }
    map.push(this);
    if (this.data == value) { return map; }
    if (this.children != undefined) {
      for (var i = 0; i < this.children.length; i++) {
        var tmp = this.children[i].trace(value, map);
        if (tmp != null) {
          return tmp;
        }
      }
    }
    map.pop();
    return null;
  }

  append(data) {
    //accepts data, not node
    if (this.children == undefined) {
      this.children = [new Node(data,this)];
    } else {
      this.children.push(new Node(data,this));
    }
  }

  show_children() {
    var result = "";
    if (this.children === undefined) { return "undefined"; }
    for (var i = 0; i < this.children.length; i++) {
      result += this.children[i].data;
      if (i != this.children.length-1) {
        result += ", ";
      }
    }
    return result;
  }
}

class Tree {
  constructor(head) {
    this.head = head;
  }

  print_tree() {
    var result = this.head.data + " -> ";
    if (this.head.children == undefined) {
      result += "undefined";
    } else {
      for(var i = 0; i < this.head.children.length; i++) {
        result += this.head.children[i].data + " ";
      }
      for(var i = 0; i < this.head.children.length; i++) {
        result += "\n" + new Tree(this.head.children[i]).print_tree();
      }
    }
    return result;
  }

  trace(value) {
    return this.head.trace(value);
  }

  find (value) {
    return this.head.find(value);
  }

  in_order_traversal() {
    return this.head.in_order_traversal();
  }

  iot() { //in order traversal
    return this.head.in_order_traversal();
  }

  pre_order_traversal() {
    return this.head.preo_t();
  }

  preo_t() {
    return this.head.preo_t();
  }

  p() {
    return this.print_tree();
  }
}

function b() {
  var result = new Tree(new Node(1));
  result.head.append(2);result.head.append(3);
  result.head.children[0].append(4);
  result.head.children[0].append(5);
  result.head.children[1].append(6);
  result.head.children[1].append(7);
  return result;
}

function test (name,expected,result) {
  if (expected != result) {
    console.log("Test " + name + " failed!");
    console.log("Expected: " + expected);
    console.log("Result:   " + result + "\n");
  }
}

var tree = b();
console.log(tree.find(6));

test("iot t1","1 -> 2 -> 4 -> 5 -> 3 -> 6 -> 7",tree.iot());


