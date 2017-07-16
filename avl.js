class Tree{
  constructor(node) {
    this.head = node;
  }

  details() {
    this.head.details();
  }

  add(data) {
    return this.add_node(data);
  }

  add_node(data) {
    this.head = this.head.add_node(data);
    return this.head;
  }

  find (value) {
    return this.head.find(value);
  }

  in_order_traversal() {
    return this.head.iot().join(" -> ");
  }

  pre_order_traversal() {
    return this.head.pre_ot().join(" -> ");
  }

  post_order_traversal() {
    return this.head.post_ot().join(" -> ");
  }

  iot() {
    return this.in_order_traversal();
  }

  pre_ot() {
    return this.pre_order_traversal();
  }

  post_ot() {
    return this.post_order_traversal();
  }

  balance() {
    this.head = this.head.bal();
    return this.head;
  }

  delete_node(value) {
    this.head = this.head.delete_node(value);
    return this.head;
  }
}

class Node{
  constructor (data, left, right, center, weight) {
    this.data = data;
    this.left = left;
    this.right = right;
    this.center = center;
    this.weight = (weight) ? weight : 0;
  }

  add_node(data) {
    var weight = undefined;
    if (data == this.data) {
      weight = 0;
      if (!this.center) {
        this.center = new Node(data);
      } else {
        this.center = this.center.add_node(data);
      }
    } else if (data > this.data) {
      if (!this.right) {
        this.right = new Node(data);
        weight = 1;
      } else {
        this.right = this.right.add_node(data);
        weight = this.right.weight + 1;
      }
    } else {
      if (!this.left) {
        this.left = new Node(data);
        weight = 1;
      } else {
        this.left = this.left.add_node(data);
        weight = this.left.weight + 1;
      }
    }
    this.weight = (this.weight > weight) ? this.weight : weight;
    return this.bal();
  }

  find (value) {
    var n = this;
    while (n) {
      if (value == n.data) {
        if (n.center) {
          n = n.center;
        } else {
          return n;
        }
      }
      if (value > n.data) { n = n.right; }
      if (value < n.data) { n = n.left; }
    }
    return null;
  }

  iot(arr) {
    if (!arr) { arr = []; }
    if (this.left) {
      arr.concat(this.left.iot(arr));
    }
    arr.push(this.data);
    if (this.center) {
      arr.concat(this.center.iot(arr));
    }
    if (this.right) {
      arr.concat(this.right.iot(arr));
    }
    return arr;
  }

  pre_ot(arr) {
    if (!arr) { arr = []; }
    arr.push(this.data);
    if (this.center) {
      arr.concat(this.center.iot(arr));
    }    
    if (this.left) {
      arr.concat(this.left.iot(arr));
    }
    if (this.right) {
      arr.concat(this.right.iot(arr));
    }
    return arr;
  }

  post_ot(arr) {
    if (!arr) { arr = []; }    
    if (this.left) {
      arr.concat(this.left.iot(arr));
    }
    if (this.right) {
      arr.concat(this.right.iot(arr));
    }
    arr.push(this.data);
    if (this.center) {
      arr.concat(this.center.iot(arr));
    }
    return arr;
  }

  bal() {
    if (this.weight > 2) {
      if ((!this.left) || this.left.weight < (this.weight - 1)) {
          var new_head = this.right;
          this.right = new_head.left;
          new_head.left = this;
          if (new_head.left.right) {
            new_head.left.weight = (((new_head.left.left) ? new_head.left.left.weight + 1 : 1) > new_head.left.right.weight) ? ((new_head.left.left) ? new_head.left.left.weight + 1 : 1) : (new_head.left.right.weight + 1);
          } else {
            new_head.left.weight = (new_head.left.left) ? new_head.left.left.weight + 1 : 1;
          }
          var tmp = new_head.left;
          if (tmp.left) {
            if (tmp.right) {
              new_head.left.weight = (tmp.left.weight > tmp.right.weight) ? (tmp.left.weight + 1) : (tmp.right.weight + 1);
            } else {
              new_head.left.weight = tmp.left.weight + 1;
            }
          } else {
            new_head.left.weight = (tmp.right) ? (tmp.right.weight + 1) : 0;
          }
          var l_wt = new_head.left ? new_head.left.weight : -1;
          var r_wt = new_head.right ? new_head.right.weight : -1;
          new_head.weight = (l_wt > r_wt) ? (l_wt + 1) : (r_wt + 1);
          return new_head;
      }
      if ((!this.right) || this.right.weight < (this.weight - 1)) {
        var new_head = this.left;
        this.left = new_head.right;
        new_head.right = this;
        var tmp = new_head.right;
        if (tmp.left) {
          if (tmp.right) {
            new_head.right.weight = (tmp.left.weight > tmp.right.weight) ? (tmp.left.weight + 1) : (tmp.right.weight + 1);
          } else {
            new_head.right.weight = tmp.left.weight + 1;
          }
        } else {
          new_head.right.weight = (tmp.right) ? (tmp.right.weight + 1) : 0;
        }
        var l_wt = new_head.left ? new_head.left.weight : -1;
        var r_wt = new_head.right ? new_head.right.weight : -1;
        new_head.weight = (l_wt > r_wt) ? (l_wt + 1) : (r_wt + 1);
        return new_head;
      }
    }
    return this;
  }

  delete_node(value) {
    if (this.data == value) {
      if (this.center) {
        this.center = this.center.delete_node(value);
        return this;
      } else {
        if (this.right && this.left) {
          var tmp = this.right;
          while (tmp.left) {
            tmp = tmp.left;
          }
          tmp.left = this.left;
          if (this.right.data != tmp.data) {
            var tmp2 = this.right;
            while (tmp2.left.data != tmp.data) {
              tmp2 = tmp2.left;
            }
            tmp2.left = tmp.right;
            tmp.right = this.right;
          }
          var r_wt = (tmp.right) ? tmp.right.weight : -1;
          var l_wt = (tmp.left) ? tmp.left.weight : -1;
          tmp.weight = (r_wt > l_wt) ? r_wt + 1 : l_wt + 1;
          return tmp;
        } else if (!this.right && !this.left) {
          return undefined;
        } else {
          return (this.right) ? this.right : this.left;
        }
      }
    }
    if (value > this.data && this.right) {
      this.right = this.right.delete_node(value);
    }
    if (value < this.data && this.left) {
      this.left = this.left.delete_node(value);
    }
    var r_wt = (this.right) ? this.right.weight : -1;
    var l_wt = (this.left) ? this.left.weight : -1;
    this.weight = (r_wt > l_wt) ? r_wt + 1 : l_wt + 1;
    return this;
  }

  details() {
    var str = "";
    str += (this.left) ? (this.left.data + " (" + this.left.weight + ")") : "undefined";
    str += " <- " + this.data + " (" + this.weight + ") -> ";
    str += (this.right) ? (this.right.data + " (" + this.right.weight + ")") : "undefined";
    console.log(str);
    if (this.left) { this.left.details(); }
    if (this.right) { this.right.details(); }
  }
}

function bub_sort(arr) {
  var done = false;
  while (!done) {
    done = true;
    for (var i = 1; i < arr.length; i++) {
      if (arr[i] < arr[i-1]) {
        var tmp = arr[i];
        arr[i] = arr[i-1];
        arr[i-1] = tmp;
        done = false;
      }
    }
  }
  return arr;
}

function shuffle(arr) {
  var result = [];
  while (arr.length) {
    var x = Math.floor(Math.random()*arr.length);
    result.push(arr[x]);
    arr.splice(x,1);
  }
  return result;
}

function test(name, expected, result) {
  if (expected != result) {
    console.log("Test " + name + " Failed!");
    console.log("Exp: " + expected);
    console.log("Res: " + result);
  }
}

var tree = new Tree(new Node(50));
var arr = [50];
for (var i = 0; i < 100; i++) {
  var rand = Math.floor(Math.random()*100);
  arr.push(rand);
  tree.add_node(rand);
}
test ("iot 3",bub_sort(arr).join(" -> "),tree.iot());


var test_tree = new Tree(new Node(10));
test_tree.add(5);test_tree.add(15);
test_tree.details();
var test_arr = [];
for (var i = 0; i < 100; i++) {
  var rand = Math.floor(Math.random()*10000) + 20;
  test_arr.push(rand);
  test_tree.add_node(rand);
}
test_arr = bub_sort(test_arr);
for (var i = 0; i < test_arr.length; i++) {
  test_tree.delete_node(test_arr[i]);
}
test_tree.details();


