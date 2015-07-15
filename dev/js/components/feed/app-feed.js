var React = require("react");
var Request = require("./feed-request");
var MakeRequest = require("./feed-makeRequest");
var FeedStore = require("../../stores/app-feedStore");
var AuthStore = require("../../stores/app-authStore");
var Auth = require("../app-auth");

var photoRequests;

var getPhotoRequests = function(){
  return {photoRequests: FeedStore.getAllRequests()};
};

var Feed = React.createClass({
  getInitialState: function(){
    var obj = getPhotoRequests();
    obj.loggedIn = AuthStore.loggedIn();
    return obj;
  },

  _onLog: function () {
    this.setState({loggedIn: AuthStore.loggedIn()});
  },

  _onChange: function () {
    console.log('change triggered');
    this.setState(getPhotoRequests());
  },

  componentDidMount: function() {
    console.log('mounted feed');
    FeedStore.addChangeListener(this._onChange);
    AuthStore.addChangeListener(this._onLog);
  },
  
  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._onChange);
    AuthStore.removeChangeListener(this._onLog);
  },
  render: function(){
    photoRequests = [];
    var reqs = this.state.photoRequests;
    for (var key in reqs) {
      photoRequests.push(<Request key={key} data={reqs[key]} />);
    }
    return (
      <div className = "feed col-xs-6">
        { this.state.loggedIn ? <MakeRequest /> : <Auth /> }
        <ul>
          {photoRequests}
        </ul>
      </div>
    );
  }
});

module.exports = Feed;