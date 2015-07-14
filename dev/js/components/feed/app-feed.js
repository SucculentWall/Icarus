var React = require("react");
var Request = require("./feed-request");
var MakeRequest = require("./feed-makeRequest");
var FeedStore = require("../../stores/app-feedStore");
var AuthStore = require("../../stores/app-authStore");

// dummy data, change when server hooked
var photoRequests = [
  {
    description: "JP's bike",
    tags: ["bicycle", "handsome asian"],
    location: "san francisco",
    id: 3
  },
  {
    description: "Albert sleeping",
    tags: ['whiteboarding', 'handsome asian'],
    location: 'san francisco',
    id:4
  }
];

var getPhotoRequests = function(){
  return {photoRequests: FeedStore.getAllRequests()};
};

var Feed = React.createClass({
  getInitialState: function(){
    return getPhotoRequests();
  },
  _onChange: function () {
    console.log('change triggered');
    this.setState(getPhotoRequests());
  },

  componentDidMount: function() {
    console.log('mounted feed');
    FeedStore.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    FeedStore.removeChangeListener(this._onChange);
  },
  render: function(){
    photoRequests = [];
    var reqs = this.state.photoRequests;
    for (var key in reqs) {
      photoRequests.push(<Request key={key} data={reqs[key]} />);
    }
    return (
      <div className = "feed col-xs-6">
        <MakeRequest />
        <ul>
          {photoRequests}
        </ul>
      </div>
    );
  }
});

module.exports = Feed;