import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { logout, getCurrentUser } from '../../auth';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function HomeScreen() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  // Cargar usuario al entrar
  useEffect(() => {
     const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    };
    fetchUser();
  }, []);
  
  const handleLogout = async () => {
    await logout();
    setUser(null); // Esto actualiza la vista al "no logueado"
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.logo}>U-Go!</Text>
        {!user ? (
        <View style={styles.navbar}>
          <TouchableOpacity><Text style={styles.navItem}>Inicio</Text></TouchableOpacity>
          <TouchableOpacity><Text onPress={() => router.replace('LoginScreen')} style={styles.navItem}>Inicio de sesión</Text></TouchableOpacity>
          <TouchableOpacity><Text onPress={() => router.replace('SignupScreen')} style={styles.navItem}>Registrarse</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navItem}>Contáctanos</Text></TouchableOpacity>
        </View>
        ) : (
          <View style={styles.navbar}>
          <TouchableOpacity><Text style={styles.navItem}>Inicio</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navItem}>Contáctanos</Text></TouchableOpacity>
          <TouchableOpacity><Text style={styles.navItem}>{user?.username ? `${user.username}` : ''}</Text></TouchableOpacity>
          <TouchableOpacity><Text onPress={handleLogout} style={styles.navItem}>Cerrar Sesion</Text></TouchableOpacity>
        </View>
        )}
      </View>

      <View style={styles.heroContainer}>
        <Image source={require('../assets/hero.jpg')} style={styles.heroImage} />
        <View style={styles.heroOverlay}>
          <Text style={styles.heroTitle}>Una forma más justa de moverte en la universidad</Text>
          <Text style={styles.heroSubtitle}>Rutas seguras, fáciles y en tiempo real.</Text>
          <View style={styles.storeButtons}>
            <TouchableOpacity style={styles.storeButton} onPress={() => Linking.openURL('#')}>
              <Text style={styles.storeButtonText}>🌐 App Store</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.storeButton} onPress={() => Linking.openURL('#')}>
              <Text style={styles.storeButtonText}>🌐 Play Store</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={styles.infoSection}>
        <Image source={require('../assets/driver.jpg')} style={styles.infoImage} />
        <View style={styles.infoTextContainer}>
          <Text style={styles.infoTitle}>SERVICIO, CALIDAD Y EXPERIENCIA EN CADA RECORRIDO</Text>
          <Text style={styles.infoText}>
            Somos una plataforma creada por estudiantes para estudiantes, con el objetivo de mejorar la movilidad
            universitaria mediante tecnología innovadora y colaboración comunitaria. Nuestra misión es reducir el tiempo de desplazamiento,
            aumentar la seguridad y promover el transporte sostenible entre campus.
          </Text>
        </View>
      </View>
      
      <Text style={styles.vehiculosTitle}>Nuestros vehículos</Text>
      <View style={styles.vehiculosContainer}>
        <View style={styles.card}>
          <Image source={require('../assets/bus.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>BUS EQUIPADO</Text>
          <Text style={styles.cardSubtitle}>🚌 37 asientos</Text>
          <Text style={styles.cardText}>- Paradas seguras preestablecidas
            - Cinturones de seguridad
            - Unidades climatizadas
            - GPS
            - Horarios fijos de rutas
            - Seguro de viajero a bordo
            - Conductor capacitado en seguridad vial
            - Unidad exclusiva de la universidad
            - Monitoreo de abordaje</Text>
        </View>
        <View style={styles.card}>
          <Image source={require('../assets/microbus.png')} style={styles.cardImage} />
          <Text style={styles.cardTitle}>MICROBÚS</Text>
          <Text style={styles.cardSubtitle}>🚌 19 asientos</Text>
          <Text style={styles.cardText}>- Paradas seguras preestablecidas
            - Cinturones de seguridad
            - Unidades climatizadas
            - GPS
            - Horarios fijos de rutas
            - Seguro de viajero a bordo
            - Conductor capacitado en seguridad vial
            - Unidad exclusiva de la universidad
            - Monitoreo de abordaje</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f5' },
  header: { marginTop: 60, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: '#183a71' },
  logo: { color: '#fff', fontWeight: 'bold', fontSize: 22 },
  navbar: { flexDirection: 'row', gap: 10 },
  navItem: { color: '#fff', marginHorizontal: 5 },
  heroContainer: { position: 'relative', width: '100%', height: 300 },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.4)', paddingHorizontal: 20 },
  heroTitle: { fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: '#fff' },
  heroSubtitle: { fontSize: 16, textAlign: 'center', marginVertical: 10, color: '#fff' },
  storeButtons: { flexDirection: 'row', gap: 10 },
  storeButton: { backgroundColor: '#183a71', padding: 10, borderRadius: 20, marginHorizontal: 5 },
  storeButtonText: { color: '#fff' },
  infoSection: { flexDirection: 'row', padding: 20, alignItems: 'center' },
  infoImage: { width: 120, height: 120, borderRadius: 10, marginRight: 20 },
  infoTextContainer: { flex: 1 },
  infoTitle: { fontWeight: 'bold', fontSize: 18, marginBottom: 10 },
  infoText: { fontSize: 14, color: '#333' },
  vehiculosTitle: { fontSize: 20, fontWeight: 'bold', textAlign: 'center', marginTop: 30 },
  vehiculosContainer: { flexDirection: 'row', justifyContent: 'space-around', padding: 20, flexWrap: 'wrap' },
  card: { backgroundColor: '#222', borderRadius: 10, padding: 15, width: '45%', marginVertical: 10 },
  cardImage: { width: '100%', height: 100, resizeMode: 'contain', marginBottom: 10 },
  cardTitle: { color: '#fff', fontWeight: 'bold', fontSize: 16, marginBottom: 5 },
  cardSubtitle: { color: '#61dafb', marginBottom: 10 },
  cardText: { color: '#fff', fontSize: 12 },
});
