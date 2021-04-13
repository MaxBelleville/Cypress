import React, { Component } from "react";
import { GoogleMap, HeatmapLayer } from "@react-google-maps/api";
import { useTranslation } from "react-i18next";
import "../Styles/Map.css";
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete";

const mapContainerStyle = {
  width: "60vw",
  height: "60vh",
  marginBottom: "2%",
};
const options = {
  disableDefaultUI: true,
  zoomControl: true,
};
const center = { lat: 43.653225, lng: -79.383186 };
export const LocationMap = (props) => {
  const mapRef = React.useRef();
  const updateAddr = async (value) => {
    const results = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(results[0]);
    panTo({ lat, lng });
  };
  const mapLoad = React.useCallback((map) => {
    mapRef.current = map;
    if (props.address) {
      updateAddr(props.address);
    }
  }, []);
  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(14);
  }, []);
  console.log(props.lock);
  return (
    <div>
      {!props.locked ? (
        <Search pan={panTo} address={props.address} loc={props.setLoc} />
      ) : null}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={13}
        center={center}
        options={options}
        onLoad={mapLoad}
      ></GoogleMap>
    </div>
  );
};
const Search = (props) => {
  const { t, i18n } = useTranslation("common");
  const [addr, setAddr] = React.useState(props.address);
  const handleSelect = async (value) => {
    const results = await geocodeByAddress(value);
    const { lat, lng } = await getLatLng(results[0]);
    if (results[0].address_components[3].long_name === "Toronto") {
      setAddr(value);
      props.loc(value);
      props.pan({ lat, lng });
    }
  };
  const searchOptions = {
    location: { lat: () => 43.653225, lng: () => -79.383186 },
    radius: 20 * 1000,
  };
  return (
    <div className="search">
      <PlacesAutocomplete
        value={addr}
        onChange={setAddr}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
            <div>
              <input {...getInputProps({ placeholder: "Enter a address" })} />

              <div>
                {loading ? <div>...loading</div> : null}
                {suggestions.map((suggestion) => {
                  const style = {
                    backgroundColor: suggestion.active ? "red" : "white",
                  };
                  return (
                    <div
                      key={suggestion.index}
                      {...getSuggestionItemProps(suggestion, { style })}
                    >
                      {suggestion.description}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        }}
      </PlacesAutocomplete>
    </div>
  );
};
