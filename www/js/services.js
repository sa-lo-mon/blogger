angular.module('starter.services', [])
    .factory('Posts', function ($http) {

        function getLatestPosts() {
            return $http.get('/api/getPosts');
        }

        function getPostDetails(postId) {
            return $http.get('/api/getPostDetails/' + postId);
        }

        function insertPost(post) {
            return $http.post('/api/insertPost/', {post: post});
        }

        return {
            getLatestPosts: getLatestPosts,
            getPostDetails: getPostDetails,
            insertPost: insertPost
        };
    });
