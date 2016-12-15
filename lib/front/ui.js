module.exports = {
    getEl: function(selector) {
        this._el = document.querySelector(selector);
        return this;
    },
    
    setText: function(text) {
        this._el.innerText = text;
        return this;
    },
    
    on: function(event, handler) {
        this._el.addEventListener(event, handler);
        return this;
    }
};