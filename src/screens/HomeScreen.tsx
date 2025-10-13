import { useNavigation } from '@react-navigation/native';
import { Button, View } from 'react-native';
function HomeScreen() {
    const navigation = useNavigation();
    return (
        <View>
            <Button
                title="Ir a Detalles"
                onPress={() => navigation.navigate('LoginScreen')}
            />
        </View>
    );
    
}
export default HomeScreen;