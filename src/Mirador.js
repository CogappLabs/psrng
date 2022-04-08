import React, { Component } from "react";
import mirador from "mirador";

class Mirador extends Component {
    /*
        There seems to be something odd with the viewer in that if you try to load a (v2) manifest with search API enabled
        such as https://collections.maison-salins.fr/iiif/2/108217/manifest it will give an 'unexpected < in JSON' error
        because it seems to be looking for the search URL with a /info.json at the end.
        
        This problem does not happen with manifests that don't have search e.g. https://iiif.lib.harvard.edu/manifests/drs:48309543

    */

    componentDidMount() {
        const { config, plugins, manifest } = this.props;
        mirador.viewer(config, plugins);
    }

    render() {
        const { config, plugins, manifest } = this.props;
        console.log("manifest = " + manifest);
        if (manifest == 'a') {
// can't find a way to programatically load the JSON for a manifest            
//            mirador.actions.setConfig({
//                id: "mirador", windows: [{
//                  loadedManifest: 'https://iiif.bodleian.ox.ac.uk/iiif/manifest/e32a277e-91e2-4a6d-8ba6-cc4bad230410.json'
//                }],
//              });
            console.log(mirador);
        }
        return <div id={config.id} style={{ height: '600px', width: '800px' }} />;
    }
}

export default Mirador;