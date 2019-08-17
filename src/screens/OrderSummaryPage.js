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
                <TouchableOpacity
                    onPress={() => this.props.navigate('FoodMenu')}>
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
        let basketItems = this.props.basket.items.map((item, index) => {
            return <BasketItem 
                       key={index}
                       item={item}
                       basket={this.props.basket}
                       removeFromBasket={this.props.removeFromBasket}
                       addQuantity={this.props.addQuantity} 
                       subtractQuantity={this.props.subtractQuantity} />
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
        this.handleRemoveFromBasket = this.handleRemoveFromBasket.bind(this);
        this.handleAddQuantity = this.handleAddQuantity.bind(this);
        this.handleSubtractQuantity = this.handleSubtractQuantity.bind(this);
    }
    
    handleRemoveFromBasket(e) {
        this.props.removeFromBasket(this.props.item);
    }
    handleAddQuantity(e) {
        this.props.addQuantity(this.props.item);
    }
    handleSubtractQuantity(e) {
        if (this.props.item.quantity >= 2) {
            this.props.subtractQuantity(this.props.item);
        } else {
            alert("Press x to remove the product from basket");
        }
    }
    
    render() {
        return (
            <View style={styles.item}>
                <Text style={styles.name}>{this.props.item.index}</Text>
                <Text style={styles.name}>{this.props.item.name}</Text>
                <View style={styles.quantity}>
                    <TouchableOpacity
                        onPress={this.handleSubtractQuantity}>
                        <Icon
                            name='minus'
                            color="#F2E1AE">
                        </Icon>
                    </TouchableOpacity>
                    <Text>{this.props.item.quantity}</Text>
                    <TouchableOpacity
                        onPress={this.handleAddQuantity}>
                        <Icon
                            name='plus'
                            color="#F2E1AE">
                        </Icon>
                    </TouchableOpacity>
                </View>
                <Text style={styles.price}>{this.props.item.price * this.props.item.quantity} £</Text>
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
            basket: {
                numberOfItems: this.props.basket.numberOfItems,
                items: this.props.basket.items,
            },
        }
        this.removeFromBasket = this.removeFromBasket.bind(this);
        this.addQuantity = this.addQuantity.bind(this);
        this.subtractQuantity = this.subtractQuantity.bind(this);
    }
    
    // Remove an item from the basket
    removeFromBasket(item) { 
        let newBasket = this.state.basket;
        newBasket.items.splice(item.index, 1);
        newBasket.numberOfItems -= item.quantity;
        this.setState({
            basket: {
                numberOfItems: newBasket.numberOfItems,
                items: newBasket.items,
            }
        });
        this.props.dispatch({
            type: "MODIFY_BASKET",
            payload: this.state.basket,
        })
    }
    
    addQuantity(item) {
        let newBasket = this.state.basket;
        newBasket.items[item.index].quantity += 1;
        newBasket.numberOfItems += 1;
        this.setState({
            basket: {
                numberOfItems: newBasket.numberOfItems,
                items: newBasket.items,
            }
        });
        this.props.dispatch({
            type: 'MODIFY_BASKET',
            payload: this.state.basket,
        })
    }
    
    subtractQuantity(item) {
        let newBasket = this.state.basket;
        newBasket.items[item.index].quantity -= 1;
        newBasket.numberOfItems -= 1;
        this.setState({
            basket: {
                numberOfItems: newBasket.numberOfItems,
                items: newBasket.items,
            }
        });
        this.props.dispatch({
            type: 'MODIFY_BASKET',
            payload: this.state.basket,
        })
    }
    
    render() {
        return (
            <View style={styles.container}>
                <Header
                    table={this.state.table}
                    numberOfItems={this.state.basket.numberOfItems} 
                    navigate={this.props.navigation.navigate} />
                <Summary
                    basket={this.state.basket}
                    removeFromBasket={this.removeFromBasket}
                    addQuantity={this.addQuantity}
                    subtractQuantity={this.subtractQuantity} />
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