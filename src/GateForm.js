import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado local.
import { Button, TextField, Container, Typography, Box } from '@mui/material'; //Importa componentes de Material-UI para la interfaz de usuario.
import SockJS from 'sockjs-client'; // Biblioteca para establecer una conexión WebSocket.
import { Stomp } from '@stomp/stompjs'; // Protocolo STOMP para enviar y recibir mensajes sobre WebSocket.

const GateForm = () => {
// Definición de estados locales para los campos del formulario.
    const [gate, setGate] = useState(''); // Estado para el campo de la puerta.
    const [flightNumber, setFlightNumber] = useState(''); // Estado para el número de vuelo.
    const [destination, setDestination] = useState(''); // Estado para el destino.
    const [departureTime, setDepartureTime] = useState(''); // Estado para la hora de salida.
    const [status, setStatus] = useState(''); // Estado para el estado del vuelo.

// Función que se ejecuta al enviar el formulario.
    const handleSubmit = (e) => {
        e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página).
// Crea una conexión WebSocket usando SockJS.
    const socket = new SockJS('http://localhost:8080/gs-guide-websocket');
    const stompClient = Stomp.over(socket); // Protocolo STOMP sobre la conexión WebSocket.

        stompClient.connect({}, () => {
// Objeto que contiene la información de la puerta a enviar.
        const gateInfo = {
gate,
flightNumber,
destination,
departureTime,
status,
};
// Envía el objeto gateInfo al servidor a través del canal '/app/updateGate'.
stompClient.send('/app/updateGate', {}, JSON.stringify(gateInfo));
});
};
return (
<Container maxWidth="sm">
{/* Título del formulario */}
<Typography variant="h4" align="center" gutterBottom>
Update Gate Information
</Typography>
{/* Formulario para actualizar la información de la puerta */}
<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
{/* Campo para la puerta */}
<TextField
fullWidth
label="Gate"
value={gate}
onChange={(e) => setGate(e.target.value)} // Actualiza el estado gate al cambiar el valor del campo.
margin="normal"
/>
{/* Campo para el número de vuelo */}
<TextField

fullWidth
label="Flight Number"
value={flightNumber}
onChange={(e) => setFlightNumber(e.target.value)} // Actualiza el estado flightNumber.
margin="normal"
/>
{/* Campo para el destino */}
<TextField
fullWidth
label="Destination"
value={destination}
onChange={(e) => setDestination(e.target.value)} // Actualiza el estado destination.
margin="normal"
/>
{/* Campo para la hora de salida */}
<TextField
fullWidth
label="Departure Time"
value={departureTime}
onChange={(e) => setDepartureTime(e.target.value)} // Actualiza el estado departureTime.
margin="normal"
/>
{/* Campo para el estado del vuelo */}
<TextField
fullWidth
label="Status"
value={status}
onChange={(e) => setStatus(e.target.value)} // Actualiza el estado status.
margin="normal"
/>
{/* Botón para enviar el formulario */}
<Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
Update Gate
</Button>
</Box>
</Container>
);
};
export default GateForm;