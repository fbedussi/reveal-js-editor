import React from 'react';
import {connect} from 'react-redux';
import Helmet from "react-helmet";

import Menu from './Menu';
import Workarea from './Workarea';
import BgOptions from './BgOptions';
import {getLeftPanelStatus} from '../selectors';

const mapStateToProps = (state) => ({
   currentFileName: state.main.currentFileName,
   leftPanelOpen: getLeftPanelStatus(state)
});

class App extends React.Component {
   render() {
      return (
		 <div className={this.props.leftPanelOpen? 'application leftPanelOpen' : 'application'}>
            <Helmet title={`REMEDI - ${this.props.currentFileName}`} />
            <Menu />
            <Workarea />
			<BgOptions />
         </div>
      );
   }
};

export default connect(mapStateToProps)(App);

