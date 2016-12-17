const Component = {
    _components: [], //Static
    
    getComponents: function() { //Static
        return this._components;
    },
    
    refreshAllTexts: function() { //Static
        this.getComponents().forEach(component => component.refreshText())
    },
    
    getEl: function(selector) {
        this._el = document.querySelector(selector);
        
        if (this._el) {
            Object.getPrototypeOf(this)._components.push(this);    
        }
        
        return this;
    },
    
    _textElSelector: '.text',
    
    _getTextEl: function() {
        var textEl = this._el.querySelector(this._textElSelector);
        return textEl || this._el;
    },
    
    _getText: function() {
        return typeof this._text === 'function'? this._text() : this._text;
    },
    
    setText: function(text) {
        var el = this._getTextEl();
        this._text = text;
        
        if (el) {
            el.innerText = this._getText();
        }
        return this;
    },
    
    setPlaceholder: function(text) {
        this._el.placeholder = text;
        return this;
    },
    
    setValue: function(value) {
        this._el.value = value;
        
        return this;
    },
    
    refreshText: function() {
        this._getTextEl().innerText = this._getText();
        return this;
    },
    
    on: function(event, handler) {
        this._el.addEventListener(event, handler);
        return this;
    }
};

function createComponent() {
    return Object.create(Component);
};

module.exports = {
    createComponent,
    ui: Component
}
