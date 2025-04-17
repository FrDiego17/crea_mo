import api from './api';  

// Función de login
export async function login(username, password) {
  try {
    // Hacemos la solicitud POST a la API de Laravel
    const response = await api.post('login', {
      username,
      password,
    });

    // Si el login es exitoso, puedes manejar la respuesta
    console.log('Login exitoso:', response.data);

    // Aquí puedes almacenar el token o el usuario en tu estado o en AsyncStorage
    return response.data;
  } catch (error) {
    // Manejo de error
    console.error('Error al hacer login:', error.response?.data || error.message);
    return null;
  }
}

export async function register(username, email, password, password_confirmation) {
    try {
      const response = await api.post('register', {
        username,
        email,
        password,
        password_confirmation,
      });
  
      console.log('Registro exitoso:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error al registrarse:', error.response?.data || error.message);
      return null;
    }
}
  