import { AuthContext } from '@/components/Context/AuthContext';
import { calculatedwidth, Height, hs, statusBarHeight, Width } from '@/components/Style/Globalstyle';
import { router } from 'expo-router';
import React, { useContext, useState } from 'react';
import { Image, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function Login() {
    const [secure, setSecure] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errormsg,setErrormsg] = useState('');
     const authContext = useContext(AuthContext);
   
    const handleLogin = async () => {
          if (!authContext) return null;
     const { login } = authContext;
  const validemail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !password) {
    setErrormsg('Please fill all the fields');
    return;
  }
  if (!validemail.test(email)) {
    setErrormsg('Please enter a valid email');
    return;
  }
  setErrormsg('');
  const loginResult = await login(email.toLowerCase(), password);
  console.log(loginResult,'logres');
};
  return (
    <View style={{width:Width,height:Height,backgroundColor:"white",paddingTop:statusBarHeight}}>
          <Image source={require('@/assets/images/Logo.webp')} style={{width:calculatedwidth(342),height:calculatedwidth(180),marginBottom:hs(24)}} resizeMode='contain' />
    <Text style={{textAlign:'center',fontSize:calculatedwidth(32),fontWeight:'bold',marginBottom:hs(10),color:'black'}}>Welcome Back</Text>
<Text style={{textAlign:'center',fontSize:calculatedwidth(16),color:'grey',marginBottom:hs(24)}}>Log in to your account to continue</Text>
    <View style={{paddingHorizontal:calculatedwidth(24)}}>
        <Text style={{fontSize:calculatedwidth(14),color:'black',fontWeight:'bold'}}>Email Address</Text>
        <TextInput value={email} onChangeText={(text)=>{setEmail(text)}} placeholder="Enter your email" style={{borderWidth:1,borderColor:errormsg?'red':'lightgrey',borderRadius:8,paddingHorizontal:calculatedwidth(12),paddingVertical:hs(10),marginTop:hs(8)}} />
  
   <Text style={{fontSize:calculatedwidth(14),color:'black',fontWeight:'bold',marginTop:hs(16)}}>Password</Text>
      <View
  style={{
    flexDirection: 'row',
    borderWidth: 1,
    borderColor:errormsg?'red': 'lightgrey',
    borderRadius: 8,
    paddingHorizontal: calculatedwidth(12),
    paddingVertical: hs(10),
    marginTop: hs(8),
    alignItems: 'center'
  }}
>
  <TextInput value={password} onChangeText={(text)=>{setPassword(text)}} placeholder="Enter your password" secureTextEntry={secure}
    style={{ flex: 1,color:'black' }}
  />

<TouchableOpacity onPress={()=>{setSecure(!secure)}}>
  <Image
    source={require('@/assets/images/eye.png')} style={{width: calculatedwidth(20),height: calculatedwidth(20)}}
    resizeMode="contain"
  />
  </TouchableOpacity>
</View>
        <Text style={{fontSize:calculatedwidth(14),color:'red',fontWeight:'bold',marginTop:5}}>{errormsg}</Text>
        
        <TouchableOpacity onPress={handleLogin} style={{backgroundColor:'#F42525',paddingVertical:hs(12),borderRadius:8,marginTop:hs(24)}}>  
            <Text style={{color:'white',textAlign:'center',fontSize:calculatedwidth(16),fontWeight:'semibold'}}>Log In</Text>
        </TouchableOpacity>
         <View style={{flexDirection:'row',justifyContent:'center',marginTop:hs(16)}}>
            <Text style={{color:'grey',fontSize:calculatedwidth(14)}}>Don't have an account? </Text>
            <TouchableOpacity onPress={()=>router.push('/signup')}>
            <Text style={{color:'#F42525',fontSize:calculatedwidth(14),fontWeight:'bold'}}>Sign Up</Text>

            </TouchableOpacity>
        </View>
    </View>
    </View>
  );
}
