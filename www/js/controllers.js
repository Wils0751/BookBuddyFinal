angular.module('starter.controllers', ['ngSanitize'])

.controller('DashCtrl', function ($scope) {})

.controller('ChatsCtrl', ['$scope', '$ionicLoading', '$timeout', 'Chats', function ($scope, $ionicLoading, $timeout, Chats) {
		// With the new view caching in Ionic, Controllers are only called
		// when they are recreated or on app start, instead of every page change.
		// To listen for when this page is active (for example, to refresh data),
		// listen for the $ionicView.enter event:
		//
		//$scope.$on('$ionicView.enter', function(e) {
		//});
		$scope.results = [];
		$scope.doSomething = function (search) {
			$ionicLoading.show({
				content: 'Loading',
				animation: 'fade-in',
				showBackdrop: true,
				maxWidth: 200,
				showDelay: 0
			});

			console.log(search.query);
			$timeout(function () {
				Chats.search(search)

				.then(function (response) {
					$ionicLoading.hide();
					//console.log("hello")
					console.log(response)
					$scope.results = response.data.GoodreadsResponse.search.results.work;
					console.log($scope.results);
					console.log($scope.results[0].id.__text);

				}, function (response) {



				})
			})
		}
  }])
	.controller('ChatDetailCtrl', function ($scope, $stateParams, $timeout, $ionicLoading, Books) {
		console.log('The book details.');
		$scope.itemid = $stateParams.itemid;

		$ionicLoading.show({
			content: 'Loading',
			animation: 'fade-in',
			showBackdrop: true,
			maxWidth: 200,
			showDelay: 0
		});

		$timeout(function () {
			$scope.item = {}

			Books.book($scope.itemid)

			.then(function (response) {
				$ionicLoading.hide();

				$scope.items = response.data.GoodreadsResponse.book;
				$scope.author = response.data.GoodreadsResponse.book.authors;
				console.log(response)

			}, function (response) {


			})
		})
	})


.controller('AccountCtrl', ['$scope', 'Events', '$filter', function ($scope, Events, $filter) {
	$scope.errorlogs = 'I am loading the eventss controller.';
	$scope.events = [];
	$scope.toutc = function (toStringDate) {
		var date2 = new Date(toStringDate);
		//$scope.errorlogs += date2;
		return date2;
	}

	$scope.findDate = function (example) {
		$scope.errorlogs = 'made it to the function';
		Events.events()
			.then(function (response) {
				$scope.events = response.data.GoodreadsResponse.events.event;
				//	console.log($scope.events);


			}),
			function (error) {
				$scope.errorlogs = 'error occured:' + error;
			}
	}
}])

.filter("myfilter", function () {

	return function (items, datefrom, dateto) {

		var arrayToReturn = [];
		for (var i = 0; i < items.length; i++) {
			//			console.log(date2);
			var tf = new Date(items[i].start_at.__text),
				tt = new Date(items[i].start_at.__text);
			console.log('from date, to date, backend from date, backend to date', [datefrom, dateto, tf, tt]);
			//			console.log(items[i].start_at.__text);
			if (tf > datefrom && tt < dateto) {
				arrayToReturn.push(items[i]);
			}
		}

		return arrayToReturn;
	};
})


.controller('LoadingCtrl', function ($scope, $ionicLoading) {
	$scope.show = function () {
		$ionicLoading.show({
			template: 'Loading...',
			duration: 3000
		}).then(function () {
			console.log("The loading indicator is now displayed");
		});
	};
	$scope.hide = function () {
		$ionicLoading.hide().then(function () {
			console.log("The loading indicator is now hidden");
		});
	};
});