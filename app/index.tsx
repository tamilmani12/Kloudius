import { AuthContext } from "@/components/Context/AuthContext";
import { Height, Width } from "@/components/Style/Globalstyle";
import { router, useFocusEffect } from "expo-router";
import React, { useContext } from "react";
import { Image, View } from 'react-native';
export default function Index() {
     const auth = useContext(AuthContext);
     console.log(auth,'sutg');
    useFocusEffect(
  React.useCallback(() => {
    const timer = setTimeout(() => {
      auth?.user ? router.push('/dashboard') : router.push('/login');
    }, 3000);

    return () => clearTimeout(timer);
  }, [auth?.user])
);
    return(
        <View style={{width:Width,height:Height,backgroundColor:"white",justifyContent:'center',alignItems:"center"}}>
            <Image source={require('../assets/images/Logo.webp')}/>
        </View>
    )
}