async function loadRooms() {
    try {
        const response = await fetch("/rooms");
        const rooms = await response.json();

        let output = "";

        rooms.forEach(room => {
            output += `
                <tr>
                    <td>${room.roomNumber}</td>
                    <td>${room.floorNumber}</td>
                    <td>${room.roomType}</td>
                    <td>${room.capacity}</td>
                    <td>${room.status}</td>
                    <td>
                        <button onclick="deleteRoom('${room._id}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        document.getElementById("roomTableBody").innerHTML = output;

    } catch (error) {
        console.log(error);
    }
}


// =====================
// DELETE ROOM
// =====================
async function deleteRoom(id) {
    try {
        await fetch(`/rooms/${id}`, {
            method: "DELETE"
        });

        loadRooms();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// PAGE LOAD
// =====================
loadRooms();