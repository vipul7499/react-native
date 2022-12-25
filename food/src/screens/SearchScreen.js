import React,{useState,useEffect,ScrollView} from 'react';
import {View,Text} from 'react-native';
import Search from '../Component/Searchbar';
import axios from '../api/food';
import List from '../Component/List';

const Screen =()=>{
    const [search,setSearch] = useState('');
    const [apires, setApi] = useState([]);

    const resultByPrice=(price)=>{
        return apires.filter(result=>{
            return result.price===price;
        });
    }
    const callApi= async (term1)=>{
        const response = await axios.get('/search' , {
            params:{
                limit:20,
                term:term1,
                location:'san jose',
            }
        });
        setApi(response.data.businesses);
    }
    useEffect(()=>{
        callApi('Pasta');
    },[])
    return(
        <View style={{flex:1}}>
            <Search term={search} update={setSearch} onPress={()=>callApi(search)}></Search>
            <Text>{search}</Text>
            <Text>{apires?apires.length:null}</Text>
            <ScrollView >
                <List title='Cheap' data={resultByPrice("$")}></List>
                <List title='Mediocre' data={resultByPrice("$$")}></List>
                <List title='Costly' data={resultByPrice("$$$")}></List>
            </ScrollView>
        </View>
    );
}


export default Screen;