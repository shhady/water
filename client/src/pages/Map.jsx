import React, { useEffect, useRef } from "react";

const Map = () => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Load the Google Maps API script
    const googleMapScript = document.createElement("script");
    googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places`;
    googleMapScript.async = true;
    window.document.body.appendChild(googleMapScript);

    googleMapScript.addEventListener("load", () => {
      // Initialize the map
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 51.505, lng: -0.09 },
        zoom: 13,
      });

      // Add a marker to the map
      const marker = new window.google.maps.Marker({
        position: { lat: 51.5, lng: -0.09 },
        map: map,
        title: "A marker!",
      });
    });

    // Clean up the Google Maps API script
    return () => {
      googleMapScript.removeEventListener("load");
      window.document.body.removeChild(googleMapScript);
    };
  }, []);

  return <div ref={mapContainerRef} style={{ height: "400px" }} />;
};

export default Map;
