import React, { useState, useEffect } from 'react';
import SockJS from 'sockjs-client'; 
import { Stomp } from '@stomp/stompjs'; 
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper }
from '@mui/material'; 
import GateForm from './GateForm'; 


const GateBoard = () => {

const [gateData, setGateData] = useState([]);
useEffect(() => {

const socket = new SockJS('http://localhost:8080/air-websocket');
const stompClient = Stomp.over(socket); 

stompClient.connect({}, () => {

stompClient.subscribe('/topic/gates', (message) => {
if (message.body) {
const updatedGate = JSON.parse(message.body); 
setGateData(prevData => {

const updatedData = prevData.filter(data => data.gate !== updatedGate.gate);
return [...updatedData, updatedGate]; 
});
}
});
});

return () => {
stompClient.disconnect();
};
}, []); 
return (
<div>
{/* Renderizar el formulario para gestionar datos de puertas */}
<GateForm />
{/* Contenedor de la tabla con los datos de las puertas */}
<TableContainer component={Paper} sx={{ mt: 3 }}>
<Table>
<TableHead>
<TableRow>
{/* Encabezados de la tabla */}
<TableCell>Latitude</TableCell>
<TableCell>Flight Number</TableCell>
<TableCell>Heading</TableCell>
<TableCell>AirSpeed</TableCell>
<TableCell>altitude</TableCell>
</TableRow>
</TableHead>
<TableBody>
{/* Renderizar filas dinámicas basadas en los datos del estado */}
{gateData.map((gateInfo, index) => (
<TableRow key={index}>
{/* Celdas con los datos de cada puerta */}
<TableCell>{gateInfo.latitude}</TableCell>

<TableCell>{gateInfo.flightNumber}</TableCell>
<TableCell>{gateInfo.heading}</TableCell>
<TableCell>{gateInfo.airSpeed}</TableCell>
<TableCell>{gateInfo.altitude}</TableCell>
</TableRow>
))}
</TableBody>
</Table>
</TableContainer>
</div>
);
};
export default GateBoard;