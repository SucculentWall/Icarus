var axios = require('axios');
var AppActions = require('../actions/app-actions');

module.exports = {
  
  getAllRequests: function() {
    axios.get('/api/requests')
      .then(function(response) {
        AppActions.receiveAllRequests(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getRequest:function (id) {
    axios.get('/api/requests/'+id)
      .then(function(response) {
        AppActions.receiveRequest(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addRequest: function(text, username, tags) {
    var context = this;
    axios.post('/api/requests', {
        text: text,
        username: username,
        tags: tags
      })
      .then(function(response) {
        // NOTE: no longer need to getAllRequests() since socket emitting
        // context.getAllRequests();
        console.log('new request added');
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  //get comments attached to particular photo, given the photo's id
  getComments:function (id) {
    axios.get('/api/comments/photo/'+id)
      .then(function(response) {
        AppActions.receiveComments(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addComment: function(text, username, photo_id) {
    var context = this;
    axios.post('/api/comments', {
        text: text,
        username: username,
        photo_id: photo_id
      })
      .then(function(response) {
        context.getComments(photo_id);
        console.log('new comment added');
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  addPhoto: function(photo, username, request_id, tags) {
    var context = this;
    var data = new FormData();
    data.append('username', username);
    data.append('request_id', request_id);
    data.append('photo', photo);
    data.append('tags', JSON.stringify(tags));
    console.log('these are strung tags: ', JSON.stringify(tags));
    axios.post('/api/photos', data)
      .then(function(response) {
        // no longer need to requery (socket emit will trigger it)
        // context.getRequest(request_id);
        console.log('add photo response: ', response);
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  getAllPhotos: function() {
    axios.get('/api/photos')
      .then(function(response) {
        AppActions.receiveAllPhotos(response);      
      })
      .catch(function(error) {
        console.log(error);
      });
  },

  findOrCreateUser: function(id, name, token) {
    axios.post('/api/users', {FacebookId: id, username: name })
      .then(function(response) {
        AppActions.loggedIn(response.data, token);
      })
      .catch(function(error) {
        AppActions.notLoggedIn(error);
      });
  }
};