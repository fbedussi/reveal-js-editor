import React from 'react';
import { connect } from 'react-redux';

import { ScrollSyncPane } from 'react-scroll-sync';

import { getHtml } from '../selectors';

const mapStateToProps = (state) => ({
    html: getHtml(state)
});

class Html extends React.Component {
    render() {
        return (
            <div className="htmlContainer">
                <div className="tabContainer">
                    <div className="tab htmlTab text">Html output</div>
                </div>
                <ScrollSyncPane>
                    <div className="rendered-html" dangerouslySetInnerHTML={{ __html: this.props.html }} />
                </ScrollSyncPane>
            </div>
        );
    }
};

export default connect(mapStateToProps)(Html);
