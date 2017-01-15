import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   html: state.main.html
});

class Preview extends React.Component{
   render() {
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
};

export default connect(mapStateToProps)(Preview);