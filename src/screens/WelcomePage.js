import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import MainStyles from '../Styles';

// Flag icons
import english from '../../assets/Icons/flag_english.png';
import spanish from '../../assets/Icons/flag_spanish.png';
import french from '../../assets/Icons/flag_french.png';
import chinese from '../../assets/Icons/flag_chinese.png';


export default class WelcomePage extends React.Component {

    render() {
        return (
            <View style={MainStyles.container}>
                <Text style={MainStyles.title}>Hello!</Text>
                <Text style={styles.pickLanguage}>Choose your language</Text>
                <View style={styles.viewLanguage}></View>
                <FlatList
                    data={[
                        {
                            key: 'English',
                            image: english,
                        },
                        {
                            key: 'Español',
                            image: spanish,
                        },
                        {
                            key: 'Français',
                            image: french,
                        },
                        {
                            key: '中文',
                            image: chinese,
                        }
                    ]}
                    renderItem={({item}) => 
                        <TouchableOpacity 
                            onPress={() => this.props.navigation.navigate('Main')}
                            style={styles.languageChoice}>
                            <Image 
                                source={item.image}
                                style={styles.flag}></Image>
                            <Text
                                style={styles.language}>
                                {item.key}
                            </Text>
                        </TouchableOpacity>
                        }
                    >
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
        fontSize: 51,
        color:'#F2E1AE',
        marginTop:86,
        textAlign:'center',
        borderWidth:1,
        borderStyle:'solid',
        borderColor:'black',
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
        width:'80%',
        fontSize:18,
        lineHeight:52,
        opacity:1,
        color:"#fff",
        marginLeft:15,

    },
    language: {
        padding: 20,
        fontSize: 18,
        color: '#fff',
    },
    languageChoice: {
        display: 'flex',
        flexDirection: 'row',
        borderWidth: 3,
        borderColor:'#F2E1AE',
    },
    flag: {
        height: '100%',
        width: 80,
    }
});