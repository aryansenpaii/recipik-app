import React, { useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { login } from '../services/authApi';

export default function LoginScreen({ navigation }) {
  const { control, handleSubmit } = useForm();
  const { signIn } = useContext(AuthContext);

  const onSubmit = async (data) => {
    try {
      const result = await login(data.email, data.password);
      await signIn({ token: result.token, user: result.user });
    } catch (error) {
      Alert.alert('Login failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <Controller
        control={control}
        name="email"
        rules={{ required: true }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={value}
            onChangeText={onChange}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{ required: true }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      <Button title="Login" onPress={handleSubmit(onSubmit)} />

      <Text style={styles.link} onPress={() => navigation.navigate('Register')}>
        Don't have an account? Register
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, justifyContent: 'center' },
  input: { borderWidth: 1, padding: 12, marginBottom: 12, borderRadius: 4 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 24, textAlign: 'center' },
  link: { color: 'blue', marginTop: 16, textAlign: 'center' },
});
