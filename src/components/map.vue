<template>
  <div ref="mapContainer" class="map-container" aria-label="Interaktive Karte von Därligen">
    <p v-if="loading" class="map-status">Karte wird geladen …</p>
    <p v-else-if="error" class="map-status map-error">{{ error }}</p>
  </div>
</template>

<script>
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
  data() {
    return {
      map: null,
      loading: true,
      error: "",
    };
  },
  async mounted() {
    let mapboxgl;
    let MapboxDraw;

    try {
      const [mapboxModule, drawModule] = await Promise.all([
        import("mapbox-gl"),
        import("@mapbox/mapbox-gl-draw"),
        import("@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css"),
      ]);
      mapboxgl = mapboxModule.default;
      MapboxDraw = drawModule.default;
    } catch (error) {
      this.loading = false;
      this.error = "Die Karte konnte nicht geladen werden.";
      console.error(error);
      return;
    }

    mapboxgl.accessToken = "";

    this.map = new mapboxgl.Map({
      container: this.$refs.mapContainer,
      style: "mapbox://styles/mapbox/outdoors-v12",
      center: this.center,
      zoom: this.zoom,
    });

    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on("load", () => {
      this.loading = false;
    });

    this.map.on("error", () => {
      this.loading = false;
      this.error = "Die Karte konnte nicht geladen werden.";
    });

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
  beforeUnmount() {
    if (this.map) {
      this.map.remove();
    }
  },
};
</script>

<style>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
  margin-top: 1rem;
  background: #f3f4f6;
}

.map-status {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #374151;
}

.map-error {
  color: #991b1b;
}
</style>
