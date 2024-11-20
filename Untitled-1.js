<!DOCTYPE html>
<html>
  <head>
    <title>3D Maps Dynamic Loader</title>
    <style>
      html,
      body {
        height: 100%;
        margin: 0;
        padding: 0;
      }
      #map {
        height: 100%;
      }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script async defer>
      (g => {
        var h, a, k, p = "The Google Maps JavaScript API", c = "google", l = "importLibrary", q = "__ib__", m = document, b = window;
        b = b[c] || (b[c] = {});
        var d = b.maps || (b.maps = {}), r = new Set, e = new URLSearchParams,
          u = () => h || (h = new Promise(async (f, n) => {
            await (a = m.createElement("script"));
            e.set("libraries", [...r] + "");
            for (k in g) e.set(k.replace(/[A-Z]/g, t => "_" + t[0].toLowerCase()), g[k]);
            e.set("callback", c + ".maps." + q);
            a.src = `https://maps.${c}apis.com/maps/api/js?` + e;
            d[q] = f;
            a.onerror = () => h = n(Error(p + " could not load."));
            a.nonce = m.querySelector("script[nonce]")?.nonce || "";
            m.head.append(a);
          }));
        d[l] ? console.warn(p + " only loads once. Ignoring:", g) : d[l] = (f, ...n) => r.add(f) && u().then(() => d[l](f, ...n));
      })({
        key: "API",
        v: "alpha",
      });

      // Initialize the map
      window.initMap = function () {
        const map = new google.maps.Map(document.getElementById("map"), {
          center: { lat: 37.841157, lng: -122.551679 },
          zoom: 14,
          heading: 330,
          tilt: 75,
        });
      };
    </script>
    <script>
        async function init() {
          const { Map3DElement } = await google.maps.importLibrary("maps3d");
        }
        init();               
        const map3DElement = new Map3DElement({
            center: { lat: 43.6425, lng: -79.3871, altitude: 400 },
            range: 1000,
            tilt: 60,
        });
      
        document.body.append(map3DElement);
      </script>
  </body>
</html>



