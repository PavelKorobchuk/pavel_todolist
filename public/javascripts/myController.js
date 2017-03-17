
angular.module('myController', [])
.controller('myController', ['$scope','$http','Todos', function($scope, $http, Todos) {
    $scope.formData = {};
    $scope.todos = [];
    $scope.loading = true;
    $scope.updateTodoList = function(){
        Todos.get()
			.success(function(data) {
				$scope.todos = data;
				$scope.loading = false;
			});
    }
    // when landing on the page, get all todos and show them
		// use the service to get all the todos
    
// when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

 // when submitting the add form, send the text to the node API

 $scope.createTodo = function(){
     $http.post('/api/todos', $scope.formData)
        .success(function(data){
            $scope.formData = {}
            //$scope.todos = data
            console.log(data);
            $scope.updateTodoList()
        })
        .error(function(data){
            console.log('Error' + data)
        })
 }

// delete todos
     $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    }])
