var TodoApp = angular.module('TodoApp', []);

TodoApp.controller('TodoCtrl', function($scope) {
    var previousEdited = false;
    $scope.todos = [{
        summary: 'learn angular',
        done: true
    }, {
        summary: 'build an angular app',
        done: false
    }];

    $scope.addTodo = function() {
        if ($scope.todoSummary === '' || $scope.todoSummary === undefined) return;
        $scope.todos.push({
            summary: $scope.todoSummary,
            done: false
        });
        $scope.todoSummary = '';
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

    $scope.edit = function($event) {
        if (this.todo.done) return;
        if (previousEdited) showEdit(previousEdited);
        showEdit($event.currentTarget.parentElement);
        previousEdited = $event.currentTarget.parentElement;
    };

    $scope.editSubmit = function($event) {
        previousEdited = false;
        showEdit($event.currentTarget.parentElement);
        this.todo.summary = $event.currentTarget.querySelector('input').value;
    };

    $scope.removeTask = function() {
        $scope.todos.splice($scope.todos.indexOf(this.todo), 1);
    };

    function showEdit(task) {
        task.querySelector(".removeBtn").hidden = !task.querySelector(".removeBtn").hidden;
        task.querySelector(".todoCheckbox").hidden = !task.querySelector(".todoCheckbox").hidden;
        task.querySelector(".todoSummary").hidden = !task.querySelector(".todoSummary").hidden;
        task.querySelector(".editForm").classList.toggle("disabled");
    }
});

// describe('TodoCtrl', function() {

//     it('should create "phones" model with 3 phones', function() {
//         var scope = {},
//             ctrl = new PhoneListCtrl(scope);

//         expect(scope.phones.length).toBe(3);

//     });

// });
