/**
 * Created by dddpe on 2016-7-15.
 */
angular
    .module('recruitApp',['ngRoute','ngAnimate','swipe'])
    .config(function ($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home/home.html',
                controller: 'homeControler',
                controllerAs: 'home'
            })
            .otherwise({
                redirectTo: '/'
            });
    })
    .controller('homeControler',['$scope','$sce', function ($scope,$sce) {
        $scope.musicOn = true;
        $scope.pages = [
            {url:'views/home/a.html',isShow:true}
        ];



        $scope.next=function(index){
            var length=$scope.pages.length;
            if(index==length-1){
                angular.forEach($scope.pages,function(v,i){
                    if(i==0){
                        v.isShow=true;
                    }else{
                        v.isShow=false;
                    }
                });
            }
            else{
                angular.forEach($scope.pages,function(v,i){

                    if(i==index+1){
                        v.isShow=true;
                    }else{
                        v.isShow=false;
                    }
                });
            }

        };
        $scope.pre=function(index){
            var length=$scope.pages.length;
            if(index==0){
                angular.forEach($scope.pages,function(v,i){
                    if(i==length-1){
                        v.isShow=true;
                    }else{
                        v.isShow=false;
                    }
                });
            }
            else{
                angular.forEach($scope.pages,function(v,i){

                    if(i==index-1){
                        v.isShow=true;
                    }else{
                        v.isShow=false;
                    }
                });

            }
        };


    }]);