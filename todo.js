var TodoApp = angular.module('TodoApp', []);

TodoApp.controller('TodoCtrl', function($scope) {
    $scope.todos = [{
        text: 'learn angular',
        done: true
    }, {
        text: 'build an angular app',
        done: false
    }];

    $scope.addTodo = function() {
        if ($scope.todoText === '' || $scope.todoText === undefined) return;
        $scope.todos.push({
            text: $scope.todoText,
            done: false
        });
        $scope.todoText = '';
    };

    $scope.remaining = function() {
        var count = 0;
        angular.forEach($scope.todos, function(todo) {
            count += todo.done ? 0 : 1;
        });
        return count;
    };

    $scope.archive = function() {
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
    };
});

// describe('TodoCtrl', function() {

//     it('should create "phones" model with 3 phones', function() {
//         var scope = {},
//             ctrl = new PhoneListCtrl(scope);

//         expect(scope.phones.length).toBe(3);

//     });

// });
