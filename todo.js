var TodoApp = angular.module('TodoApp', ['ngStorage']);

TodoApp.controller('TodoCtrl', function($scope, $localStorage) {

    var currentEdited = false;
    var currentEditedIndex = null;
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
        //Remove DONE tasks from page and data
        $scope.endEditMode();
        var oldTodos = $scope.todos;
        $scope.todos = [];
        angular.forEach(oldTodos, function(todo) {
            if (!todo.done) $scope.todos.push(todo);
        });
        $scope.saveToLocalStorage();
    };

    $scope.edit = function($event) {
        if (this.todo.done) return; 
        //hide previous edited item
        $scope.endEditMode(); 
        //show current clicked item for editing and put currently edited item to variable
        currentEditedIndex = $scope.todos.indexOf(this.todo);
        currentEdited = $event.currentTarget.parentElement;
        currentEdited.classList.add('editItem');
    };

    $scope.editSubmit = function($event) {
        this.todo.summary = $event.currentTarget.querySelector('input').value;
        $scope.endEditMode();
        $scope.saveToLocalStorage();
    };

    $scope.removeTask = function() {
        //by clicking Remove icon
        $scope.endEditMode();
        $scope.todos.splice($scope.todos.indexOf(this.todo), 1);
        $scope.saveToLocalStorage();
    };

    $scope.saveToLocalStorage = function() {
        //Local storage save
        $localStorage.todos = $scope.todos;
    }

    $scope.load = function() {
        //Local storage load
        $scope.todos = $localStorage.todos;
    }

    $scope.endEditMode = function() {
        if (currentEdited) {
            currentEdited.querySelector('.editForm input').value = $scope.todos[currentEditedIndex].summary;
            currentEdited.classList.remove('editItem');
            currentEdited = false;
        }

    }

});
