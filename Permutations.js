  function Permutations(elems) {
    this.elems = elems;
    this.length = elems.length;
    this.inject = this.length-1;
    if(this.length > 1) {
      this.elem = this.elems[0];
      let cp = [...elems];
      cp.shift();
      this.child = new Permutations(cp);
    }
    else {
      this.elem = elems[0];
      this.child = null;
      this._hasNext = true;
    }
  }
  Permutations.prototype.hasNext = function() {
    if(this.child==null) {
      return this._hasNext;
    }
    else if(this.inject+1 < this.length) {
      return true;
    }
    else {
      return this.child.hasNext();
    }
  }
  Permutations.swap = function(arr, i,j) {
    let tmp = arr[i];
     arr[i] = arr[j];
     arr[j] = tmp;
  }
  Permutations.prototype.next = function() {
    if(this.child==null) {
      if(this._hasNext) {
        this._hasNext = false;
        return [ this.elem ];
      }
      else {
        throw "Invalid call to next()";
      }
    }
    else {
      if(this.inject+1 < this.length) {
        Permutations.swap(this._next, this.inject, this.inject+1);
        ++this.inject;
        return this._next;
      }
      else {
        this._next = this.child.next();
        this.inject = 0;
        this._next = [this.elem, ...this._next];
        return this._next;
      }
    }
  }
  
