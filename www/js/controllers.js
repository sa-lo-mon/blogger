angular.module('starter.controllers', [])

    .controller('PostsCtrl', function ($scope, Posts) {
        $scope.posts = [];
        Posts.getLatestPosts().then(function (data) {
            if (data) {
                $scope.posts = data.data.data;
            }
        });
    })
    .controller('PostDetailCtrl', function ($scope, $stateParams, Posts) {

        $scope.post = {};
        Posts.getPostDetails($stateParams.postId).then(function (data) {
            if (data) {
                $scope.post = data.data.data[0];
            }
        });
    })
    .controller('NewPostCtrl', function ($scope, $stateParams, $ionicPopup, $state, Posts) {

        $scope.formData = {};
        $scope.submitPost = function () {

            var post = $scope.formData;
            Posts.insertPost(post).then(function (data) {
                if (data) {
                    $ionicPopup.alert({
                        title: 'New Post',
                        template: 'Your post submitted successfully!'
                    });

                    $state.go('tab.posts');

                } else {
                    $ionicPopup.alert({
                        title: 'New Post',
                        template: 'It seems that your post wasn\'t submitted successfully. ' +
                        '</br> Please try submit again or try later.'
                    });
                }
            });
        };
    });
