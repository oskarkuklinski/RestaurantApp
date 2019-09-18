import React from 'react';
import MainStyles from '../Styles';
import { ScrollView,StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import { removeFromBasket, increaseQuantity, decreaseQuantity } from '../actions/index';
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width
var height = Dimensions.get('window').height //full height

// ---------- HEADER --------------------------
class Header extends React.Component {
    render() {
        return (
            <View
                style={MainStyles.header}>
                <TouchableOpacity
                    onPress={() => this.props.navigate('FoodMenu')}>
                    <Icon
                        style={MainStyles.icon}
                        name='arrow-left'
                        color="#F2E1AE">
                    </Icon>
                </TouchableOpacity>
                <Text style={MainStyles.text}>Summary</Text>
                <View></View>
            </View>
        );
    }
}

// ---------- SUMMARY --------------------------
class Summary extends React.Component {
    render() {
        let basketItems = this.props.basket.items.map((item, index) => {
            return <BasketItem 
                       key={index}
                       item={item}
                       basket={this.props.basket}
                       removeFromBasket={this.props.removeFromBasket}
                       increaseQuantity={this.props.increaseQuantity} 
                       decreaseQuantity={this.props.decreaseQuantity} />
        });
        if (this.props.basket.items.length > 0) {
            return (
                <View style={styles.summary}>
                    <ScrollView>
                        {basketItems}
                        <TouchableOpacity>
                            <Text style={MainStyles.text}>Table no: {this.props.table}</Text>
                        </TouchableOpacity>
                        <Text style={MainStyles.text}>Total: {this.props.basket.total} £</Text>
                    </ScrollView>
                    <View>
                    <TouchableOpacity style={styles.checkoutButton}>
                        <Text style={styles.checkoutText}>Checkout</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            );
        }
        return (
            <View>
                <Icon
                    name='shopping-cart'
                    color="#F2E1AE"
                    style={MainStyles.text}>
                </Icon>
                <Text style={MainStyles.text}>You have not chosen any products yet.</Text>
                <Text style={MainStyles.text}>Please go back to the Menu page if you wish to order.</Text>
            </View>
        );
    }
}

// ---------- BASKET ITEM --------------------------
class BasketItem extends React.Component {
    constructor(props) {
        super(props);
        this.handleRemoveFromBasket = this.handleRemoveFromBasket.bind(this);
        this.handleIncreaseQuantity = this.handleIncreaseQuantity.bind(this);
        this.handleDecreaseQuantity = this.handleDecreaseQuantity.bind(this);
    }
    
    handleRemoveFromBasket(e) {
        this.props.removeFromBasket(this.props.item, this.props.basket);
    }
    handleIncreaseQuantity(e) {
        this.props.increaseQuantity(this.props.item, this.props.basket);
    }
    handleDecreaseQuantity(e) {
        if (this.props.item.quantity > 1) {
            this.props.decreaseQuantity(this.props.item, this.props.basket);
        } else {
            alert("Press x to remove the product from basket");
        }
    }
    
    render() {
        return (
            <View style={MainStyles.item}>
                <Text style={MainStyles.text}>{this.props.item.name}</Text>
                <TouchableOpacity
                    onPress={this.handleDecreaseQuantity}>
                    <Icon style={MainStyles.icon}
                        name='minus'
                        color="#F2E1AE">
                    </Icon>
                </TouchableOpacity>
                <Text style={MainStyles.text}>{this.props.item.quantity}</Text>
                <TouchableOpacity
                    onPress={this.handleIncreaseQuantity}>
                    <Icon style={MainStyles.icon}
                        name='plus'
                        color="#F2E1AE">
                    </Icon>
                </TouchableOpacity>
                <Text style={MainStyles.text}>{this.props.item.price * this.props.item.quantity} £</Text>
                <TouchableOpacity 
                    onPress={this.handleRemoveFromBasket}>
                    <Icon style={MainStyles.icon}
                        name='remove'
                        color="#F2E1AE">
                    </Icon>
                </TouchableOpacity>
            </View>
        );
    }
}

// ---------- MAIN COMPONENT --------------------------
class OrderSummaryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            table: this.props.table,
            basket: {
                numberOfItems: this.props.basket.numberOfItems,
                items: this.props.basket.items,
            },
        }
    }
    
    render() {
        return (
            <View style={MainStyles.container}>
                <Header
                    numberOfItems={this.props.basket.numberOfItems} 
                    navigate={this.props.navigation.navigate} 
                    basket={this.props.basket} />
                <Summary 
                    basket={this.props.basket}
                    table={this.props.table}
                    removeFromBasket={this.props.removeFromBasket}
                    increaseQuantity={this.props.increaseQuantity}
                    decreaseQuantity={this.props.decreaseQuantity} />
            </View>
        );
    }
}
                
                
// Select data that from the store (redux) that component needs
function mapStateToProps(state){
    return {
        table: state.table.table,
        basket: state.basket,
    }
}

// Bind the actions to be used for the component
function mapDispatchToProps (dispatch) {
    return {
        removeFromBasket: (item, basket) => { dispatch(removeFromBasket(item, basket)) },
        increaseQuantity: (item, basket) => { dispatch(increaseQuantity(item, basket)) },
        decreaseQuantity: (item, basket) => { dispatch(decreaseQuantity(item, basket)) },
    }
}

const styles = StyleSheet.create({
     header: {
        paddingHorizontal: 10,
        width: '100%',
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
    },
    summary: {
        flex:1,
        margin: 5,
    },
    summaryContent:{
        width:width,
        marginTop:20,
        marginBottom:20,
        paddingTop:20,
        paddingBottom:20,
        fontSize:24,
        borderBottomColor: "#F2E1AE",
        borderBottomWidth:1,
        borderTopColor: "#F2E1AE",
        borderTopWidth:1,
        textAlign:"justify",
        // textAlign:"center",
        // backgroundColor:'#D93232',
        
    },
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    input: {
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        height: 32,
        width: 32,
        padding: 6,
    },
    item: {
        width: '100%',
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize:32,
    },
    quantity: {
        flex: 1,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent:"space-around",
    },
    name: {
        flex: 1,
        fontSize:24,
        marginTop:10,
        marginBottom:10,
        // backgroundColor:"#000"
    },
    price: {
        flex: 1,
        fontSize:24,
    },
    remove: {
        flex: 1,
        fontSize:32,
    },
    title: {
        fontSize: 26,
        // backgroundColor:"#fff"
    },
    icon:{
        fontSize:26,
    },
    checkoutButton:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    width:width,
    height: height*0.1,
    backgroundColor:"#D93232",
    textAlign:"center",
    },
    checkoutText:{
        fontSize:26,
        textTransform:'uppercase',
        color:"#FFFFFF",
        fontWeight:'bold',
    }
});

// Connect redux store with react component and export it
export default connect(mapStateToProps, mapDispatchToProps)(OrderSummaryPage);