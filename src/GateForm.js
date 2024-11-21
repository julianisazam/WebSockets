import React, { useState } from "react"; // Importa React y el hook useState para manejar el estado local.
import { Button, TextField, Container, Typography, Box } from "@mui/material"; //Importa componentes de Material-UI para la interfaz de usuario.
import SockJS from "sockjs-client"; // Biblioteca para establecer una conexión WebSocket.
import { Stomp } from "@stomp/stompjs"; // Protocolo STOMP para enviar y recibir mensajes sobre WebSocket.

const GateForm = () => {
  // Definición de estados locales para los campos del formulario.
  const [latitude, setLatitude] = useState(""); // Estado para el campo de la puerta.
  const [longitude, setLongitude] = useState(""); // Estado para el campo de la puerta.
  const [flightCode, setFlightCode] = useState(""); // Estado para el número de vuelo.
  const [heading, setHeading] = useState(""); // Estado para el destino.
  const [speed, setSpeed] = useState(""); // Estado para la hora de salida.
  const [altitude, setAltitude] = useState(""); // Estado para el estado del vuelo.

  // Función que se ejecuta al enviar el formulario.
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento predeterminado del formulario (recargar la página).
    // Crea una conexión WebSocket usando SockJS.
    const socket = new SockJS("http://localhost:8080/air-websocket");
    const stompClient = Stomp.over(socket); // Protocolo STOMP sobre la conexión WebSocket.

    stompClient.connect({}, () => {
      // Objeto que contiene la información de la puerta a enviar.
      const flightInfo = {
        latitude,
        longitude,
        flightCode,
        heading,
        speed,
        altitude
      };
      // Envía el objeto gateInfo al servidor a través del canal '/app/updateGate'.
      stompClient.send("/app/updateFlight", {}, JSON.stringify(flightInfo));
    });
  };
  return (
    <Container maxWidth="sm">
      {/* Título del formulario */}
      <Typography variant="h4" align="center" gutterBottom>
        Update Flight Information
      </Typography>
      {/* Formulario para actualizar la información de la puerta */}
      <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 3 }}>
        {/* Campo para la puerta */}
        <TextField
          fullWidth
          label="Latitude"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)} // Actualiza el estado gate al cambiar el valor del campo.
          margin="normal"
        />
        <TextField
          fullWidth
          label="Longitude"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)} // Actualiza el estado gate al cambiar el valor del campo.
          margin="normal"
        />
        {/* Campo para el número de vuelo */}
        <TextField
          fullWidth
          label="Flight Code"
          value={flightCode}
          onChange={(e) => setFlightCode(e.target.value)} // Actualiza el estado flightNumber.
          margin="normal"
        />
        {/* Campo para el destino */}
        <TextField
          fullWidth
          label="Heading"
          value={heading}
          onChange={(e) => setHeading(e.target.value)} // Actualiza el estado destination.
          margin="normal"
        />
        {/* Campo para la hora de salida */}
        <TextField
          fullWidth
          label="speed"
          value={speed}
          onChange={(e) => setSpeed(e.target.value)} // Actualiza el estado departureTime.
          margin="normal"
        />
        {/* Campo para el estado del vuelo */}
        <TextField
          fullWidth
          label="Altitude"
          value={altitude}
          onChange={(e) => setAltitude(e.target.value)} // Actualiza el estado status.
          margin="normal"
        />
        {/* Botón para enviar el formulario */}
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Update Flight
        </Button>
      </Box>
    </Container>
  );
};
export default GateForm;
