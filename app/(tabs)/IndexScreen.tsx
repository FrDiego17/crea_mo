import { Image, StyleSheet, Button } from 'react-native';
import React, { useEffect, useState } from 'react';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
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
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">
          Welcome{user?.username ? `, ${user.username}` : ''}!
        </ThemedText>
        <HelloWave />
      </ThemedView>

      {user ? (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Cerrar sesión</ThemedText>
          <Button title="Logout" onPress={handleLogout} />
        </ThemedView>
      ) : (
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Iniciar Sesión</ThemedText>
          <Button title="Ir al Login" onPress={() => router.replace('LoginScreen')} />
        </ThemedView>
      )}
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
