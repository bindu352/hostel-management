const feeForm = document.getElementById("feeForm");
const feeTableBody = document.getElementById("feeTableBody");

// =====================
// ADD FEE
// =====================
feeForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const feeData = {
        studentName: document.getElementById("studentName").value,
        roomNo: document.getElementById("roomNo").value,
        feeType: document.getElementById("feeType").value,
        amount: document.getElementById("amount").value,
        dueDate: document.getElementById("dueDate").value
    };

    try {
        const response = await fetch("/fees", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(feeData)
        });

        await response.json();

        feeForm.reset();
        loadFees();

    } catch (error) {
        console.log(error);
    }
});


// =====================
// LOAD FEES
// =====================
async function loadFees() {
    try {
        const response = await fetch("/fees");
        const fees = await response.json();

        feeTableBody.innerHTML = "";

        fees.forEach(fee => {
            feeTableBody.innerHTML += `
                <tr>
                    <td>${fee.studentName}</td>
                    <td>${fee.roomNo}</td>
                    <td>${fee.feeType}</td>
                    <td>${fee.amount}</td>
                    <td>${fee.dueDate}</td>
                    <td>${fee.status}</td>
                    <td>
                        <button onclick="payFee('${fee._id}')">Pay</button>
                        <button onclick="deleteFee('${fee._id}')">Delete</button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}


// =====================
// PAY FEE
// =====================
async function payFee(id) {
    try {
        await fetch(`/fees/pay/${id}`, {
            method: "PUT"
        });

        loadFees();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// DELETE FEE
// =====================
async function deleteFee(id) {
    try {
        await fetch(`/fees/${id}`, {
            method: "DELETE"
        });

        loadFees();

    } catch (error) {
        console.log(error);
    }
}


// Initial Load
loadFees();