import React, { useState } from "react";
import { View, Text,/* Button, */ Alert, TouchableOpacity, Image} from 'react-native'
import styles from './login-styles'
import { TextInput, Button } from 'react-native-paper'
import { Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome'
import db from "../../../firebase"


const Login = ({ navigation }) => {

  const [text, setText] = useState({
    email: "",
    password: ""
  });
  const [hide,setHide]=useState(true);
  const nameIcon= hide ? 'eye-slash':'eye';

  const handleChange = (name, value) => {
    setText({
      ...text,
      [name]: value
    })
  }

  


  const login = () => {
    //Loguea usuario
    db.auth().signInWithEmailAndPassword(text.email, text.password)
      .then(res => {
        //Valida si el mail se verificó
        if (res.user.emailVerified) {
          navigation.navigate('HomeDrawer')
        } else {
          navigation.navigate('Verify')
        }
      })
      .catch(function (error) {

        Alert.alert(
          "Ups!",
          "Email o contraseña son incorrectas",
          [{ text: 'continuar' }]
        )
      })
    // hasta que funcione el back

    // Alert.alert(
    //     "Bienvenido!",
    //     "Serás redirigido a tu perfil.",
    //     [{text:'continuar'}]
    // )
  }

  return (
    <View style={styles.container}>
       <Text style={styles.text}>$ald∞</Text> 
      <Image source={require("../../src/logo.png")} />
      <View style={{ width: '90%' }}>
        <Input
          textContentType='emailAddress'
          autoCompleteType='email'
          label=' Email'
          leftIcon={{ type: 'font-awesome', name: 'envelope' }}
          placeholderTextColor='grey'
          placeholder='Email'
          onChangeText={(value) => handleChange('email', value)}
          defaultValue={text.email}
        />
        <View style={styles.contEye}>
        <Input
          secureTextEntry={hide}
          autoCompleteType='password'
          label='Password'
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          placeholderTextColor='grey'
          placeholder=' Password'
          onChangeText={(value) => handleChange('password', value)}
          defaultValue={text.password}
        />
        <View style={styles.eye}>
            <Icon
                size={16}
                name={nameIcon}
                type="font-awesome"
                color="#02072f"
                onPress={()=>setHide(!hide)}
               
              />
          </View>

        </View>
      </View>
      <View style={styles.button}>
        <Button
          mode='contained'
          title='Login'
          onPress={login}
          color='darkblue'
        >
          Login
        </Button>
      </View>
      <View style={styles.viewLinks}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPaswword')}
        >
          <Text style={styles.link}>Olvidé mi contraseña</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={styles.link}>Crear cuenta</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default Login;