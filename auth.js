import api from './api';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Función para iniciar sesión
export async function login(username, password) {
  try {
    const response = await api.post('login', {
      username,
      password,
    });

    const { token, user } = response.data;

    if (token && user) {
      // Guardamos token y usuario en AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('Login exitoso:', user);
      return response.data;
    } else {
      throw new Error('Datos incompletos recibidos del servidor');
    }
  } catch (error) {
    console.error('Error al hacer login:', error.response?.data || error.message);
    return null;
  }
}

// Función para registrar nuevo usuario
export async function register(username, email, password, password_confirmation) {
  try {
    const response = await api.post('register', {
      username,
      email,
      password,
      password_confirmation,
    });

    const { token, user } = response.data;

    if (token && user) {
      // Guardamos token y usuario en AsyncStorage
      await AsyncStorage.setItem('token', token);
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('Registro exitoso:', user);
      return response.data;
    } else {
      throw new Error('Datos incompletos recibidos del servidor');
    }
  } catch (error) {
    console.error('Error al registrarse:', error.response?.data || error.message);
    return null;
  }
}

// Obtener usuario actual desde AsyncStorage
export async function getCurrentUser() {
  try {
    const user = await AsyncStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.error('Error al obtener usuario:', error.message);
    return null;
  }
}

// Cerrar sesión
export async function logout() {
  try {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('user');
    console.log('Sesión cerrada correctamente');
  } catch (error) {
    console.error('Error al cerrar sesión:', error.message);
  }
}
