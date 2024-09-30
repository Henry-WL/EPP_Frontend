import React, { useEffect, useState } from "react";
import { GoogleMap, Marker } from "@react-google-maps/api";
import axios from "axios";

interface CustomMapProps {
  location: string;
}

const CustomMap:React.FC<CustomMapProps> = ({ location }) => {
  const mapStyles = {
    height: "400px",
    width: "100%",
    borderRadius: "20px",
  };

  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [scriptLoaded, setScriptLoaded] = useState(false); // Track script loading

  useEffect(() => {
    // Fetch coordinates based on location
    const fetchCoordinates = async () => {
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${location}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`
        );
        const { lat, lng } = response.data.results[0].geometry.location;
        setCoordinates({ lat, lng });
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    fetchCoordinates();
  }, [location]);

  useEffect(() => {
    if (!scriptLoaded) {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;
      script.async = true;
      script.onload = () => setScriptLoaded(true);
      document.body.appendChild(script);
    }
  }, [scriptLoaded]);

  if (!scriptLoaded || !coordinates) {
    return <div>Loading...</div>;
  }
  
  const mapOptions = {
    disableDefaultUI: true,
    gestureHandling:"greedy"
  }

  return (
    <div className="map-container">
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={coordinates}
        options={mapOptions}
      >
        <Marker position={coordinates} />
      </GoogleMap>
    </div>
  );
}

export default CustomMap;
