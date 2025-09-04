import React, { useContext } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { AuthContext } from '../context/AuthContext';
import { register } from '../services/authApi';

export default function RegisterScreen({ navigation }) {
  const { control, handleSubmit, watch } = useForm();
  const { signIn } = useContext(AuthContext);
  const password = watch('password');

  const onSubmit = async (data) => {
    try {
      const result = await register(data.name, data.email, data.password);
      await signIn(result.token);
    } catch (error) {
      Alert.alert('Registration failed', error.response?.data?.message || error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      <Controller
        control={control}
        name="name"
        rules={{ required: true }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={value}
            onChangeText={onChange}
          />
        )}
      />

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
        rules={{ required: true, minLength: 6 }}
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

      <Controller
        control={control}
        name="confirmPassword"
        rules={{
          required: true,
          validate: value => value === password || "Passwords don't match"
        }}
        defaultValue=""
        render={({ field: { onChange, value } }) => (
          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            value={value}
            onChangeText={onChange}
            secureTextEntry
          />
        )}
      />

      <Button title="Register" onPress={handleSubmit(onSubmit)} />

      <Text style={styles.link} onPress={() => navigation.navigate('Login')}>
        Already have an account? Login
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
