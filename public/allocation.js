async function allocateRoom() {
    const studentName = document.getElementById("studentName").value;
    const roomNumber = document.getElementById("roomNumber").value;

    if (!studentName || !roomNumber) {
        return;
    }

    try {
        await fetch("/allocate-room", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                studentName,
                roomNumber
            })
        });

        document.getElementById("studentName").value = "";
        document.getElementById("roomNumber").value = "";

        loadAllocations();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// LOAD ALLOCATIONS
// =====================
async function loadAllocations() {
    try {
        const response = await fetch("/allocations");
        const allocations = await response.json();

        let html = "";

        allocations.forEach(item => {
            html += `
                <tr>
                    <td>${item.studentName}</td>
                    <td>${item.roomNumber}</td>
                    <td>${item.status}</td>
                    <td>
                        <button class="change-btn" onclick="changeRoom('${item._id}')">
                            Change
                        </button>

                        <button class="vacate-btn" onclick="vacateRoom('${item._id}')">
                            Vacate
                        </button>

                        <button class="delete-btn" onclick="deleteAllocation('${item._id}')">
                            Delete
                        </button>
                    </td>
                </tr>
            `;
        });

        document.getElementById("allocationTable").innerHTML = html;

    } catch (error) {
        console.log(error);
    }
}


// =====================
// CHANGE ROOM (NO PROMPT)
// =====================
async function changeRoom(id, newRoom) {
    if (!newRoom) return;

    try {
        await fetch(`/change-room/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                roomNumber: newRoom
            })
        });

        loadAllocations();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// DELETE ALLOCATION (NO CONFIRM)
// =====================
async function deleteAllocation(id) {
    try {
        await fetch("/delete-allocation/" + id, {
            method: "DELETE"
        });

        loadAllocations();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// VACATE (IF API EXISTS)
// =====================
async function vacateRoom(id) {
    try {
        await fetch(`/vacate-room/${id}`, {
            method: "PUT"
        });

        loadAllocations();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// INIT
// =====================
loadAllocations();