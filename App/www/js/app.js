
var app = {
    //macAddress: "00:01:95:20:26:B6",  // get your mac address from bluetoothSerial.list
    macAddress: "98:4F:EE:03:F4:1B",
    chars: "",

    initialize: function() {
        this.bindEvents();
    },
/*
    bind any events that are required on startup to listeners:
*/
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        connectButton.addEventListener('touchend', app.manageConnection, false);
    },
/*
    this runs when the device is ready for user interaction:
*/
    onDeviceReady: function() {
        // check to see if Bluetooth is turned on.
        // this function is called only
        //if isEnabled(), below, returns success:
        var listPorts = function() {
            // list the available BT ports:
            bluetoothSerial.list(
                function(results) {
                    app.display(JSON.stringify(results));
                },
                function(error) {
                    app.display(JSON.stringify(error));
                }
            );
        }

        // if isEnabled returns failure, this function is called:
        var notEnabled = function() {
            app.display("Bluetooth is not enabled.")
        }

         // check if Bluetooth is on:
        bluetoothSerial.isEnabled(
            listPorts,
            notEnabled
        );
    },
  
    connect: function() {
        //connect
       app.display("Attempting to connect. " +
                "Make sure the serial port is open on the target device.");
            // attempt to connect:
            bluetoothSerial.connect(
                app.macAddress,  // device to connect to
                app.openPort,    // start listening if you succeed
                app.showError    // show the error if you fail
            );
    },
     disconnect : function () {
            app.display("attempting to disconnect");
            // if connected, do this:
            bluetoothSerial.disconnect(
                app.closePort,     // stop listening to the port
                app.showError      // show the error if you fail
            );
        },
/*
    subscribes to a Bluetooth serial listener for newline
    and changes the button:
*/
    openPort: function() {
        app.display("Connected to: " + app.macAddress);
        bluetoothSerial.subscribe('\n', function (data) {
            app.clear();
            app.display(data);
        });
    },

/*
    unsubscribes from any Bluetooth serial listener and changes the button:
*/
    closePort: function() {
        app.display("Disconnected from: " + app.macAddress);
        bluetoothSerial.unsubscribe(
                function (data) {
                    app.display(data);
                },
                app.showError
        );
    },
/*
    appends @error to the message div:
*/
    showError: function(error) {
        app.display(error);
    },

/*
    appends @message to the message div:
*/
    display: function(message) {
//        var display = document.getElementById("message"), // the message div
//            lineBreak = document.createElement("br"),     // a line break
//            label = document.createTextNode(message);     // create the label
//
//        display.appendChild(lineBreak);          // add a line break
//        display.appendChild(label);              // add the message node
        $('#text_stat').text(message);
        
    },
    
    sendData: function(input) { // send data to Arduino

        var success = function() {
            app.display("success");
            app.display( "Sent: " + messageInput.value );
        };

        var failure = function() {
            app.display("Failed writing data to Bluetooth peripheral");
        };

        var data = input;
        bluetoothSerial.write(data, success, failure);
    },
/*
    clears the message div:
*/ 
    clear: function() {
        var display = document.getElementById("message");
        display.innerHTML = "";
    }
};      // end of app