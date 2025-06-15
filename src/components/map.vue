<template>
  <div ref="mapContainer" class="map-container"></div>
  <pre id="info"></pre>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

export default {
  name: "MapboxMap",
  props: {
    center: {
      type: Array,
      default: () => [7.809985453040554, 46.658388077443476],
    },
    zoom: {
      type: Number,
      default: 14,
    },
  },
  mounted() {
    mapboxgl.accessToken = "";

    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: this.center,
      zoom: this.zoom,
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    // Add a polygon (replace with the coordinates of your area)
    this.map.on("load", () => {
      this.map.addSource("polygon", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Polygon",
            // Coordinates of the polygon (you can replace this with any shape)
            coordinates: [
              [
                [7.809464504326286, 46.66090267196989],
                [7.809428854499743, 46.660793682479664],
                [7.8094888110254885, 46.66078144895209],
                [7.809490431472398, 46.66079590675716],
                [7.809542285765843, 46.6607881217858],
                [7.809568212912012, 46.660888214192966],
                [7.809464504326286, 46.66090267196989],
              ],
            ],
          },
        },
      });
    });

    this.map.on("mousemove", (e) => {
      document.getElementById("info").innerHTML =
        // `e.point` is the x, y coordinates of the `mousemove` event
        // relative to the top-left corner of the map.
        JSON.stringify(e.point) +
        "<br />" +
        // `e.lngLat` is the longitude, latitude geographical position of the event.
        JSON.stringify(e.lngLat.wrap());
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      // Select which mapbox-gl-draw control buttons to add to the map.
      controls: {
        polygon: true,
        trash: true,
      },
      // Set mapbox-gl-draw to draw by default.
      // The user does not have to click the polygon control button first.
      defaultMode: "draw_polygon",
    });

    this.map.addControl(draw);

    this.map.on("draw.create", this.printPoints);
  },
  methods: {
    printPoints(e) {
      const features = e.features;
      features.forEach((feature) => {
        if (feature.geometry.type === "Polygon") {
          console.log("Polygon coordinates:", feature.geometry.coordinates);
        } else if (feature.geometry.type === "LineString") {
          console.log("Line coordinates:", feature.geometry.coordinates);
        } else if (feature.geometry.type === "Point") {
          console.log("Point coordinates:", feature.geometry.coordinates);
        }
      });
    },
  },
  beforeDestroy() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style>
.map-container {
  width: 100%;
  height: 500px;
}

#info {
  display: table;
  position: relative;
  margin: 0px auto;
  word-wrap: anywhere;
  white-space: pre-wrap;
  padding: 10px;
  border: none;
  border-radius: 3px;
  font-size: 12px;
  text-align: center;
  color: #222;
  background: #fff;
}
</style>
