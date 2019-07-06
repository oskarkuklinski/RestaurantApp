import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native';

export default class WelcomePage extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.title}>Hello!</Text>
                <Text style={styles.pickLanguage}>Choose your language</Text>
                <View style={styles.viewLanguage}></View>
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
                        <TouchableHighlight>
                            <Text 
                                onPress={() => this.props.navigation.navigate("Main")}
                                style={styles.language}>{item.key}
                            </Text>
                        </TouchableHighlight>}>
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
        backgroundColor: '#F27F3D',
    },

    title: {
        fontSize: 54,
        color:'#F2E1AE',
        marginTop:86,
    },
    viewLanguage:{
        margin:20,
        width:309,
        height:52,
        backgroundColor:'#F2E1AE',
        opacity: 0.2,
        borderRadius:13,
        
    },
    pickLanguage:{
        position:'relative',
        top:"11%",
        left:'-10%',
        fontSize:18,
        lineHeight:52,
        opacity:1,
        color:"#fff",
        marginLeft:15,

    },
    language: {
        padding: 10,
        fontSize: 18,
        color: '#fff',
        borderWidth: 3,
        borderColor:'#F2E1AE',
    }
});