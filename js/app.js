var fvApp = angular.module('FruitAndVeggiesApp',[]);

fvApp.run(function(){
    console.log('ng app started');
})

fvApp.controller('FVListController',['$scope',function($scope){

    $scope.fruit=[];
    $scope.veggies=[];
    $scope.message={class:"",message:""}
    $scope.partOneComplete=false;
    $scope.partTwoComplete=false;

    $scope.fruitAndVeggies = fruit.map(function(item){
        return {name:item,type:'fruit'}
    });

    $scope.fruitAndVeggies = $scope.fruitAndVeggies.concat(vegetables.map(function(item){
        return {name:item,type:'vegetable'}
    }));  

    $scope.fruitAndVeggies = shuffle($scope.fruitAndVeggies);

    var checkWinner = function(){
        if($scope.fruitAndVeggies.length > 0) return;
        var wrongFruit = $scope.fruit.filter(function(item){
            return item.type!=="fruit";
        });
        var wrongVeggies = $scope.veggies.filter(function(item){
            return item.type!=="vegetable";
        });  
        if(wrongFruit.length > 0 || wrongVeggies.length >0){
            $scope.message.text="OH NO!! Some items are in the wrong list.";
            $scope.message.class="danger";
        }else{
            $scope.message.text="YAY!! You sorted all the fruits and veggies. Now try arranging them alphabetically.";
            $scope.message.class="success";
            $scope.partOneComplete=true;
        }
    }

    var checkWinnerAlpha = function(){
        if(isSorted($scope.veggies) && isSorted($scope.fruit)){
            $scope.message.text="YAY!! You win!! You sorted all the fruits and veggies.";
            $scope.message.class="success";
            $scope.partTwoComplete=true;
        }else{
            $scope.message.text="Not sorted yet... keep trying.";
            $scope.message.class="warning";
        }
    }

  
    $scope.removeFruit=function(idx){
        $scope.fruitAndVeggies.unshift($scope.fruit.splice(idx,1)[0]);
    };

    $scope.removeVegetable=function(idx){
        $scope.fruitAndVeggies.unshift($scope.veggies.splice(idx,1)[0]);
    };    

    $scope.addFruit=function(idx){
        $scope.fruit.unshift($scope.fruitAndVeggies.splice(idx,1)[0]);
        checkWinner();
    };

    $scope.addVegetable=function(idx){
        $scope.veggies.unshift($scope.fruitAndVeggies.splice(idx,1)[0]);
        checkWinner();
    };

    $scope.move=function(arr,idx,dir){
        var targetIdx = idx + dir;
        var temp = arr[idx];
        arr[idx] = arr[targetIdx];
        arr[targetIdx] = temp;
        checkWinnerAlpha();
    }


}]);




//helper functions

function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
}

function isSorted(arr){
    if(arr.length < 2) return false;
    for(var i = 1; i < arr.length; i++){
        if(arr[i-1].name > arr[i].name) return false;
    }
    return true;
}