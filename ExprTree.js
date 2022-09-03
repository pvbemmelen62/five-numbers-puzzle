
function NumberNode(num) {
  this.num = num;
}
NumberNode.prototype.eval = function() {
  return this.num;
}
NumberNode.prototype.setNum = function(num) {
  this.num = num;
}
NumberNode.prototype._toString = function() {
  return "" + this.num;
}
//--------------------------------------------------
function OperandNode(op, childLeft, childRight) {
  this.op = op;
  this.childLeft = childLeft;
  this.childRight = childRight;
}
OperandNode.prototype.setOp = function(op) {
  this.op = op;
}
OperandNode.prototype.eval = function() {
  let rv = opFuncs[this.op](this.childLeft.eval(), this.childRight.eval());
  return rv;
}
OperandNode.prototype._toString = function() {
  let rv = "(" + this.childLeft._toString() + opSyms[this.op] + this.childRight._toString() + ")";
  return rv;
}

//--------------------------------------------------
let opFuncs = [];
opFuncs[0] = (x,y) => x+y;
opFuncs[1] = (x,y) => x-y;
opFuncs[2] = (x,y) => x*y;
opFuncs[3] = (x,y) => x/y;

let opSyms = [];
opSyms[0] = "+";
opSyms[1] = "-";
opSyms[2] = "*";
opSyms[3] = "/";

// -----------------------------------------------
//let exprFuncs = [];
//exprFuncs[0] = (fs,ns) => fs[3](fs[2](fs[1](fs[0](ns[0],ns[1]),ns[2]),ns[3]),ns[4]);
//exprFuncs[1] = (fs,ns) => fs[3](fs[2](fs[0](ns[0],ns[1]),fs[1](ns[2],ns[3])),ns[4]);
//exprFuncs[2] = (fs,ns) => fs[3](fs[1](fs[0](ns[0],ns[1]),ns[2]),fs[2](ns[3],ns[4]));
//------------------------------------------------ 

//--------------------------------------------------
function ExprTree(numNums, opNodeSpecs) {
  this.numNums = numNums;
  this.opNodeSpecs = opNodeSpecs;
  this.numOps = this.opNodeSpecs.length;

  this.nodes = new Array(numNums).fill(null);
  for(let i=0; i<numNums; ++i) {
    this.nodes[i] = new NumberNode(null);
  }
  opNodeSpecs.forEach(spec => {
    this.nodes[spec[0]] = new OperandNode(-1, this.nodes[spec[1]], this.nodes[spec[2]]);
  });
  this.top = this.findTop();
}
ExprTree.prototype.findTop = function() {
  let isChild = new Array(this.numNums + this.numOps).fill(false);
  this.opNodeSpecs.forEach(spec => { isChild[spec[1]] = true; isChild[spec[2]] = true; });
  // check there is only one non-child:
  let isNonChild = isChild.filter(e => !e);
  if(isNonChild.length != 1) throw "Can't find top.";
  //
  let index = isChild.findIndex(e => !e);
  return this.nodes[index];
}
ExprTree.prototype.setOps = function(ops) {
  if(ops.length != this.opNodeSpecs.length) { throw "setOps: wrong argument"; }
  for(let i=0, j=this.numNums; i<ops.length; ++i, ++j) {
    this.nodes[j].setOp(ops[i]);
  }
}
ExprTree.prototype.setNums = function(nums) {
  if(this.numNums != nums.length) { throw "setNums: wrong argument"; }
  for(let i=0; i<nums.length; ++i) {
    this.nodes[i].setNum(nums[i]);
  }
}
ExprTree.prototype.eval = function() {
  let rv = this.top.eval();
  return rv;
}
ExprTree.prototype._toString = function() {
  let rv = this.top._toString();
  return rv;
}

