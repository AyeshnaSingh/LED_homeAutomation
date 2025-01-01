// Import the SerialPort class from the 'serialport' module
const { SerialPort } = require('serialport');

// Create SerialPort object to communicate with Arduino
const arduinoPort = new SerialPort({
  path: 'COM4',  // port on which communication will take place
  baudRate: 9600,  // Baud rate for communication
});

// Event listener when the serial port is opened
arduinoPort.on('open', () => {
  console.log('Serial port is open');
});

// Event listener to capture any data sent from the Arduino
arduinoPort.on('data', (data) => {
  console.log('Data from Arduino:', data.toString());
});

const express = require('express');
const app = express();
const port = 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Route for toggling the LED
app.get('/toggle-device', (req, res) => {
  // Send data to Arduino to toggle the device
  arduinoPort.write('TOGGLE_DEVICE\n', (err) => {
    if (err) {
      return console.log('Error on write:', err.message);
    }
    console.log('Device toggled');
  });
  res.json({ status: 'Device toggled successfully' });
});

// Start the web server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
