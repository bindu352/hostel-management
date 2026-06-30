const complaintForm = document.getElementById("complaintForm");
const complaintTableBody = document.getElementById("complaintTableBody");

// =====================
// CREATE COMPLAINT
// =====================
complaintForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const complaintData = {
        complaintTitle: document.getElementById("complaintTitle").value,
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value
    };

    try {
        await fetch("http://127.0.0.1:3000/complaints", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(complaintData)
        });

        complaintForm.reset();
        loadComplaints();

    } catch (error) {
        console.log(error);
    }
});


// =====================
// UPDATE STATUS
// =====================
async function updateStatus(id, status) {
    try {
        await fetch(`http://127.0.0.1:3000/complaints/${id}/status`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ status })
        });

        loadComplaints();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// LOAD COMPLAINTS
// =====================
async function loadComplaints() {
    try {
        const response = await fetch("http://127.0.0.1:3000/complaints");
        const complaints = await response.json();

        complaintTableBody.innerHTML = "";

        complaints.forEach(c => {
            complaintTableBody.innerHTML += `
                <tr>
                    <td>${c.complaintTitle}</td>
                    <td>${c.category}</td>
                    <td>${c.description}</td>
                    <td>${c.priority}</td>
                    <td>
                        <select onchange="updateStatus('${c._id}', this.value)">
                            <option value="Pending" ${c.status === "Pending" ? "selected" : ""}>Pending</option>
                            <option value="In Progress" ${c.status === "In Progress" ? "selected" : ""}>In Progress</option>
                            <option value="Resolved" ${c.status === "Resolved" ? "selected" : ""}>Resolved</option>
                            <option value="Rejected" ${c.status === "Rejected" ? "selected" : ""}>Rejected</option>
                            <option value="Closed" ${c.status === "Closed" ? "selected" : ""}>Closed</option>
                        </select>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}


// Initial Load
loadComplaints();