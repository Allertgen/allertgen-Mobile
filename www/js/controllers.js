angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// })

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// })
.controller('restaurantResultsCtrl', function($scope, yelpRequest){
  $scope.results = yelpRequest.search.results;
  console.log($scope.results);

  var count = 1;
  for (var i in $scope.results){
    $scope.results[i].count = count;
    count++;
  }

  $scope.showDetails = function(){
    alert("DETAILS LOLZ!");
  }
})

.service('yelpRequest', function($http){
  // point context at the same yelpRequest object which 'this' is pointing at
  var context = this;
  context.search = function(restaurant, location){
    // returns a promise so that the next promise will be executed
    return $http.get('http://localhost:8080/yelp', {
      params: {
        restaurant: restaurant,
        location: location
      }
    })
    .then(function(res){
      context.search.results = res.data.businesses;
      console.log('SCOPE.SEARCH.RESULTS', context.search.results);

      // //clear all the fields NOT WORKING
      // context.search.restaurant = null;
      // context.search.location = null;
      // context.search.glutenChecked = null;
      // context.search.dairyChecked = null;
      // context.search.soyChecked = null;
    })
  }
})
.controller('SearchCtrl', 
  ['$scope', '$http', '$location', '$state', 'yelpRequest', function ($scope, $http, $location, $state, yelpRequest) {

  $scope.search = function(restaurant, location){
    //console.log($scope.search.glutenChecked);

    //perform API call to get info that we can render on searchPage
    yelpRequest.search(restaurant, location)
    .then(function(res){
      //clear all the fields NOT WORKING
      $scope.search.restaurant = null;
      $scope.search.location = null;
      $scope.search.glutenChecked = null;
      $scope.search.dairyChecked = null;
      $scope.search.soyChecked = null;
    })
    .then(function(){
      $state.go('app.restaurantResults', {});
    })


    // $http.get('http://localhost:8080/yelp', {
    //   params: {
    //     restaurant: restaurant,
    //     location: location
    //   }
    // }).then(function(res){
    //   $scope.search.results = res.data.businesses;
    //   console.log('SCOPE.SEARCH.RESULTS', $scope.search.results);

    //   //clear all the fields
    //   $scope.search.restaurant = null;
    //   $scope.search.location = null;
    //   $scope.search.glutenChecked = null;
    //   $scope.search.dairyChecked = null;
    //   $scope.search.soyChecked = null;
    // })
    // .then(function(){
    //   //go to search page
    //   $state.go('app.restaurantResults', {});
    // })
  };

  $scope.showLoc = false;

  $scope.showLocation = function(){
    if (!$scope.showLoc){
      $scope.showLoc = true;
    } 
  }

}]);
