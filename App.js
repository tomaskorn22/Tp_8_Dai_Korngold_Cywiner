import * as React from 'react';
import { View, Text, Button, TextInput, StyleSheet, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';


function ScreenA1({ navigation }) {
  const [name, setName] = React.useState('');
  const [phone, setPhone] = React.useState('');

  return (
    <View style={styles.screenA}>
      <Text style={styles.text}>Ingrese sus datos</Text>
      <TextInput placeholder="Nombre" onChangeText={setName} />
      <TextInput placeholder="Teléfono" onChangeText={setPhone} />
      <Button title="Enviar" onPress={() => navigation.navigate('ScreenA2', { name, phone })} />
    </View>
  );
}

function ScreenA2({ route }) {
  const { name, phone } = route.params;
  return (
    <View style={styles.screenA}>
      <Text style={styles.text}>Nombre: {name}</Text>
      <Text style={styles.text}>Teléfono: {phone}</Text>
    </View>
  );
}

const StackA = createNativeStackNavigator();
function StackANavigator() {
  return (
    <StackA.Navigator>
      <StackA.Screen name="ScreenA1" component={ScreenA1} />
      <StackA.Screen name="ScreenA2" component={ScreenA2} />
    </StackA.Navigator>
  );
}

function DummyScreen({ title }) {
  return (
    <View style={styles.screenB}>
      <Text style={styles.text}>{title}</Text>
      <Image source={{ uri: 'https://placekitten.com/200/200' }} style={{ width: 100, height: 100 }} />
    </View>
  );
}
const StackB = createNativeStackNavigator();
function StackBNavigator() {
  return (
    <StackB.Navigator>
      <StackB.Screen name="ScreenB1" children={() => <DummyScreen title="Buscador" />} />
      <StackB.Screen name="ScreenB2" children={() => <DummyScreen title="Resultados" />} />
    </StackB.Navigator>
  );
}

const Tab = createBottomTabNavigator();
function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={StackANavigator}
        options={{ tabBarIcon: ({ color }) => (<Ionicons name="home" size={24} color={color} />) }} />
      <Tab.Screen name="Buscar" component={StackBNavigator}
        options={{ tabBarIcon: ({ color }) => (<Ionicons name="search" size={24} color={color} />) }} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  screenA: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fce4ec' },
  screenB: { flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#e8f5e9' },
  text: { fontSize: 20, color: '#333', margin: 10 },
});
