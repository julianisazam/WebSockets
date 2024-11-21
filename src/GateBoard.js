import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import GateForm from "./GateForm";

const GateBoard = () => {
  const [flightData, setFlightData] = useState([]);
  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/air-websocket");
    const stompClient = Stomp.over(socket);

    stompClient.connect({}, () => {
      stompClient.subscribe("/topic/flights", (message) => {
        if (message.body) {
          const updatedFlight = JSON.parse(message.body);
          setFlightData((prevData) => {
            const updatedData = prevData.filter(
              (data) => data.flight !== updatedFlight.flight
            );
            return [...updatedData, updatedFlight];
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
              <TableCell>Longitude</TableCell>
              <TableCell>Flight Code</TableCell>
              <TableCell>Heading</TableCell>
              <TableCell>Speed</TableCell>
              <TableCell>Altitude</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {/* Renderizar filas dinámicas basadas en los datos del estado */}
            {flightData.map((flightInfo, index) => (
              <TableRow key={index}>
                {/* Celdas con los datos de cada puerta */}
                <TableCell>{flightInfo.latitude}</TableCell>
                <TableCell>{flightInfo.longitude}</TableCell>
                <TableCell>{flightInfo.flightCode}</TableCell>
                <TableCell>{flightInfo.heading}</TableCell>
                <TableCell>{flightInfo.speed}</TableCell>
                <TableCell>{flightInfo.altitude}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
export default GateBoard;
