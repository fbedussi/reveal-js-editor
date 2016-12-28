module.exports = {
    _maxIndex: 20,
    
    setMaxIndex: function(max) {
        this._maxIndex = max;
    },
    
    getMaxIndex: function() {
        return this._maxIndex;
    },
    
    _index: 0,
    
    _history: [],
    
    push: function(val) {
        if (this._history[this._history.length - 1] === val) {
            return;
        }
        var min = this._index === this._maxIndex? 1 : 0;
        this._history = this._history.slice(min, this._index);
        this._history.push(val);
        this._index = Math.min(this._maxIndex, this._index + 1);
        
        console.log('index ', this._index);
        console.log('history ', this._history);
    },
    
    getPrev: function() {
        this._index--;
        return this._history[this._index];
    },
    
    getNext: function() {
        this._index++;
        return this._history[this._index];
    }
}