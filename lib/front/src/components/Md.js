import React from 'react';
var {findDOMNode} = require('react-dom');
import {connect} from 'react-redux';
import {mdEdited} from '../actions/actions';

const mapStateToProps = (state) => ({
   md: state.main.md,
   insert: state.main.insert
});

const mapDispatchToProps = dispatch => ({
   mdEdited: (mdValue) => dispatch(mdEdited(mdValue))
});

function pad(value, sorroundingText, start, end) {
   var padValue = value;

   if (sorroundingText[end] !== ' ') {
       padValue = padValue + ' ';
   }
   if (sorroundingText[start] !== ' ') {
       padValue = ' ' + padValue;
   }

   return padValue;
}

class Md extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
        value: this.props.md
      };
  
      this.handleChange = this.handleChange.bind(this);
      this.insertReplaceAtCursor = this.insertReplaceAtCursor.bind(this);
   }
   
   getCurrentEditLine(element) {
      var caretPos = element.selectionStart;
      var start;
      var end;
  
      for (start = caretPos - 1; start >= 0 && element.value[start - 1] != "\n"; --start);
      for (end = caretPos; end < element.value.length && element.value[end] != "\n"; ++end);
  
      return {
          start,
          end,
          text: element.value.substring(start, end)
      };
   }
  
   replace(element, value, pattern) {
      var line = this.getCurrentEditLine(element);
      var re = new RegExp(pattern);
      var newLine;
  
      if (line.text.match(re)) {
          newLine = line.text.replace(re, value);
      } else {
          newLine = line.text + pad(value, line.text, line.text.length - 1, line.text.length - 1);
      }
  
      return {
          start: line.start,
          end: line.end,
          text: newLine
      }
   }   
   
   insertReplaceAtCursor(value, pattern = null) {
      var markdownViewEl = findDOMNode(this).querySelector('textarea');
      var finalValue = markdownViewEl.value || '';
      
      if (markdownViewEl.selectionStart || markdownViewEl.selectionStart == '0') {
          let start;
          let end;
          let valueToInsert;
          let trimValue = value.trim();
          let finalPosition;
  
          if (pattern) {
              let line = this.replace(markdownViewEl, trimValue, pattern);
              start = line.start;
              end = line.end;
              valueToInsert = line.text;
          } else {
              start = markdownViewEl.selectionStart;
              end = markdownViewEl.selectionEnd;
              valueToInsert = value.match(/:::slide/)? value : pad(value, markdownViewEl.value, start - 1, end);
          }
  
          finalValue = markdownViewEl.value.substring(0, start) + valueToInsert + markdownViewEl.value.substring(end, markdownViewEl.value.length);
          
          finalPosition = Boolean(valueToInsert.match(/::::?slide/))? start + valueToInsert.match(/::::?slide[^\n]*(\n|$)/)[0].length : start + valueToInsert.length;
          markdownViewEl.selectionStart = markdownViewEl.selectionEnd = finalPosition;
      } else {
          finalValue += value;
      }
      
      return finalValue;
   }

   //On keypress
   handleChange(event) {
     this.setState({value: event.target.value});
   }
  
   //An MD file is loaded
   componentWillReceiveProps(nextProps) {
      if (nextProps.md !== this.state.value) {
        this.setState({ value: nextProps.md });
        return;
      }
      
      if (nextProps.insert) {
         this.setState({value: this.insertReplaceAtCursor(nextProps.insert.text, nextProps.insert.pattern)})
      }
   }
   
   //If value is changed dispatch the action
   componentDidUpdate(prevProps, prevState) {
      if (this.state.value !== prevState.value) { 
         this.props.mdEdited(this.state.value);
      }
   }
  
   render() {
      return (
         <div className="mdContainer">
            <div className="tabContainer">
               <div className="tab mdTab text">Markdown editor</div>
            </div>
            <textarea
               className="raw-markdown"
               value={this.state.value}
               onChange={this.handleChange}
            />
         </div>
      );
   }
}

export default connect(mapStateToProps, mapDispatchToProps)(Md);