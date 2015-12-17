//From https://gist.github.com/djavier/8186812

// var module = angular.module( 'my.resource', [ 'ngResource' ] );
  // module.exports = function(app) {

  //   app.factory( 'credateResource', [ '$resource', function( $resource ) {
  //    return function( url, params, methods ) {
  //      var defaults = {
  //        update: { method: 'put', isArray: false },
  //        create: { method: 'post' }
  //      };

  //      methods = angular.extend( defaults, methods );

  //      var resource = $resource( url, params, methods );

  //      resource.prototype.$save = function() {
  //        if ( !this.id ) {
  //          return this.$create();
  //        }
  //        else {
  //          return this.$update();
  //        }
  //      };

  //      return resource;
  //    };
  //   }]);
  // }


 // var module = angular.module( 'my.resource', [ 'ngResource' ] );

 // module.factory( 'Resource', [ '$resource', function( $resource ) {
 //   return function( url, params, methods ) {
 //     var defaults = {
 //       update: { method: 'put', isArray: false },
 //       create: { method: 'post' }
 //     };

 //     methods = angular.extend( defaults, methods );

 //     var resource = $resource( url, params, methods );

 //     resource.prototype.$save = function() {
 //       if ( !this.id ) {
 //         return this.$create();
 //       }
 //       else {
 //         return this.$update();
 //       }
 //     };

 //     return resource;
 //   };
 // }]);
