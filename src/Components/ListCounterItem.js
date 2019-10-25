import React from 'react';
import {  StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ActionTypes={
    INC : 'INC',
    DEC : 'DEC'
}

const ListCounterItem = (props) => {
    const { data, removeItem, quantityUpdate } = props
    return ( 
        <View style={styles.counterListItem} >
            <View style={{alignItems:'center',paddingBottom:2}}>
                <View style={{flexDirection:"row"}}>
                    <View style={{flex:0.8,alignItems:"center",paddingLeft:12}} >
                        <Icon name = {data.icon} size={25} color="black"/>
                    </View>
                    <View>
                        <TouchableOpacity onPress={()=>removeItem(data)} style={{flexDirection:'row-reverse'}}>
                            <Icon name="close-octagon" size={17} color="#BD252A"/>
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={{fontSize:15}}>{data.title} </Text>
                <Text>$ {data.Price}</Text>
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}} >
                <TouchableOpacity onPress={()=>quantityUpdate(data,ActionTypes.DEC)} style={styles.button}><Icon name="minus" style={{alignSelf:'center'}}/></TouchableOpacity>
                    <Text style={{ fontSize:14, justifyContent:'center',alignSelf:'center',paddingHorizontal:2}}>{data.Quantity}</Text>
                <TouchableOpacity onPress={()=>quantityUpdate(data,ActionTypes.INC)} style={styles.button}><Icon name="plus" style={{alignSelf:'center'}}/></TouchableOpacity>
            </View>
        </View>
     );
}
 
export default ListCounterItem;


const styles = StyleSheet.create({
    counterListItem :{ 
        height:100, 
        width:90, 
        borderRadius:13,
        borderWidth:0.28,
        borderColor:'#FFC94F',
        // backgroundColor:'white', 
        backgroundColor:'#EEEEEE',
        margin:10, 
        justifyContent:'center',
        alignItems:'center'
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