import React from 'react';
import {connect} from 'react-redux';
import {mdEdited} from '../actions';

const mapStateToProps = (state) => ({
   md: state.main.md
});

const mapDispatchToProps = dispatch => ({
   mdEdited: (mdValue) => dispatch(mdEdited(mdValue))
});


class Md extends React.Component {
   constructor(props) {
      super(props);
      
      this.state = {
        value: this.props.md
      };
  
      this.handleChange = this.handleChange.bind(this);
   }

   //On keypress
   handleChange(event) {
     this.setState({value: event.target.value});
   }
  
   //An MD file is loaded
   componentWillReceiveProps(nextProps) {
      if (nextProps.md !== this.state.value) {
        this.setState({ value: nextProps.md });
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