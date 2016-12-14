const webFrame = require('electron').webFrame;
const spellChecker = require('electron-spellchecker');
const SpellCheckHandler = spellChecker.SpellCheckHandler;
const ContextMenuListener = spellChecker.ContextMenuListener;
const ContextMenuBuilder = spellChecker.ContextMenuBuilder;
window.spellCheckHandler = new SpellCheckHandler();
window.spellCheckHandler.attachToInput();
// Start off as US English, America #1 (lol) 
window.spellCheckHandler.switchLanguage('en-US');
let contextMenuBuilder = new ContextMenuBuilder(window.spellCheckHandler);
let contextMenuListener = new ContextMenuListener((info) => {
    contextMenuBuilder.showPopupMenu(info);
});