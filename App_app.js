import React, { Component } from 'react';
import { Text, View, Image, StyleSheet, ActivityIndicator, FlatList, Dimensions ,Linking} from 'react-native';
const { width, height } = Dimensions.get('window');

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, data: "" }
  }

  componentDidMount() {
     return fetch('https://newsapi.org/v2/top-headlines?country=id&apiKey=da77ab9a622d42a084a0627a47550ed1')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          data: responseJson.articles,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }
  

  renderItem(item) {
    const {title, description, urlToImage, url, publishedAt, author } = item.item;
    return (
      <View style={styles.itemView}>
        

        <View style={styles.itemInfo}>
          <Text style={styles.name}>
            {title}
          </Text>          
           <Text numberOfLines={1}>Updated: {publishedAt} {width}</Text>
          <Text numberOfLines={1}>Author: {author}</Text>
          <Image style={styles.imageStyle}
            source={{ uri: urlToImage }}
          />
          <Text numberOfLines={3}>{description}</Text>
          <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL(url)}>Details</Text>
        </View>
      </View>
    );
  }

  renderHeader() {
    return (
      <View style={styles.headerBg}>
        <Text style={styles.headerText}>Latest Headline</Text>
      </View>
    );
  }

  renderFooter = () => {
    if (!this.state.loading) return null;

    return (
      <View style={styles.headerBg}>
        <ActivityIndicator animating size="large" />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.data}
          renderItem={this.renderItem.bind(this)}
          keyExtractor={item => item.id}           
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={this.renderFooter}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  itemView: {
    flex: 1,
    width,
    borderBottomWidth: 0.5,
    borderColor: '#cdcdcd',
    borderStyle: 'solid',
    paddingHorizontal: 12,
    flexDirection: 'row',
  },
  imgContainer: {
    flex: 0,
    borderColor: '#f4f4f4',
    borderWidth: 1.5,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  itemInfo: {
    flex: 1,
    marginHorizontal: 20,
  },
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
    color: /*'#ff0000'*/ '#0d0c0c',
    textAlign: 'left',
  },
  imageStyle: {
    height: 220,
    width: width-60 ,
  },
  headerBg: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5544',
    height: 50,
  },
  headerText: {
    fontFamily: 'Verdana',
    fontSize: 20,
    color: '#FFFFFF',
  },
});