
import { StyleSheet, Text, View, Button, Dimensions} from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';


const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

export default EStyleSheet.create({
    container: { 
        height:'100%',
        flexDirection:'column',
        justifyContent: 'flex-start',
        alignItems:'center',
        backgroundColor :'#F27F3D',
    },
    title: {
        // flex:1,
        fontSize:51,
        color:'#F2E1AE',
        margin:20,
        textAlign:'center'
    },
    buttons: {
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width:'300rem',
        height:'80rem',
        marginLeft:'72rem',
        marginRight:'72rem',
        marginTop: '46rem',
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
    text: {
        fontSize:"20rem",
        color:"#F2E1AE",
        textAlign:'center'
    },
    header: {
        display: 'flex',
        backgroundColor: '#D93232',
        width: '100%',
        height: '60rem',
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
    },
    category: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: entireScreenWidth,
        height: '60rem',
        backgroundColor: 'grey',
        marginBottom: '5rem',
        marginTop: '5rem',
        paddingLeft: '16rem',
        paddingRight: '16rem',
    },
    item: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: '2rem',
        marginBottom: '2rem',
        borderBottomWidth: '1rem',
        borderBottomColor: "#F2E1AE",
        height: '46rem',
        paddingLeft: '16rem',
        paddingRight: '16rem',
    },
    description: {
        display: 'flex',
        marginTop: '10rem',
        marginBottom: '10rem',
        flexDirection: 'column',
    },
    itemHidden: {
        display: 'none',
    },
    icon: {
        fontSize: '26rem'
    },
})