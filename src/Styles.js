
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default EStyleSheet.create({
    container:{ 
        height:'100%',
        flexDirection:'column',
        justifyContent:'space-around',
        alignItems:'center',
        backgroundColor :'#F27F3D',
        
},
title:{
    // flex:1,
    fontSize:51,
    color:'#F2E1AE',
    margin:20,
    textAlign:'center'
},
buttons:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:'300rem',
    height:'80rem',
    margin:'72rem',
    fontSize: "28rem",
    color:"#F2E1AE",
    backgroundColor:'#D93232',
    // borderWidth:1,
    // borderColor:'black',
    // borderStyle:'solid',
    borderRadius:14,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
},
text:{
    fontSize:"20rem",
    color:"#F2E1AE",
    textAlign:'center'
}
})