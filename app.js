import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image } from 'react-native';
import axios from 'axios';
import { LinearGradient } from 'expo-linear-gradient';

export default function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = 'c1197c4c4be30e3c32e10e88bab17598';
  const CITY = 'Riga';

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&units=metric&appid=${API_KEY}`
      );
      setWeather(response.data);
    } catch (err) {
      setError('Failed to fetch weather data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeather();
  }, []);

  if (loading) {
    return (
      <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
        <ActivityIndicator size="large" color="#fff" />
        <Text style={styles.loadingText}>Loading weather data...</Text>
      </LinearGradient>
    );
  }

  if (error) {
    return (
      <LinearGradient colors={['#ff6e7f', '#bfe9ff']} style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#4facfe', '#00f2fe']} style={styles.container}>
      <View style={styles.weatherCard}>
        <Text style={styles.city}>{weather.name}</Text>
        <Text style={styles.temperature}>{Math.round(weather.main.temp)}°C</Text>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `https://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`,
          }}
        />
        <Text style={styles.description}>{weather.weather[0].description}</Text>
        <View style={styles.details}>
          <Text style={styles.detailText}>Feels Like: {Math.round(weather.main.feels_like)}°C</Text>
          <Text style={styles.detailText}>Humidity: {weather.main.humidity}%</Text>
          <Text style={styles.detailText}>Wind: {Math.round(weather.wind.speed)} m/s</Text>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#fff',
    fontSize: 18,
    marginTop: 20,
  },
  errorText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  weatherCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  city: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  temperature: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ff6e7f',
  },
  weatherIcon: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
  description: {
    fontSize: 20,
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 10,
  },
  details: {
    marginTop: 10,
    alignItems: 'center',
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginVertical: 2,
  },
});