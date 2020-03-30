const URL = "ws://localhost:8083"

const ws = new WebSocket(URL)

ws.onopen = () => {
    connection.send('Ping');
}