import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   md: state.main.md
});

var Md = React.createClass({
   render: function() {
      return (
         <div className="mdContainer">
            <div className="tabContainer">
               <div className="tab mdTab text">Markdown editor</div>
            </div>
            <textarea className="raw-markdown" value={this.props.md}></textarea>	
         </div>
      );
   }
});

export default connect(mapStateToProps)(Md);