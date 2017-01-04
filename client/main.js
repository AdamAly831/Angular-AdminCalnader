var app = angular.module("myApp", ["ngRoute"]);

// routes
app.config(function($routeProvider){
   $routeProvider
      .when("/admin", {
         templateUrl: "static/partials/admin.html"
      })
      .when("/course", {
         templateUrl: "static/partials/course.html"
      })
      .otherwise({
         redirectTo:"/admin"
      });
})

app.factory("courseFactory",[function(){
   var factory = {};


   //examples
   var courses = [
    { 
         date: "Jan 2nd 2014", 
         class: "Scrum training",
         cat: "scrum ",
         loc: "Pas.WorkPlace",
         slots: "2"
    }

   ];


  
   factory.index = function(callback){
      callback(courses);
   }

   //Add  
   factory.create = function(course){
      courses.push(course);
   }

   //delete
   factory.delete = function($index){
      courses.splice($index, 1);
   }
   return factory;
}])

// make the controller for Ccourses
app.controller("AdminController", ['$scope', 'courseFactory', function($scope, courseFactory){
   function setCourses(data){
      $scope.courses = data;
      $scope.newCourse = {};
   }

   $scope.courses = [];

 
   courseFactory.index(setCourses);

  // now i want to create a Create function for a course 
   $scope.create = function(){
      courseFactory.create($scope.newCourse)
      $scope.newCourse = {};  // should reset the forum
   }

   //delete course ffrom the index/ factory 
   $scope.delete = function($index){
      courseFactory.delete($index);
   }
}])

//Inject courseCalander into each controller
app.controller("CalandarController",['$scope', 'courseFactory', function($scope, courseFactory){
   function setCourses(data){
      $scope.courses = data;
   }

   $scope.courses = [];

   //should load the user list
   courseFactory.index(setCourses);
}])