import React from 'react';
import {connect} from 'react-redux';

const mapStateToProps = (state) => ({
   saveProjectRequest: state.main.saveProjectRequest
});

class Notification extends React.Component {
   render() {
      return (
         <div className="notificationArea">
            <span className={this.props.saveProjectRequest? "show": "hide"}>
               saving project
            </span>
         </div>
      );
   }
};

export default connect(mapStateToProps)(Notification);