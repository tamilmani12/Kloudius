import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { AuthContextType, User } from "../types/AuthTypes";

export const AuthContext = createContext<AuthContextType | null>(null);
interface Props {
  children: ReactNode;
}
const userlist = "users";
const currentuser = "currentUser";
export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loadCurrentUser();
  }, []);
  const loadCurrentUser = async () => {
    const storedUser = await AsyncStorage.getItem(currentuser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  };

  const signup = async (name: string, email: string, password: string) => {
  const storedUsers = await AsyncStorage.getItem(userlist);
  const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
   
    return  {success:false,msg:"User already exists with this email"};;
  }
  const newUser = { name, email, password };
  users.push(newUser);
  await AsyncStorage.setItem(userlist, JSON.stringify(users));
  await AsyncStorage.setItem(currentuser, JSON.stringify(newUser));
  setUser(newUser);
  return {success:true,user:newUser,msg:'User registered successfully'};
};

  const login = async (email: string, password: string) => {
    const storedUsers = await AsyncStorage.getItem(userlist);
    console.log(storedUsers,'stus');
    if (!storedUsers) return {success:false,msg:'user not found'};
    const users: User[] = JSON.parse(storedUsers);
    const foundUser = users.find(
      (f) => f.email === email && f.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      await AsyncStorage.setItem(
        currentuser,
        JSON.stringify(foundUser)
      );
      return {success:true,user:foundUser};
    } else {
      return {success:false,msg:'Invalid credentials'};
    }
  };
  const logout = async () => {
    setUser(null);
    await AsyncStorage.removeItem(currentuser);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};