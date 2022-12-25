import React, { Component} from 'react';
import _ from 'lodash';
import {View , Text ,FlatList,TouchableOpacity ,StyleSheet,SafeAreaView} from 'react-native';
import {connect} from 'react-redux';
import {booksFetch} from './Actions/Actions.js';
import { COLORS, FONTS, SIZES, icons, images } from "../constants";
class LogIn extends Component {
    current = [];
    // state = {
    //     val:false,
    // }
    componentWillMount() {
        this.props.booksFetch();
        this.findCurrent(this.props.book);
    }
    componentDidMount() {
        this.props.booksFetch();
        this.findCurrent(this.props.book);
    }
    findCurrent = (book) =>{
        for(var b in book)
        {
            if(book[b].bookName === this.props.route.params['book'])
            {
                // console.log(book[b].email);
                if(!this.current.includes(book[b].email))
                    this.current.push(book[b].email);
            }
        }
        // var test = this.state.val;
        // this.setState({val:!test});
    }
    render() {
        return(
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.black }}>
                <Text style = {styles.text}>Users</Text>
                <FlatList
                    data={this.current}
                    renderItem={(item)=>{
                        return (
                            <View >
                                <TouchableOpacity onPress = {()=>{this.props.navigation.navigate('Profile1' , {email : item.item})}}>
                                    <View style = {styles.item}>
                                    <Text>{item.item}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            )}}
                    keyExtractor={(item) => `${item.email}`}
                    />
                {/* <Text>hi</Text> */}
            </SafeAreaView>
        )
    }
}

const mapStateToProps = state =>{
    // const employee = _.map(state.employee, (val, uid) => {
    //     return { ...val, uid };
    //   });
      const book = _.map(state.book, (val, uid) => {
        return { ...val, uid };
      });
      return { book };
}

export default connect(mapStateToProps , {booksFetch})(LogIn);

const styles = StyleSheet.create({
    item: {
        justifyContent: "center",
        flexGrow: 1,
        alignItems: "center",
        alignSelf:"center",
        color: "white",
        //   textColor : "white",
        backgroundColor:"white",
        height: 40,
        borderRadius: 100,
        width : 300,
        margin: 15,

    },
    text:{
        // backgroundColor:"white",
        alignSelf:"center",
        fontSize:40,
        margin:30,
        color:"white",
    }
  });