import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MainStyles from '../Styles';
import { connect } from 'react-redux';
import { fetchData, addToBasket } from '../actions/index';

/*
FoodMenuPage component structure

FoodMenuPage
    Header
    Menu
        Category
            Item
*/

// ---------- HEADER --------------------------
class Header extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <View
                style={MainStyles.header}>
                <Text style={MainStyles.text}>ORDER</Text>
                <Text style={MainStyles.text}>Table no. {this.props.table}</Text>
                <TouchableOpacity
                    style={styles.basket}
                    onPress={() => this.props.navigate('OrderSummary')}>
                    <Icon
                        name='shopping-cart'
                        color="#F2E1AE"
                        style={MainStyles.icon}>
                    </Icon>
                    <Text style={MainStyles.text}>({this.props.basket.numberOfItems})</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

// ---------------- MENU ---------------------------
class Menu extends React.Component {
    
    componentDidMount() {
        this.props.fetchData();
    }
    
    render() {
        let items = this.props.items.map((item, index) => {
            return <Category 
                        key={item.id} 
                        item={item}
                        basket={this.props.basket}
                        addToBasket={this.props.addToBasket} />
        });
        return (
            <View>
                {(this.props.data.isFetching) ? <Text style={MainStyles.text}>Loading...</Text> : items}
            </View>
        );
    }
}

// ---------------- CATEGORY --------------------
class Category extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state of a style for an item description 
            style: 'none'
        }
    }
    render() {
        let items = this.props.item.contents.map((item, index) => {
            return <Item 
                       key={index} 
                       item={item} 
                       basket={this.props.basket}
                       addToBasket={this.props.addToBasket} />
        });
        return (
            <View>
                <TouchableOpacity
                    // Change display of details after a click depending on a current state
                    onPress={() => (this.state.style == 'none') ? this.setState({style: 'flex'}) : this.setState({style: 'none'})}
                    style={MainStyles.category}>
                    <Text style={MainStyles.text}>
                        {this.props.item.name}
                    </Text>
                    <Icon
                        style={MainStyles.icon}
                        name={(this.state.style == 'none') ? 'minus' : 'chevron-down'}
                        color='#F2E1AE'>
                    </Icon>
                </TouchableOpacity>
                <View
                    // Apply changes in style here
                    style={{display: this.state.style}}>
                    {items}
                </View>
            </View>
        );
    }
}

// ------------------- ITEM -----------------------
class Item extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // initial state of a style for an item description 
            flag: false,
        }
        this.handleAddToBasket = this.handleAddToBasket.bind(this);
    }
    
    // Event handler
    handleAddToBasket(e) {
        this.props.addToBasket(this.props.item, this.props.basket);
    }
    
    render() {
        return (
            <View>
                <TouchableOpacity
                    // Change display of details after a click depending on a current state
                    onPress={() => (this.state.flag == false) ? this.setState({flag: true}) : this.setState({flag: false})}
                    style={MainStyles.item}>
                    <Text
                        style={MainStyles.text}>
                        {this.props.item.name} - £{this.props.item.price}
                    </Text>
                    <Icon
                        style={MainStyles.icon}
                        name={(this.state.style == 'none') ? 'minus' : 'chevron-down'}
                        color='#F2E1AE'>
                    </Icon>
                </TouchableOpacity>
                <View
                    // Apply changes in style here
                    style={(this.state.flag == false) ? MainStyles.itemHidden : MainStyles.description}>
                    <Text style={MainStyles.text}>
                        {this.props.item.desc}
                    </Text>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this.handleAddToBasket}>
                        <Text style={MainStyles.text}>ADD</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

// -------------------- MAIN COMPONENT -------------------------
class FoodMenuPage extends React.Component {
    constructor(props) {
        super(props);
        // Initial states
        this.state = {
            basket: {
                numberOfItems: this.props.basket.numberOfItems,
                items: this.props.basket.items,
            },
            items: this.props.data.data,
            table: this.props.table,
        }
    }
    
    render() {
        return (
            <View style={MainStyles.container}>
                <Header 
                    basket={this.props.basket} 
                    table={this.props.table} 
                    // navigation prop reference to navigate to the summary page
                    navigate={this.props.navigation.navigate} />
                <Menu 
                    items={this.props.data.data}
                    basket={this.props.basket}
                    data={this.props.data}
                    fetchData={this.props.fetchData}
                    addToBasket={this.props.addToBasket}
                    basketItems={this.state.basketItems}/>
            </View>
        );
    }
}

// Select data from the store (redux) that component needs
function mapStateToProps(state) {
    return {
        table: state.table.table,
        basket: state.basket,
        data: state.data,
    }
}

// Bind the actions to be used for the component
function mapDispatchToProps (dispatch) {
    return {
        fetchData: () => { dispatch(fetchData()) },
        addToBasket: (item, basket) => { dispatch(addToBasket(item, basket)) },
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
    basket: {
        display: "flex",
        flexDirection: "row"
    },
    basketIcon: {
        fontSize: 26
    },
    item: {
        padding: 8
    },
    container: {
        flex: 1, 
        alignItems: "center", 
        justifyContent: "center",
    },
    title: {
        fontSize: 26
    },
    button: {
        marginLeft: '15%',
        marginRight: '15%',
        backgroundColor: '#D93232'
    }
});

// Connect redux store with react component and export it
export default connect(mapStateToProps, mapDispatchToProps)(FoodMenuPage);