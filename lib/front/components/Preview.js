import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   html: state.main.html
});

var Preview = React.createClass({
   render: function() {
      return (
         <section className="preview">
            <div className="reveal">
               <div className="slides">
                  {this.props.html}   
               </div>
            </div>
         </section>
      );
   }
});

export default connect(mapStateToProps)(Preview);