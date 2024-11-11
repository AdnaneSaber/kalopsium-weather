import React, { useEffect, useRef } from "react";
import mapboxgl, { LngLatLike, Map as MapboxMap } from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

interface MapProps {
  posix: LngLatLike;
  index: number;
  zoom?: number;
}

const Map: React.FC<MapProps> = ({ index, posix, zoom = 9 }) => {
  const accessToken = process.env.NEXT_PUBLIC_MAPGL_APIKEY;
  const mapRef = useRef<MapboxMap | null>(null);
  const mapContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (accessToken) {
      mapboxgl.accessToken = accessToken;
      mapRef.current = new mapboxgl.Map({
        container: mapContainerRef.current as HTMLElement,
        style: "mapbox://styles/mapbox/dark-v11",
        center: posix,
        zoom: zoom,
      });
    }
    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
      }
    };
  }, [accessToken, posix, index, zoom]);

  return (
    <div
      ref={mapContainerRef}
      className="m-auto"
      style={{ width: "100%", height: "100%" }}
    />
  );
};

export default Map;
