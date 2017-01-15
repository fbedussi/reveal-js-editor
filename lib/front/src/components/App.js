import React from 'react';
import {connect} from 'react-redux';
import Helmet from "react-helmet";

import Controls from './Controls';
import Md from './Md';
import Html from './Html';
import Preview from './Preview';

const mapStateToProps = (state) => ({
   currentFileName: state.main.currentFileName
});

class App extends React.Component {
   render() {
      return (
         <div className="application">
            <Helmet title={`REMEDI - ${this.props.currentFileName}`} />
            <Controls />
            <div className="mainWrapper">
               <section className="editor">
                  <section className="content">
                     <Md />
                     <Html />
                  </section>
               </section>
               <Preview />
            </div>
         </div>
      );
   }
};

export default connect(mapStateToProps)(App);

