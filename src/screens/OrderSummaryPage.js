import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

// ---------- HEADER --------------------------
class Header extends React.Component {
    render() {
        return (
            <View
                style={styles.header}>
                <TouchableOpacity>
                    <Icon
                        name='arrow-left'
                        color="#F2E1AE">
                    </Icon>
                </TouchableOpacity>
                <Text>Summary</Text>
                <Text>Table no. {this.props.table}</Text>
            </View>
        );
    }
}

// ---------- SUMMARY --------------------------
class Summary extends React.Component {
    render() {
        let basketItems = this.props.basketItems.map((item, index) => {
            return <BasketItem 
                       key={index}
                       item={item}
                       removeFromBasket={this.props.removeFromBasket}/>
        });
        return (
            <View style={styles.summary}>
                {basketItems}
            </View>
        );
    }
}

// ---------- BASKET ITEM --------------------------
class BasketItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // making state here allows for changes in the basketItems quantity later
            quantity: this.props.item.quantity,
        }
        this.handleRemoveFromBasket = this.handleRemoveFromBasket.bind(this);
    }
    
    // only numbers can be entered to the input
    onChanged(text){
        let newText = '';
        let numbers = '0123456789';

        for (var i=0; i < text.length; i++) {
            if(numbers.indexOf(text[i]) > -1 ) {
                newText = newText + text[i];
            }
            else {
                // call back function
                alert("please enter numbers only");
            }
        }
        this.setState({ quantity: newText });
    }
    
    handleRemoveFromBasket(e) {
        this.props.removeFromBasket(this.props.item);
    }
    
    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.name}>{this.props.item.index}</Text>
                <Text style={styles.name}>{this.props.item.name}</Text>
                <View style={styles.quantity}>
                    <TouchableOpacity
                        onPress={() => (this.state.quantity >= 2) ? this.setState({ quantity: this.state.quantity -= 1}) : alert("Press x to remove the product from basket")}>
                        <Icon
                            name='minus'
                            color="#F2E1AE">
                        </Icon>
                    </TouchableOpacity>
                    <TextInput
                        style={styles.input}
                        keyboardType='numeric'
                        onChangeText={(text) => this.onChanged(text)}
                        value={this.state.quantity.toString()}
                        maxLength={2}>
                    </TextInput>
                    <TouchableOpacity
                        onPress={() => this.setState({ quantity: this.state.quantity += 1})}>
                        <Icon
                            name='plus'
                            color="#F2E1AE">
                        </Icon>
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>{this.props.item.price * this.state.quantity} £</Text>
                <TouchableOpacity 
                    style={styles.remove}
                    onPress={this.handleRemoveFromBasket}>
                    <Icon
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
            basketItems: this.props.navigation.state.params.basketItems,
            basket: this.props.navigation.state.params.basket,
        }
        this.removeFromBasket = this.removeFromBasket.bind(this);
    }
    
    // Remove an item from the basket
    removeFromBasket(item) { 
        let itemsInBasket = this.state.basketItems;
        itemsInBasket.splice(item.index, 1);
        this.setState({
            basketItems: itemsInBasket,
            basket: this.state.basket - item.quantity,
        });
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header
                    table={this.state.table}
                    basket={this.state.basket} />
                <Summary
                    basketItems={this.state.basketItems}
                    removeFromBasket={this.removeFromBasket} />
            </View>
        );
    }
}

// Select data that from the store (redux) that component needs
function mapStateToProps(state){
    return {
        table: state.table.table,
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
    },
    price: {
        flex: 1,
    },
    remove: {
        flex: 1,
    },
    title: {
        fontSize: 26
    },
});

// Connect redux store with react component and export it
export default connect(mapStateToProps)(OrderSummaryPage);