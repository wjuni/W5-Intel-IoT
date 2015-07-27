#!/usr/bin/python

import BaseHTTPServer
import SimpleHTTPServer
import SocketServer
import os

STOP_CODE = 0

class ThreadServer(SocketServer.ThreadingMixIn, BaseHTTPServer.HTTPServer):
    pass
#

def parse_cmd(cmd):

    datatype = cmd.split("=")

    return datatype[1]
#

class MyRequestHandler(SimpleHTTPServer.SimpleHTTPRequestHandler):

    def do_GET(self):

        return SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
    #

    def do_POST(self):

        global STOP_CODE
        global RESULT_QUEUE
        
	length = int(self.headers.getheader('content-length'))
        var = self.rfile.read(length)
	cmd = parse_cmd(var)
        if cmd == "w": #Front

           os.system("echo 'w' > /dev/ttyMFD1")
           

        if cmd == "s": #Back

           os.system("echo 's' > /dev/ttyMFD1")

        if cmd == "d": #Right

           os.system("echo 'd' > /dev/ttyMFD1")

        if cmd == "q": #Stop

           print cmd
           STOP_CODE = 1


        SimpleHTTPServer.SimpleHTTPRequestHandler.do_GET(self)
    #
#

if __name__ == "__main__":

    Handler = MyRequestHandler
    server = ThreadServer(('0.0.0.0',8081), Handler)
    
    while not STOP_CODE == 1:
        server.handle_request()
    server.server_close()
