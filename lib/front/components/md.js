import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   md: state.md
});

var Md = React.createClass({
   render: function() {
      return (
        <textarea className="raw-markdown" value={this.props.md}></textarea>	
      );
   }
});

export default connect(mapStateToProps)(Md);