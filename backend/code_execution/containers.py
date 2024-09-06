import docker
from docker.errors import NotFound
import threading
import time
import queue
# from backend.code_execution.exceptions import *

class ContainerManager():
    _lock = threading.Lock()
    _start_control_thread_lock = threading.Lock()
    _active_containers = []
    _containers = []
    _queue = queue.Queue()
    control_thread = None
    
    def __init__(self,image_name):
        self.container = self.get_container_handler(image_name)
        self.count_limit = 2
        self.time_limit = 10

    def __del__(self):
        self.__remove_container_handler(self.container)

    def send_input_to_container(self,input):
        self.container.send_input(input)

    def set_on_message(self,callback):
        self.container.set_on_message(callback)

    def set_on_start(self,callback):
        self.container.set_on_start(lambda : (callback(),self.__on_container_start()))

    def set_on_stop(self,callback):
        self.container.set_on_stop(lambda : (callback(),self.__on_container_stop()))

    def set_code(self,code):
        self.container.set_code(code)

    def start(self):
        with ContainerManager._lock:
            if len(self._active_containers) >= self.count_limit:
                print("Putting a container into wait queue")
                print("Current queue size: ",self._queue.qsize())
                self._queue.put(self.container)
                return
            self.__set_container_active(self.container)
        self.container.start()

    def stop(self):
        # with ContainerManager._lock:
        #     self.__set_container_inactive(self.container)
        self.container.stop() 

    def is_running(self):
        return self.container.is_running()

    def __control_thread(self):
        while len(self._active_containers)+len(self._containers) > 0:
            with self._lock:
                for container in self._active_containers:
                    if container.started is None:
                        continue
                    if time.time() - container.started > self.time_limit and container.is_running():
                        print("Control thread: Stopping a container due to time limit")
                        container.stop()
            time.sleep(2)
        pass
            #print("I'm alive :0, my name is: ",threading.currentThread().ident)


    def __set_container_active(self,container):
        ContainerManager._containers.remove(container)
        ContainerManager._active_containers.append(container)

    def __set_container_inactive(self,container):
        ContainerManager._active_containers.remove(container)
        ContainerManager._containers.append(container)

    def __check_queue(self):
        while queued_container := ContainerManager._queue.get():
            if not queued_container.should_stop:
                print("Starting a container that was in queue")
                queued_container.start()
                break

    def __on_container_stop(self):
        with ContainerManager._lock:
            if self.container in self._active_containers:
                self.__set_container_inactive(self.container)
        self.__check_queue()
      
    def __on_container_start(self):
        with ContainerManager._lock:
            if self.container not in self._active_containers:
                self.__set_container_active(self.container)
        
    def __create_container_handler(self,image_name):
        container_handler = ContainerHandler(image_name)
        container_handler.set_on_start(self.__on_container_start)
        container_handler.set_on_stop(self.__on_container_stop)
        ContainerManager._containers.append(container_handler)
        return container_handler
    
    def get_container_handler(self,image_name):
            container = self.__create_container_handler(image_name)
            with ContainerManager._start_control_thread_lock:
                self.__start_control_thread()
            return container
    
    def __start_control_thread(self):
        if self.control_thread is None or not self.control_thread.is_alive():
            ContainerManager.control_thread = threading.Thread(target=self.__control_thread)
            ContainerManager.control_thread.start()


    def __remove_container_handler(self,container):
        container.stop()
        ContainerManager._containers.remove(container)

   
class ContainerHandler():
    def __init__(self,image_name):
        super().__init__()
        self.image_name = image_name
        self.callbacks = {}
        self.should_stop = False
        self.container = None
        self.attach_socket = None
        self.log_thread = None
        self.code = ""
        self.started = None
        self.client = docker.from_env()

    def set_callback(self,callback_name,callback):
        self.callbacks[callback_name] = callback

    def set_code(self,code):
        self.code = code

    def set_on_message(self,callback):
        self.set_callback("on_message",callback)

    def set_on_start(self,callback):
        self.set_callback("on_start",callback)

    def set_on_stop(self,callback):
        self.set_callback("on_stop",callback)

    def send_input(self,input):
        command = input+"\n"
        self.attach_socket.send(command.encode())


    def is_running(self):
        if not self.container:
            return False
        try:
            self.container.reload()
            return self.container.status != 'stopped'
        except NotFound:
            return False
    
    def read_container_logs(self):
        if 'on_start' in self.callbacks:
            self.callbacks['on_start']()
            
        self.started = time.time()
        while self.is_running() and not self.should_stop:
            try:
                output = self.attach_socket.recv(1024)
                if output :
                    if self.callbacks['on_message']:
                        self.callbacks['on_message'](output.decode())
                else:
                    break
            except:
                break
            
        if 'on_stop' in self.callbacks:
            self.callbacks['on_stop']()


    def stop(self):
        self.should_stop = True
        if not self.is_running():
            print("Container is considered to be stopped")
            return
        self.container.stop()

    def start(self):
        self.should_stop = False
        self.container = self.client.containers.run(self.image_name,command=[self.code], detach=True,stdin_open=True,auto_remove=True)
        self.attach_socket = self.container.attach_socket(params={'stdin': 1, 'stdout': 1, 'stream': 1, 'logs': 1})
        self.log_thread = threading.Thread(target=self.read_container_logs)
        self.log_thread.start()
      