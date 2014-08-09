var myApp = angular.module('myApp', []);
myApp.value("conf", {
    thumbLength: 3
});

myApp.controller("GalleryController", function ($scope, conf, mockJson) {
    $scope.mock = mockJson;
    $scope.thumbSize = conf.thumbLength;
    $scope.images = {
        select: function(pos) {
            if(!angular.isUndefined(pos)) {
                this.position.big = pos;
            }
            this.selected =  this.value[this.position.big];
        },

        displayHead: function(i) {
            if((i>=this.position.thumb) && (i<this.position.thumb+$scope.thumbSize)){
                return true;
            }
            return false;
        },
        displayTail: function(i) {
            if((this.position.thumb+$scope.thumbSize>=this.value.length)&&(i<=this.position.thumb+$scope.thumbSize-this.value.length-1)){
                console.info(i);
                return true
            }
            return false;
        },
        nextBig: function(){
            this.position.big++;
            if(this.position.big == this.value.length){
                this.position.big=0;
            }
            this.select();
            if(this.position.big>=this.position.thumb+$scope.thumbSize){
                this.nextThumb();
            }
            if(this.position.big<this.position.thumb){
                this.nextThumb();
            }
        },
        prevBig: function() {
            this.position.big--;
            if(this.position.big==-1) {
                this.position.big=this.value.length-1;
            }
            this.select();
            if(this.position.big>=this.position.thumb+$scope.thumbSize){
                this.prevThumb();
            }
            if(this.position.big<this.position.thumb){
                this.prevThumb();
            }
        },
        nextThumb: function(){
            this.position.thumb++;
            if(this.position.thumb == this.value.length){
                this.position.thumb=0;
            }
        },
        prevThumb: function(){
            this.position.thumb--;
            if(this.position.thumb == -1){
                this.position.thumb=this.value.length-1;
            }
        },
        fill: function (data) {
            this.value = angular.fromJson(data).pictures;
            this.select(0);
        },
        position: {
            big: 0,
            thumb: 0
        },
        selected: {},
        value: []
    }
});


myApp.value("mockJson", angular.toJson({
    pictures: [{
        source: "http://mobini.pl/upload/files/127/541/382/997/558/272_koty-03.jpeg",
        name: "kitty1",
        description: "kitty1desc"
    }, {
        source: "http://img2.national-geographic.pl/uploads/photo/5/5193/male-jest-piekne-koty-male-jest-piekne-koty-5193-large.jpg",
        name: "kitty2",
        description: "kitty2desc"
    }, {
        source: "http://www.aphossa.pl/wp-content/uploads/2010/06/kot.jpg",
        name: "kitty3",
        description: "kitty3desc"
    },
        {
            source: "https://lh5.googleusercontent.com/-kMPFq41xUtc/AAAAAAAAAAI/AAAAAAAAAJk/PF9XLjeKaO4/photo.jpg",
            name: "kitty4",
            description: "kitty4desc"
        }, {
            source: "http://www.tapeciarnia.pl/tapety/normalne/113041_kotek_na_kamieniu_trawa.jpg",
            name: "kitty5",
            description: "kitty5desc"
        }, {
            source: "http://www.tapetus.pl/obrazki/n/132596_maly-kotek-niebieskie-oczka.jpg",
            name: "kitty6",
            description: "kitty6desc"
        }
    ]
},true));