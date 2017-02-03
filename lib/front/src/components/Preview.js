import React from 'react';
import {connect} from 'react-redux';

import {getHtml} from '../selectors';

const mapStateToProps = (state) => ({
   html: getHtml(state)
});

class Preview extends React.Component{
   render() {
      return (
         <section className="preview">
            <div className="reveal">
               <div className="slides" dangerouslySetInnerHTML={{__html: this.props.html}} />
            </div>
         </section>
      );
   }
};

export default connect(mapStateToProps)(Preview);
