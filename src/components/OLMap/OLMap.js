import React from 'react'
import { Map, View } from 'ol';
import { OSM as OSMSource } from 'ol/source'
import { Tile as TileLayer } from 'ol/layer'
import { fromLonLat } from 'ol/proj';
import {
    Attribution,
    ScaleLine,
    ZoomSlider,
    Zoom,
    Rotate,
    MousePosition,
    OverviewMap,
    defaults as DefaultControls
} from 'ol/control'
import Overlay from 'ol/Overlay';

class OLMap extends React.Component {
    constructor(props) {
        super(props);

        this.state = { center: this.props.center, zoom: 1 };

        this.olmap = new Map({
            target: null,
            layers: [
                new TileLayer({
                    source: new OSMSource()
                })
            ],
            view: new View({
                projection: 'EPSG:3857',
                center: this.state.center,
                zoom: this.state.zoom
            }),
            controls: DefaultControls().extend([
                new OverviewMap()
            ]),
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

    // shouldComponentUpdate(nextProps, nextState) {
    //     let center = this.olmap.getView().getCenter();
    //     let zoom = this.olmap.getView().getZoom();
    //     if (center === nextState.center && zoom === nextState.zoom) return false;
    //     return true;
    // }

    componentDidUpdate(prevProps) {
        if (prevProps) {
            if (this.props.center[0] !== prevProps.center[0]) {
                console.log(this.props.center);
                this.setState( { center: this.props.center, zoom: 2 });
                this.olmap.getView().setCenter(this.props.center);
                this.olmap.getView().setZoom(this.state.zoom);
            }
        }
    }
    render() {
        this.updateMap(); // Update map on render?

        var markers = [];
        var marker = null;
        this.props.users.forEach(user => {

            var element = document.createElement('div');
            if (this.props.activeUser && user.login.uuid === this.props.activeUser.login.uuid) {
                element.innerHTML = "<img src='http://maps.google.com/mapfiles/ms/micons/red.png' alt='marker'/>";
            } else {
                element.innerHTML = "<img src='http://maps.google.com/mapfiles/ms/micons/blue.png' alt='marker'/>";
            }

            var pos = fromLonLat([user.location.coordinates.longitude, user.location.coordinates.latitude]);
            marker = new Overlay({
                position: pos,
                positioning: 'center-center',
                element: element,
                stopEvent: false
            });
            markers.push(marker);
            this.olmap.addOverlay(marker);
        });

        return (
            <div id="map" style={{ width: "100%", height: "100vh" }}>

            </div>
        );
    }
}
export default OLMap