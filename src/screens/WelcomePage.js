import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';

export default class WelcomePage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hello!</Text>
                <Text>Choose your language</Text>
                <FlatList
                    data={[
                        {
                            key: 'English',
                            image: 'url'
                        },
                        {
                            key: 'Español',
                            image: 'url'
                        },
                        {
                            key: 'Français',
                            image: 'url'
                        },
                        {
                            key: '中文',
                            image: 'url'
                        }
                    ]}
                    renderItem={({item}) =>
                        <View>
                            <Text 
                                onPress={() => this.props.navigation.navigate("Main")}
                                style={styles.language}>{item.key}
                            </Text>
                        </View>}>
                </FlatList>
            </View>
        );
    }
}

// Gdy masz juz obrazki do flag w folderze assets i src do nich w image, wprowadz ten kod nad <Text style={styles.language}>{item.key}</Text>  
// <Image source={item.image}></Image>

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    title: {
        fontSize: 26
    },
    language: {
        padding: 10,
        fontSize: 18,
    }
});