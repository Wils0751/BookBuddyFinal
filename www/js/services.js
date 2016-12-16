angular.module('starter.services', [])

.factory('Chats', function BooksFactory($http) {
var url;
var URL = "https://www.goodreads.com";
var local = "httpL//localhost:8100";
var apiKey ="cg3KXsrtKTw309wMfi1Amw";

var title = title;

			return {
				search: function (search) {
					url = URL + "/search/index.xml";
					return $http.get(url, {
						params: {
							'key': apiKey,
							'q': search.query,
							'search[field]': title,
							

	
						},
						transformResponse: function (search) {
                			var x2js = new X2JS({});
                			var response = angular.bind(x2js, x2js.xml_str2json, search)();
                			return response;
							}

					});
				},
			}
})
.factory('Books', function BooksFactory($http ) {
			// Might use a resource here that returns a JSON array
var url;
var URL = "https://www.goodreads.com";
var local= "http:/localhost:8100";
var apiKey ="cg3KXsrtKTw309wMfi1Amw";
//var callbackName = 'JSON_CALLBACK';
//var title = title;
//var itemid =itemid;
	var json = 'xml';
			// Some fake testing data
			return {
				book: function (itemid) {
					url = URL + "/book/show/" + itemid +".xml";
					return $http.get(url, {
						params: {
							'key': apiKey,
							'id': itemid
							

	
						},
						transformResponse: function (search) {
                			var x2js = new X2JS({});
                			var response = angular.bind(x2js, x2js.xml_str2json, search)();
                			return response;
							}

					});
				},
			}
})
.factory('Events', function EventsFactory($http){
var url;
var prozy ="https://www.goodreads.com";
var local= "http:/localhost:8100";
var apiKey="cg3KXsrtKTw309wMfi1Amw";
var country = 'CA';
	return{
		events: function(){
			url = prozy + "/event/index.xml";
			return $http.get(url,{
				params:{
					
					'key': apiKey,
					'search[country_code]': country
					
				},
				transformResponse: function (search) {
                			var x2js = new X2JS({});
                			var response = angular.bind(x2js, x2js.xml_str2json, search)();
                			return response;
							}
			})
		}
	}
	
});