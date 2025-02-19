import serial #Import the serial library
port = serial.Serial('COM4') #Change 'COM3' here to your serial port address

bitmask = 0 # Need this var globally to track open channels
def trigger(*lines, close=False):
    # include 0 in lines to close everything (except those sepcified)
    # use close=True to close specified lines, default is to open listed lines
    global bitmask
    if 0 in lines:
        bitmask = 0
       
    for line in lines:
        if line != 0:
            if close:
               bitmask &= (0 << (line-1))
            else:
                bitmask |= (1 << (line-1)) #add 1 in index of line, and OR with bitmask
    #convert to hex
    hexValue = format(bitmask, '02x')
    port.write(hexValue.encode()) # Change port to whatever your port is

#e.g.
trigger(1) # open 1
trigger(1,2,3,7) # 1 remains open
trigger(1,2, close=True) # closes 1 and 2 only