import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const ListItem = (props) => {
    const { isPresent, data, style, textStyle, loadState } = props;
    return ( 
        <TouchableOpacity activeOpacity={0.6}  onPress={()=>loadState(data)} style={style}>
             <Icon style={{paddingBottom:10}} name = {data.icon} size={35} color={isPresent?'white':'black'} ></Icon>
                <Text style={textStyle} > {data.title} </Text>
        </TouchableOpacity>
     );
}
 
export default ListItem
