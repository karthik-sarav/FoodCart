import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
    FlatList,
    TouchableOpacity,
    Dimensions,
    Modal,
    Alert
  } from 'react-native';
  import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

  const DATA = [
    {
      id: '1',
      title: 'Food',
      icon:'food',
      Price: 10,
      Quantity:1,
      Total:0
    },
    {
      id: '2',
      title: 'Apple',
      icon:'food-apple',
      Price: 20,
      Quantity:1,
      Total:0
    },
    {
      id: '3',
      title: 'Cupcake',
      icon:'cupcake',
      Price: 30,
      Quantity:1,
      Total:0
    },
    {
        id: '4',
        title: 'Drink',
        icon:'food-fork-drink',
        Price: 40,
        Quantity:1,
        Total:0
      },
      {
        id: '5',
        title: 'Noodles',
        icon:'food-variant',
        Price: 50,
        Quantity:1,
        Total:0
      },
      {
        id: '6',
        title: 'Eggs',
        icon:'egg',
        Price: 60,
        Quantity:1,
        Total:0
      },
      {
        id: '7',
        title: 'Bread',
        icon:'bread-slice',
        Price: 70,
        Quantity:1,
        Total:0
      },
      {
        id: '8',
        title: 'Meals',
        icon:'food-fork-drink',
        Price: 80,
        Quantity:1,
        Total:0
      },
      {
        id: '9',
        title: 'Cake',
        icon:'cake',
        Price: 90,
        Quantity:1,
        Total:0
      },
      {
        id: '10',
        title: 'Muffin',
        icon:'muffin',
        Price: 100,
        Quantity:1,
        Total:0
      },
      {
        id: '11',
        title: 'Muffin 1',
        icon:'muffin',
        Price: 100,
        Quantity:1,
        Total:0
      },
      {
        id: '12',
        title: 'Muffin 2',
        icon:'muffin',
        Price: 100,
        Quantity:1,
        Total:0
      },
  ];

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
                '',
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
            // this.scrollEnd();
            // this.scrollToIndex();
        }
    }

    componentDidUpdate(){
        console.log('inside c--update');
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
        // this.scrollEnd();
        // this.scrollToIndex();
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
        // this.scrollEnd();
        // this.scrollToIndex();
    }

    emptyList = ()=>{
        this.resetQuantity();
        this.setState({
            selectedItem : [],
            grandTotal: 0
        })
    }

    decrementQuantity = (data) => {
        let index = this.state.selectedItem.indexOf(data);   
        let selected = this.state.selectedItem[index];
        // selected.Quantity > 1 ? selected.Quantity -= 1 : this.removeItem(selected.id) ;
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
        console.log('this.dtate--',this.state);
    }

    incrementQuantity = (data) => {
        let index = this.state.selectedItem.indexOf(data);   
        let selected = this.state.selectedItem[index];
        selected.Quantity += 1;
        selected.Total = selected.Price*selected.Quantity;
        let newSelectedItem = this.state.selectedItem;
        newSelectedItem[index] = selected;
        this.setState({
            selectedItem: newSelectedItem,
            grandTotal: this.state.grandTotal + selected.Price
        })

    }
    
    scrollEnd = () => {
        console.log('this.state',this.state.selectedItem);
        this.refs.counterList.scrollToEnd({animated: true });
    }

    // scrollToIndex =() =>{
    //     console.log('this.state.selectedItem.length',this.state.selectedItem.length);
    //     if(this.state.selectedItem.length>1){
    //         this.refs.counterList.scrollToIndex({animated:true , index: this.state.selectedItem.length+1 ,viewOffset:-30,viewPosition:1})
    //     }
    // }


    renderItem = (data) => {
        const style = this.state.selectedItem.includes(data) ? styles.listItemActive : styles.listItem;
        const textStyle = this.state.selectedItem.includes(data) ? styles.textActive : styles.text;
        return (
                // <TouchableOpacity activeOpacity={0.6} disabled={this.state.selectedItem.includes(data)} onPress={()=>this.LoadState(data)} style={style}>
                <TouchableOpacity activeOpacity={0.6}  onPress={()=>this.LoadState(data)} style={style}>
                    <Icon style={{paddingBottom:10}} name = {data.icon} size={35} color={this.state.selectedItem.includes(data)?'white':'black'} ></Icon>
                    <Text style={textStyle} > {data.title} </Text>
                </TouchableOpacity>
         );
    }

    renderCounterItem = (data)=>{
        return(
            <View style={styles.counterListItem} >
                <View style={{alignItems:'center',paddingBottom:2}}>
                    <View style={{flexDirection:"row"}}>
                        <View style={{flex:0.8,alignItems:"center",paddingLeft:12}} >
                            <Icon name = {data.icon} size={25} color="black"/>
                        </View>
                        <View>
                            <TouchableOpacity onPress={()=>this.removeItem(data)} style={{flexDirection:'row-reverse'}}>
                                <Icon name="close-octagon" size={17} color="#BD252A"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Text style={{fontSize:15}}>{data.title} </Text>
                    <Text>$ {data.Price}</Text>
                </View>
                <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                    <TouchableOpacity onPress={()=>this.decrementQuantity(data)} style={styles.button}><Icon name="minus" style={{alignSelf:'center'}} ></Icon></TouchableOpacity>
                        <Text style={{ fontSize:14, justifyContent:'center',alignSelf:'center',paddingHorizontal:2}}>{data.Quantity}</Text>
                    <TouchableOpacity onPress={()=>this.incrementQuantity(data)} style={styles.button}><Icon name="plus" style={{alignSelf:'center'}} ></Icon></TouchableOpacity>
                </View>
            </View>
        );
    }
     
    render() { 
        return ( 
            <SafeAreaView style={{ flex:1, flexDirection:'row'}} >
                <View style={{ flex:0.7,borderRightWidth:4,borderColor:'#FFC94F'}} >
                    <View style={{height:Dimensions.get('window').height/4, backgroundColor:'whitesmoke'}} >
                        <Icon style={{marginTop:15,marginLeft:10,paddingBottom:10}} name='food' size={75} color='#FFC94F'/>
                        <Text style={{fontSize:33,fontWeight:"bold",marginLeft:15}} >Hey,</Text>
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
                    <View style={{flex:1}} >
                    <FlatList
                        ref='counterList'
                        style={{height:100}}
                        contentContainerStyle={{paddingBottom: 125}}
                        showsVerticalScrollIndicator={false}
                        data = {this.state.selectedItem}
                        renderItem = {({item})=>this.renderCounterItem(item)}
                        keyExtractor = {item=>item.id}
                    />
                    </View>
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
        // borderColor:'#BD252A', 
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
        // backgroundColor:'#FFC94F',
        margin:10, 
        justifyContent:'center',
        alignItems:'center'
    },
    counterListItem :{ 
        height:100, 
        width:100, 
        borderRadius:13,
        borderWidth:0.28,
        // borderColor:'#BD252A', 
        borderColor:'#FFC94F',
        backgroundColor:'white', 
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
    },
    button:{ 
        height:15, 
        width:20, 
        borderRadius:4,
        margin:5,
        borderColor:'black',
        borderWidth:0.2,
        elevation:0.1,
    }
})