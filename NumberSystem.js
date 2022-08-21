  function NumberSystem(limits) {
    this.limits = limits;
    this.length = limits.length;
    this._next = Array(limits.length).fill(0);
    this._next[0] = -1;
    this._hasNext = true;
  }
  NumberSystem.prototype.hasNext = function() {
    return this._hasNext;
  }
  NumberSystem.prototype.next = function() {
    if(!this._hasNext) {
      throw "invalid call to next() since hasNext() is false.";
    }
    let i=0;
    while(!(this._next[i]+1 < this.limits[i])) {
      this._next[i] = 0; // carry.
      ++i;
      if(i == this._next.length) {
        throw "internal error";
      }
    }
    ++this._next[i];

    let j=0;
    while(!(this._next[j]+1 < this.limits[j])) {
      ++j;
      if(j==this._next.length) {
        break;
      }
    }
    this._hasNext = j<this._next.length;
    return this._next;
  }
  
