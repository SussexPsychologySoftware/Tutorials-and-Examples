import serial #Import the serial library
port = serial.Serial('COM4') #Change 'COM3' here to your serial port address

bitmask = 0 # Need this var globally to track open channels
def trigger(*lines, close=False):
    # include 0 in lines to close everything (except those sepcified)
    # use close=True to close specified lines, default is to open listed lines
    global bitmask
    if 0 in lines:
        bitmask = 0
    
    # bitmask is 00000000 when all lines are closed, and e.g. 01000000 when line 2 is open, 01000001 for lines 2 and 8 open
    for line in lines:
        if line != 0:
            if close:
               bitmask &= (0 << (line-1)) # set to 0 and AND with bitmask to close line
            else:
                bitmask |= (1 << (line-1)) #add 1 in index of line, and OR with bitmask to open line
    #convert to hex
    hexValue = format(bitmask, '02x')
    port.write(hexValue.encode()) # Change port to whatever your port is

#e.g.
trigger(1) # open 1
trigger(1,2,3,7) # 1 remains open
trigger(1,2, close=True) # closes 1 and 2 only