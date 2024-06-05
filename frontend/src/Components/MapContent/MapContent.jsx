"use client";
import React, { useState } from "react";
import {
  APIProvider,
  Map,
  AdvancedMarker,
  Pin,
  InfoWindow,
} from "@vis.gl/react-google-maps";

import styles from "./MapContent.module.scss";
import PropTypes from "prop-types";

const MapContent = ({ activeTab }) => {
  const [info, setInfo] = useState(false);
  const position = (activeTab) => {
    switch (activeTab) {
      case "Kyiv":
        return { lat: 50.450702369063926, lng: 30.523146950852503 };
      case "Lviv":
        return { lat: 49.8386205833624, lng: 24.03400493901791 };
      case "Kharkiv":
        return { lat: 49.99193802948051, lng: 36.23430932553278 };
      default:
        return { lat: 50.4501, lng: 30.5234 };
    }
  };

  return (
    <APIProvider apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <Map
        center={position(activeTab)}
        className={styles.mapContainer}
        defaultZoom={14}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        mapId={process.env.REACT_APP_NEXT_MAP_ID}
      >
        <AdvancedMarker
          position={position(activeTab)}
          onClick={() => setInfo(true)}
        >
          <Pin
            background={"purple"}
            borderColor={"green"}
            glyphColor={"white"}
          />
        </AdvancedMarker>
        {info && (
          <InfoWindow
            position={position(activeTab)}
            onCloseClick={() => setInfo(false)}
          >
            <b style={{ color: "rebeccapurple" }}>
              Hello, I am NiceGadgets Shop. You can find us here!
            </b>
          </InfoWindow>
        )}
      </Map>
    </APIProvider>
  );
};

MapContent.propTypes = {
  activeTab: PropTypes.string,
};
export default React.memo(MapContent);
