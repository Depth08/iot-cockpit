/**
 * Created by rafael on 22/03/17.
 */

/**
 * Rafaël's (not so) legendary WebSocket Service
 *
 * Easily subscribe to this service from any controller supplying a reference to the controller scope and supply a name
 *
 * Convention:
 * The server sends a JSON-type message
 * A property "type" contains a String for example "incoming-message". A controller uses the subscribe method
 * and supplies this "incoming-message" as parameter. The callback function gets executed whenever this specific message arrives.
 */

(function () {
    angular
        .module('EzacOgnWebApp')
        .service('WebSocketService', function () {
            // Final needs to be on ws://www.ezac.nl/something
            var BASE_URL = 'ws://localhost:36690';

            // Make connection upon app startup
            var connection = new WebSocket(BASE_URL);

            // List of callbacks that get executed upon an incoming message
            var handlers = [];

            // When websocket opens with success
            connection.onopen = function (event) {
                console.log("Connection established with " + BASE_URL);
            };

            // WebSocket server sends a message...
            connection.onmessage = function (event) {
                console.log(event);

                var data;

                // Can we parse the JSON? If not we prevent a crash
                try {
                    data = JSON.parse(event.data);
                } catch (e) {
                    console.log('Invalid JSON received via WS! Foei Siegfried!', e);
                    return;
                }

                // If there are subscribers to this event...
                if (handlers.length) {
                    // ... then browse through them
                    handlers.forEach(function (handler) {
                        try {
                            // Finally we check if this handler type subscribed to this event type
                            if (handler.type === data.type) {
                                handler.callback(data);
                            }
                        } catch (e) {
                            console.log(e);
                        }
                    });
                }
            };

            // Subscribe an external function to onmessage callbacks
            this.subscribe = function (type, scope, handler) {
                handlers.push({
                    type: type,
                    scope: scope,
                    callback: handler
                });

                console.log(handlers);
            };

            // Unsubscribe from the handlers pool (it's still a bit funky)
            this.unsubscribe = function (type) {
                var result = handlers.find(function (handler) {
                    return handler.name === type;
                });

                if (result !== undefined) {
                    var index = handlers.indexOf(result);

                    handlers.splice(index, 1);
                }

                console.log(handlers);
            };
        });
})();