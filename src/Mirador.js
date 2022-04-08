import React, { Component } from "react";
import mirador from "mirador";

class Mirador extends Component {
    componentDidMount() {
        const { config, plugins } = this.props;
        mirador.viewer(config, plugins);
    }

    render() {
        const { config } = this.props;
        return <div id={config.id} style={{ height: '600px', width: '800px' }} />;
    }
}

export default Mirador;