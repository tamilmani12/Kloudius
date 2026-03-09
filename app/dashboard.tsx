import { AuthContext } from "@/components/Context/AuthContext";
import { calculatedwidth, Height, hs, statusBarHeight, Width } from "@/components/Style/Globalstyle";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const storedUser = await AsyncStorage.getItem("currentUser");

    if (storedUser) {
      const uservalue = JSON.parse(storedUser);
      setUser(uservalue);
      console.log(uservalue, "user");
    }

  };
       const authContext = useContext(AuthContext);
  
  const handlelogout = async () => {
      if (!authContext) return null;
     const { logout } = authContext;
    await logout();
    router.push('/login');
  }
    return(
        <View style={{width:Width,height:Height,backgroundColor:'white',paddingTop:statusBarHeight}}>
               <Image source={require('@/assets/images/Logo.webp')} style={{width:calculatedwidth(342),height:calculatedwidth(180),marginBottom:hs(24)}} resizeMode='contain' />
        <Text style={{fontSize:calculatedwidth(14),textAlign:'center',color:'#000'}}>Welcome <Text style={{fontWeight:'bold',color:'#F42525',fontSize:calculatedwidth(16)}}>{user?.name || "User"}</Text> to the Dashboard</Text>
         <TouchableOpacity onPress={handlelogout} style={{backgroundColor:'#F42525',paddingVertical:hs(12),borderRadius:18,marginTop:hs(24),width:'80%',alignSelf:'center',}}>  
                    <Text style={{color:'white',textAlign:'center',fontSize:calculatedwidth(16),fontWeight:'semibold'}}>Log Out</Text>
                </TouchableOpacity>
        </View>
    )
}