import docker
import threading

class ContainerHandler:
    def __init__(self,image_name):
        self.image_name = image_name
        self.callbacks = {}
        self.running = False
        self.container = None
        self.attach_socket = None
        self.log_thread = None
        self.code = ""
        self.client = docker.from_env()

    def set_callback(self,callback_name,callback):
        self.callbacks[callback_name] = callback

    def set_code(self,code):
        self.code = code

    def set_on_message(self,callback):
        self.set_callback("on_message",callback)

    def send_input(self,input):
        command = input+"\n"
        self.attach_socket.send(command.encode())

    def is_running(self):
        self.container.reload()
        #return self.container.status == "running"
        return self.running

    def read_container_logs(self):
        while self.is_running():
            try:
                output = self.attach_socket.recv(1024)
                if output :
                    if self.callbacks['on_message']:
                        self.callbacks['on_message'](output.decode())
                else:
                    break
            except:
                break
    

    def stop(self):
        if not self.running:
            return
        self.running = False
        self.container.stop()
        self.container.remove()

    def start(self):
        self.running = True
        self.container = self.client.containers.run(self.image_name,command=[self.code], detach=True,stdin_open=True,auto_remove=True)
        self.attach_socket = self.container.attach_socket(params={'stdin': 1, 'stdout': 1, 'stream': 1, 'logs': 1})
        self.log_thread = threading.Thread(target=self.read_container_logs)
        self.log_thread.start()