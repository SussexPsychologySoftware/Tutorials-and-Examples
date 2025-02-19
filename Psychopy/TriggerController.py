# More complete implementation of simple function found in Triggers.py
import serial
from typing import Union, Tuple, Callable

class TriggerController:
    def __init__(self, port: str, baudrate: int = 9600):
        self.bitmask = 0
        try:
            self.port = serial.Serial(port, baudrate=baudrate, timeout=1)
            self.port.write('RR'.encode())  # Reset port on startup
        except serial.SerialException as e:
            raise RuntimeError(f"Failed to open serial port {port}: {e}")

    def _validate_lines(self, lines: tuple[int, ...]) -> None:
        """Validate line numbers."""
        for line in lines:
            if not isinstance(line, int):
                raise ValueError(f"Invalid line number type: {type(line)}")
            if line < 0 or line > 8:
                raise ValueError(f"Invalid line number: {line}")

    def _update_and_send(self, lines: tuple[int, ...], bit_operation: Callable[[int, int], int]) -> None:
        """Update bitmask using the provided bit operation and send to serial port."""
        if not self.port.is_open:
            raise RuntimeError("Serial port is not open")

        if 0 in lines:
            self.bitmask = 0
        
        self._validate_lines(lines)
        
        for line in lines:
            if line != 0:
                self.bitmask = bit_operation(self.bitmask, line)

        try:
            hex_value = format(self.bitmask, '02x')
            self.port.write(hex_value.encode())
        except serial.SerialException as e:
            raise RuntimeError(f"Failed to write to serial port: {e}")

    def open(self, *lines: int) -> None:
        """
        Open (activate) specified digital output lines.
        Use line number 0 to first reset all lines.
        
        Args:
            *lines: Line numbers (1-8) to open. Use 0 to reset all lines first.
        """
        self._update_and_send(lines, lambda bm, line: bm | (1 << (line-1)))

    def close(self, *lines: int) -> None:
        """
        Close (deactivate) specified digital output lines.
        Use line number 0 to close all lines.
        
        Args:
            *lines: Line numbers (1-8) to close. Use 0 to close all lines.
        """
        self._update_and_send(lines, lambda bm, line: bm & ~(1 << (line-1)))

    def shutdown(self):
        """Close the serial port and reset all lines."""
        if self.port.is_open:
            self.port.write('RR'.encode())  # Reset port on shutdown
            self.close(0)  # Close all lines
            self.port.close()

    def __del__(self):
        self.shutdown()



if __name__ == "__main__":
    controller = TriggerController('COM4')
    try:
        controller.open(1)        # open line 1
        controller.open(2, 3, 7)  # also open lines 2, 3, and 7
        controller.close(1, 2)    # close lines 1 and 2
        controller.open(0, 3, 4) # Closes everything EXCEPT 3 and 4, which are opened
        controller.close(0)       # close all lines
    finally:
        controller.shutdown()     # close all lines and serial port