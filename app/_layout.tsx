import { AuthProvider } from '@/components/Context/AuthContext';
import { Stack } from 'expo-router';
export default function Layout() {
  return (
    <AuthProvider>
    <Stack screenOptions={{ headerShown: false }}>
   <Stack.Screen name='index' >

   </Stack.Screen>
   
    </Stack>
    </AuthProvider>
  )
}