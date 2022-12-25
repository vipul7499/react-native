import React, { Component } from "react";
import {
  StyleSheet,
  View,
} from "react-native";
import _ from "lodash";
import { COLORS } from "../constants";
import { connect } from "react-redux";
import { employeesFetch, booksFetch } from "./Actions/Actions.js";
import AddBook from "./AddBook";
import ProfileFinal from "../components/ProfileFinal";

class Profile extends Component {
  state = {
    addBookPage: false,

  };

  current = {};
  books = {};

  componentWillMount() {
    this.props.employeesFetch();
    this.findCurrent(this.props.email);
    this.props.booksFetch();
    console.log(this.props.book);
    this.books = this.props.book.filter((item) => {
      item.email == this.props.email
    });
  }
  componentDidMount() {
    this.props.employeesFetch();
    this.findCurrent(this.props.email);
    this.props.booksFetch();
    console.log(this.props.book);
    this.books = this.props.book.filter((item) => {
      return item.email === this.props.email;
    });

  }
  componentWillReceiveProps(nextProps) {
    this.findCurrent(this.props.email);
    this.books = this.props.book.filter((item) => {
      return item.email === this.props.email;
    });
  }

  findCurrent = (email) => {
    for (var i in this.props.employee) {
      if (this.props.employee[i].email == email) {
        this.current = this.props.employee[i];
      }
    }
  };

  renderPage() {
    // console.log(this.props);
    console.log(this.current);
    console.log(this.books);
    if (this.state.addBookPage) {
      return (
        <View style={{ flex: 1 }}>
          <AddBook
            email={this.props.email}
            changeState={this.setState.bind(this)}
          ></AddBook>
        </View>
      );
    } else {
      return (
        <ProfileFinal data={this.current} ou1={this.props.logOut} ou2={this.props.loggedState} book={this.books}></ProfileFinal>
      );
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        {/* <Text>Hi</Text> */}
        {this.renderPage()}
        {/* <ProfileFinal></ProfileFinal> */}
      </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black,
  },
  text: {
    color: "#52575D",
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  titleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 50,
    marginHorizontal: 16,
  },
  subText: {
    fontSize: 12,
    color: "#AEB5BC",
    textTransform: "uppercase",
    fontWeight: "500",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
  },
  dm: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: 20,
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  active: {
    backgroundColor: "#34FFB9",
    position: "absolute",
    bottom: 28,
    left: 10,
    padding: 4,
    height: 20,
    width: 20,
    borderRadius: 10,
  },
  add: {
    backgroundColor: "#41444B",
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  infoContainer: {
    alignSelf: "center",
    alignItems: "center",
    marginTop: 16,
  },
  statsContainer: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 32,
  },
  statsBox: {
    alignItems: "center",
    flex: 1,
  },
  mediaImageContainer: {
    width: 180,
    height: 200,
    borderRadius: 12,
    overflow: "hidden",
    marginHorizontal: 10,
    padding: 12,
  },
  mediaCount: {
    backgroundColor: "#41444B",
    position: "absolute",
    top: "50%",
    marginTop: -50,
    marginLeft: 30,
    width: 100,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    shadowColor: "rgba(0, 0, 0, 0.38)",
    shadowOffset: { width: 0, height: 10 },
    shadowRadius: 20,
    shadowOpacity: 1,
  },
  recent: {
    marginLeft: 30,
    marginTop: 32,
    marginBottom: 6,
  },
  recentItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  activityIndicator: {
    backgroundColor: "#CABFAB",
    padding: 4,
    height: 12,
    width: 12,
    borderRadius: 6,
    marginTop: 3,
    marginRight: 20,
  },
  BasicInfo: {
    color: "#ffffff",
    fontSize: 18,
  },
  containers: {
    height: 100,
    width: 350,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFill,
  },
});

const mapStateToProps = (state) => {
  // console.log(state);
  const employee = _.map(state.employee, (val, uid) => {
    return { ...val, uid };
  });

  const book = _.map(state.book, (val, uid) => {
    return { ...val, uid };
  });



  return { employee, book };
};

export default connect(mapStateToProps, { employeesFetch, booksFetch })(Profile);
