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
                style={styles.header}>
                <Text>ORDER</Text>
                <Text>Table no. {this.props.table}</Text>
                <TouchableOpacity
                    style={styles.basket}
                    onPress={() => this.props.navigate('OrderSummary')}>
                    <Icon
                        name='shopping-cart'
                        color="#F2E1AE"
                        style={styles.basketIcon}>
                    </Icon>
                    <Text>({this.props.basket.numberOfItems})</Text>
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
        console.log(this.props.items);
        let items = this.props.items.map((item, index) => {
            return <Category 
                        key={item.id} 
                        item={item}
                        basket={this.props.basket}
                        addToBasket={this.props.addToBasket} />
        });
        return (
            <View>
                {(this.props.data.isFetching) ? <Text>Loading...</Text> : items}
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
                    onPress={() => (this.state.style == 'none') ? this.setState({style: 'flex'}) : this.setState({style: 'none'})}>
                    <Text>
                        {this.props.item.name}
                    </Text>
                    <Icon
                        name='minus'
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
            style: 'none'
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
                    onPress={() => (this.state.style == 'none') ? this.setState({style: 'flex'}) : this.setState({style: 'none'})}>
                    <Text
                        style={styles.item}>
                        {this.props.item.name} - {this.props.item.price} £
                    </Text>
                </TouchableOpacity>
                <View
                    // Apply changes in style here
                    style={{display: this.state.style}}>
                    <Text>
                        {this.props.item.desc}
                    </Text>
                    <Button
                        title="Add"
                        onPress={this.handleAddToBasket}>
                    </Button>
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
        console.log(this.props.data.data);
        return (
            <View style={MainStyles.container}>
                <Header 
                    basket={this.props.basket} 
                    table={this.props.table} 
                    // navigation prop reference to navigate to the summary page
                    navigate={this.props.navigation.navigate} />
                <Text>Search the menu</Text>
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
});

// Connect redux store with react component and export it
export default connect(mapStateToProps, mapDispatchToProps)(FoodMenuPage);