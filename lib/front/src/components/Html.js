import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   html: state.main.html
});

var Html = React.createClass({
   render: function() {
      return (
         <div className="htmlContainer">
            <div className="tabContainer">
               <div className="tab htmlTab text">Html output</div>
            </div>
            <div className="rendered-html" dangerouslySetInnerHTML={{__html: this.props.html}}/>
         </div>
      );
   }
});

export default connect(mapStateToProps)(Html);