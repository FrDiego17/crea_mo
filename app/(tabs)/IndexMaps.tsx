import { StyleSheet, View } from 'react-native';
import * as React from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { Directions } from 'react-native-gesture-handler';


export default function IndexMaps() {
  const [origin, setOrigin] = React.useState({
    latitude: 13.6929,
    longitude: -89.2182,
  });

  const [destination, setDestination] = React.useState({
    latitude: 13.7000,
    longitude: -89.2100,
  });

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: origin.latitude,
          longitude: origin.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        <Marker draggable coordinate={origin} onDragEnd={(direction) => setOrigin(direction.nativeEvent.coordinate)} title="Origen" />
        <Marker draggable coordinate={destination} onDragEnd={(direction) => setDestination(direction.nativeEvent.coordinate)} title="Destino" />

        {/*<MapViewDirections 
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_KEY}
        /> */}
        
        <Polyline
          coordinates={[ origin, destination ]}
          strokeColor="#000" 
          strokeWidth={3}
        />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
