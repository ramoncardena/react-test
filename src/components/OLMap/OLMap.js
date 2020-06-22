import React from 'react'
import Grid from '@material-ui/core/Grid'
import { Map, View } from 'ol';
import { OSM as OSMSource } from 'ol/source'
import { Vector as VectorLayer, Tile as TileLayer } from 'ol/layer'
import { fromLonLat, toLonLat } from 'ol/proj';
import Overlay from 'ol/Overlay';

class OLMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = { center: [0, 0], zoom: 1 };

        this.olmap = new Map({
            target: null,
            layers: [
                new TileLayer({
                    source: new OSMSource()
                })
            ],
            view: new View({
                center: this.state.center,
                zoom: this.state.zoom
            })
        });
    }

    updateMap() {
        this.olmap.getView().setCenter(this.state.center);
        this.olmap.getView().setZoom(this.state.zoom);
    }

    componentDidMount() {
        this.olmap.setTarget("map");

        // Listen to map changes
        this.olmap.on("moveend", () => {
            let center = this.olmap.getView().getCenter();
            let zoom = this.olmap.getView().getZoom();
            this.setState({ center, zoom });
        });
    }

    shouldComponentUpdate(nextProps, nextState) {
        let center = this.olmap.getView().getCenter();
        let zoom = this.olmap.getView().getZoom();
        if (center === nextState.center && zoom === nextState.zoom) return false;
        return true;
    }

    userAction() {
        this.setState({ center: [546000, 6868000], zoom: 5 });
    }

    render() {
        this.updateMap(); // Update map on render?

        var pos = fromLonLat([16.3725, 48.208889]);
        var marker = new Overlay({
            position: pos,
            positioning: 'center-center',
            element: document.getElementById('marker'),
            stopEvent: false
        });
        this.olmap.addOverlay(marker);
        return (
            <div id="map" style={{ width: "100%", height: "100vh" }}>
                <div id="marker" title="Marker" style={{
                        width: "20px",
                        height: "20px",
                        border: "1px solid #088",
                        borderRadius: "10px",
                        backgroundColor: "#0FF",
                        opacity: "0.5",
                    }}>
                        
                    </div>
            </div>
        );
    }
}
export default OLMap