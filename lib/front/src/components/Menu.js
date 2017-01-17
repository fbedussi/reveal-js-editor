import {remote} from 'electron';

import React from 'react';
import {connect} from 'react-redux';

import {openFile} from '../actions';
import {getLabels} from '../selectors';

const mapStateToProps = (state) => ({
    labels: getLabels(state)
});

const mapDispatchToProps = dispatch => ({
   openFile: () => dispatch(openFile()),
   saveProject: () => dispatch(saveProject()) 
});

//const template = [{
//    label: 'File',
//    submenu: [{
//        label: 'Open a markdown file...',
//        accelerator: 'CmdOrCtrl+O',
//        click: this.props.openFile
//    }]
//   }, {
//    label: 'Developer',
//    submenu: [{
//        label: 'Toggle Developer Tools',
//        accelerator: process.platform === 'darwin' ? 'Alt+Command+I' : 'F12',
//        click() {
//            remote.getCurrentWindow()
//                .webContents.toggleDevTools()
//        }
//    }]
//}]

class Menu extends React.Component {
    constructor(props) {
        super(props);

         const menu = new remote.Menu;
         
         var that = this;
        
        menu.append(new remote.MenuItem({
         label: this.props.labels['File'],
            submenu: [{
                label: 'Open a markdown file...',
                accelerator: 'CmdOrCtrl+O',
                click: this.props.openFile
            }]
        }))

        remote.Menu.setApplicationMenu(menu);
    }

    componentWillReceiveProps(nextProps) {
        //if (nextProps.md !== this.state.value) {
        //  this.setState({ value: nextProps.md });
        //}

        const menu = new remote.Menu;
        
        menu.append(new remote.Menu.MenuItem({
         label: 'File',
            submenu: [{
                label: 'Open a markdown file...',
                accelerator: 'CmdOrCtrl+O',
                click: this.props.openFile
            }]
        }))

        remote.Menu.setApplicationMenu(menu);
    }

    render() {
        return null;
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);