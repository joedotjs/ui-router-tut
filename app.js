/*

 Home page

 Puppy List page
 Puppy

 */

var app = angular.module('Puppies', ['ui.router']);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
        url: '/',
        template: '<h1>Home page!</h1>'
    });

    $stateProvider.state('list', {
        url: '/puppies',
        templateUrl: 'templates/puppy-list.html',
        controller: 'PuppyListController'
    });

    $stateProvider.state('list.breed', {
        url: '/:breed',
        templateUrl: 'templates/breed-page.html',
        abstract: true
    });

    $stateProvider.state('list.breed.info', {
        url: '',
        templateUrl: 'templates/breed-info.html',
        controller: 'BreedInfoCtrl'
    });

    $stateProvider.state('list.breed.gallery', {
        url: '/gallery',
        templateUrl: 'templates/breed-gallery.html',
        controller: 'BreedGalleryCtrl'
    });

});

app.controller('NavController', function ($scope, $state) {
    $scope.goToState = function (stateName) {
        $state.go(stateName);
    };
});

app.controller('PuppyListController', function ($scope, $state) {

    $scope.puppies = [
        {breed: 'Golden Retriever'},
        {breed: 'Corgi'},
        {breed: 'King Charles Spaniel'},
        {breed: 'Pug'}
    ];

    $scope.goToBreed = function (breedName) {
        $state.go('list.breed.info', { breed: breedName });
    };

});

app.service('PuppyService', function ($q) {

    var breedData = {
        'Golden Retriever': {
            image: 'http://3.bp.blogspot.com/-iVeRPzb14xk/UeCIIlGIp6I/AAAAAAAACQY/o5BxoQ0AWEs/s1600/1013714_630706690284534_93067337_n.jpg'
        },
        'Corgi': {
            image: 'http://hqtiger.mobi/wp-content/uploads/welsh-corgi-puppies-wallpaper-2.jpg'
        },
        'King Charles Spaniel': {
            image: 'http://images.fineartamerica.com/images-medium-large/portrait-of-a-king-charles-spaniel-puppy-marcy-maloy.jpg'
        },
        'Pug': {
            image: 'http://www.puppiespuppy.com/wp-content/uploads/2014/09/Pug-Puppy-For-Sale.jpg'
        }
    };

    this.getBreedData = function (breedName) {
        return $q(function (resolve, reject) {
            resolve(breedData[breedName]);
        });
    };

});

app.controller('BreedInfoCtrl', function ($scope, $stateParams) {
    $scope.breed = $stateParams.breed;
});

app.controller('BreedGalleryCtrl', function ($scope, $stateParams, PuppyService) {
    PuppyService.getBreedData($stateParams.breed).then(function (data) {
        $scope.puppyImage = data.image;
    });
});