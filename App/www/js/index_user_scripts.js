var result;
var address;
var mode = -1;
(function()
{
 function send_msg(address,data_in){
     $('#text_stat').text('starting to send...');
     $.ajax({
        url:  address,
        type: "POST",
        crossDomain: true,
        data: data_in,
        dataType: "json",
         // Work with the response
        success: function( responseData ) {
            console.log(responseData);
            $('#text_stat').text('success to send'); // server response
        },
        error: function(xhr,textStatus){
//            console.log('ERROR');
//            $('#text_stat').text('ERROR! - '+textStatus);
        }
    });
 }
    
function send_msg_bt(address,data_in){
     $('#text_stat').text('starting to send...');
     $.ajax({
        url:  address,
        type: "POST",
        crossDomain: true,
        data: data_in,
        dataType: "json",
         // Work with the response
        success: function( responseData ) {
            console.log(responseData);
            $('#text_stat').text('success to send'); // server response
        },
        error: function(xhr,textStatus){
//            console.log('ERROR');
//            $('#text_stat').text('ERROR! - '+textStatus);
        }
    });
 }
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
        /* button  Purge */
    $(document).on("click", ".uib_w_6", function(evt)
    {
        if(mode==0){
        address=$('#input_ip').val();
        
        send_msg(address,{cmd: "d"});} else if (mode==1){
        
        app.sendData("d");
        }
    });
    
        /* button  Reagent */
    $(document).on("click", ".uib_w_7", function(evt)
    {
        if(mode==0){
        address=$('#input_ip').val();
        
        send_msg(address,{cmd: "s"});} else if (mode==1){
        
        app.sendData("s");
        }
    });
    
        /* button  Sample */
    $(document).on("click", ".uib_w_8", function(evt)
    {
        if(mode==0){
        address=$('#input_ip').val();
        
        send_msg(address,{cmd: "w"});} else if (mode==1){
        
        app.sendData("w");
        }
    });
    
        /* button  Connect */
    $(document).on("click", ".uib_w_9", function(evt)
    {
        app.connect();
    });
    
        /* button  Init_BT */
    $(document).on("click", ".uib_w_10", function(evt)
    {
        
            app.initialize();
    });
    
            /* button  Wi-Fi */
    $(document).on("click", ".uib_w_15", function(evt)
    {
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        mode = 0;
        $('#text_mode').text("Wi-Fi Mode");
        $('#text_stat').text("\n");
         uib_sb.toggle_sidebar($(".uib_w_12"));  
    });
    
        /* button  Bluetooth */
    $(document).on("click", ".uib_w_16", function(evt)
    {
         /* Other possible functions are: 
           uib_sb.open_sidebar($sb)
           uib_sb.close_sidebar($sb)
           uib_sb.toggle_sidebar($sb)
            uib_sb.close_all_sidebars()
          See js/sidebar.js for the full sidebar API */
        mode = 1;
        $('#text_mode').text("Bluetooth Mode");
         
        $('#text_stat').text("\n");
         uib_sb.toggle_sidebar($(".uib_w_11"));  
    });
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
