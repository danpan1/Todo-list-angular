var TodoApp = angular.module('TodoApp', ['ngStorage']);

TodoApp.controller('TodoCtrl', function($scope, $localStorage) {
    var previousEdited = false;

    $scope.todos = [{
        summary: 'a task',
        done: true
    }, {
        summary: 'b task',
        done: false
    }, {
        summary: 'z task',
        done: false
    }];

    if ($localStorage.todos) $scope.todos = $localStorage.todos;

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
        $scope.save();
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
        $scope.save();
    };

    $scope.removeTask = function() {
        $scope.todos.splice($scope.todos.indexOf(this.todo), 1);
        $scope.save();
    };

    $scope.save = function() {
        $localStorage.todos = $scope.todos;
    }

    $scope.load = function() {
        $scope.todos = $localStorage.todos;
    }

    function showEdit(task) {
        task.querySelector(".removeBtn").hidden = !task.querySelector(".removeBtn").hidden;
        task.querySelector(".todoCheckbox").hidden = !task.querySelector(".todoCheckbox").hidden;
        task.querySelector(".todoSummary").hidden = !task.querySelector(".todoSummary").hidden;
        task.querySelector(".editForm").classList.toggle("disabled");
    }
});
