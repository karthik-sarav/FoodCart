import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, View, Text, FlatList, TouchableOpacity, Dimensions, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { DATA } from '../TestData/TestData';
import ListItem from './ListItem';
import ListCounterItem from './ListCounterItem';

const Card = (props) => (
    <SafeAreaView style={styles.card}>
        {props.children}
    </SafeAreaView>
)  

class ListComponent extends Component {
    state = { 
        selectedItem :[],
        grandTotal:0,
    }
    

    LoadState = (data) => {
        if(this.state.selectedItem.includes(data)){
            Alert.alert(
                'Remove item ?',
                'Item will be removed from Orders',
                [
                  {text: 'Cancel',style: 'cancel'},
                  {text: 'OK', onPress: () => this.removeItem(data)},
                ],
                {cancelable: true},
            );
        }
        else{
            this.setState({ 
                selectedItem: [...this.state.selectedItem, DATA.find(ele=>ele.id == data.id)],
                grandTotal : this.state.grandTotal + data.Price
            })
        }
    }

    componentDidUpdate(){
        this.scrollEnd();
    }

    resetQuantity =()=>{
        let state = this.state.selectedItem;
        state.forEach(i=>i.Quantity=1)
    }

    resetIndividual=(data)=>{
        let index = this.state.selectedItem.indexOf(data);   
        let selected = this.state.selectedItem[index];
        selected.Quantity = 1;
        let newSelectedItem = this.state.selectedItem;
        newSelectedItem[index] = selected;
        this.setState({
            selectedItem: newSelectedItem,
        })
    }

    removeItem = (item)=>{
        console.log('id-->',item);
        console.log('inside remve');
        let itemQuantity = item.Quantity;
        this.resetIndividual(item);
        let stateItem = this.state.selectedItem.filter(ele=>ele.id!=item.id);
        console.log('stateItem',stateItem);
        this.setState({
            selectedItem : stateItem,
            grandTotal: this.state.grandTotal == 0 ? 0 : this.state.grandTotal - (item.Price*itemQuantity)
        })
    }

    emptyList = ()=>{
        this.resetQuantity();
        this.setState({
            selectedItem : [],
            grandTotal: 0
        })
    }

    quantityUpdate = (data,type) => {
        let index = this.state.selectedItem.indexOf(data);
        let selected = this.state.selectedItem[index];
        switch(type){
            case 'INC':
                    selected.Quantity += 1;
                    selected.Total = selected.Price*selected.Quantity;
                    let newSelectedItem = this.state.selectedItem;
                    newSelectedItem[index] = selected;
                    this.setState({
                        selectedItem: newSelectedItem,
                        grandTotal: this.state.grandTotal + selected.Price
                    })
                    break;
            case 'DEC':
                    if(selected.Quantity > 1 ){
                        selected.Quantity -= 1
                        selected.Total = selected.Price*selected.Quantity;
                        let newSelectedItem = this.state.selectedItem;
                        newSelectedItem[index] = selected;
                        this.setState({
                            selectedItem: newSelectedItem,
                            grandTotal: this.state.grandTotal == 0 ? 0 : this.state.grandTotal - selected.Price
                        })
                    }
                    else{
                        this.removeItem(selected)
                    }
                    break;
            default :
                    null;
        }
    }
    
    scrollEnd = () => {
        this.refs.counterList.scrollToEnd({animated: true });
    }

    renderItem = (data) => {
        const isPresent = this.state.selectedItem.includes(data);
        const style = isPresent? styles.listItemActive : styles.listItem;
        const textStyle = isPresent ? styles.textActive : styles.text;
        return (
            <ListItem isPresent={isPresent} data={data} style={style} textStyle={textStyle} loadState={this.LoadState} />
        );
    }

    renderCounterItem = (data)=>{
        return(
            <ListCounterItem data={data} removeItem={this.removeItem} quantityUpdate={this.quantityUpdate} />
        );
    }
     
    render() { 
        return ( 
            <SafeAreaView style={{ flex:1, flexDirection:'row'}} >
                <View style={{ flex:0.7,borderRightWidth:4,borderColor:'#FFC94F'}} >
                    <View style={{height:Dimensions.get('window').height/4, backgroundColor:'whitesmoke'}} >
                        <Icon style={{marginTop:15,marginLeft:10,paddingBottom:10}} name='food' size={75} color='#FFC94F'/>
                        <Text style={{fontSize:33,fontWeight:"bold",marginLeft:15}}>Hey,</Text>
                        <Text style={{fontSize:20, fontStyle:'italic' ,fontWeight:"normal",marginLeft:15}} >what's up?</Text>
                    </View>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle ={{alignItems:'center'}}
                        data = {DATA}
                        renderItem = {({item})=> this.renderItem(item)}
                        numColumns='2'
                        keyExtractor = {item=>item.id}
                    />
                </View>
                <View style={{ flex:0.3, alignItems:'center',paddingBottom:10,backgroundColor:'whitesmoke'}}>
                    <View style={{ height:Dimensions.get('window').height/4,}} >
                        <Icon style={{padding:10, alignSelf:'flex-end'}} name='account-circle' size={30} color='#BD252A'></Icon>
                        <Text style={{ marginTop:35, fontSize:25,fontWeight:"bold",marginLeft:15}} >My Order,</Text>
                        <Text style={{fontSize:15, fontStyle:'italic' ,fontWeight:"normal",marginLeft:15}} >Take Out</Text>
                        {
                            this.state.selectedItem.length>0 ?
                            <TouchableOpacity onPress={()=>this.emptyList()}>
                                <Icon style={{alignSelf:'flex-end', paddingBottom:12, paddingRight:10}} name="delete-sweep" size={22} color="#BD252A"/>
                            </TouchableOpacity>
                            :
                            null
                        }
                    </View>
                    <FlatList
                        ref='counterList'
                        style={{height:100}}
                        contentContainerStyle={{paddingBottom: 125}}
                        showsVerticalScrollIndicator={false}
                        data = {this.state.selectedItem}
                        renderItem = {({item})=>this.renderCounterItem(item)}
                        keyExtractor = {item=>item.id}
                    />
                    <View style={{marginTop:10,flexDirection:'row', justifyContent:'center', alignItems:'center', width:110,height:45, borderRadius:15,backgroundColor:'#FFC94F'}} >
                        <Icon name='currency-usd' size={15} />
                        <Text>{this.state.grandTotal}</Text>
                    </View>
                </View> 
            </SafeAreaView>
            
         );
    }
}
 
export default ListComponent;


const styles = StyleSheet.create({
    listItem :{ 
        height:100, 
        width:120, 
        borderRadius:13,
        borderWidth:0.28,
        borderColor:'#FFC94F',
        backgroundColor:'whitesmoke', 
        margin:10, 
        justifyContent:'center',
        alignItems:'center'
    },
    listItemActive:{
        height:100, 
        width:120, 
        borderRadius:13, 
        backgroundColor:'#BD252A', 
        margin:10, 
        justifyContent:'center',
        alignItems:'center'
    },
    text:{
        fontSize:15,
        color:'black'
    },
    textActive:{
        fontSize:15,
        color:'white'
    },
    card:{
        flex:1,
        height:100,
        width:100,
        borderRadius:13,
        backgroundColor:'whitesmoke',
        margin:4, 
        justifyContent:'center',
        alignItems:'center',
        elevation:1
    }
})