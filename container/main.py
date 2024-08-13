
import time
import sys
import os


if __name__ == "__main__":
    print("program started")
    try:
        print("trying to execute 1 arg")
        time.sleep(5)
        exec(sys.argv[1])
    
    except Exception as e:
        print(f"Error during execution: {e}", file=sys.stderr)
 


  

  
    