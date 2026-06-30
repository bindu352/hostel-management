const messForm = document.getElementById("messForm");
const messTableBody = document.getElementById("messTableBody");

// =====================
// ADD MENU
// =====================
messForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const menuData = {
        day: document.getElementById("day").value,
        breakfast: document.getElementById("breakfast").value,
        lunch: document.getElementById("lunch").value,
        dinner: document.getElementById("dinner").value
    };

    try {
        await fetch("/mess", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(menuData)
        });

        messForm.reset();
        loadMenu();

    } catch (error) {
        console.log(error);
    }
});


// =====================
// LOAD MENU
// =====================
async function loadMenu() {
    try {
        const response = await fetch("/mess");
        const menus = await response.json();

        messTableBody.innerHTML = "";

        menus.forEach(menu => {
            messTableBody.innerHTML += `
                <tr>
                    <td>${menu.day}</td>
                    <td>${menu.breakfast}</td>
                    <td>${menu.lunch}</td>
                    <td>${menu.dinner}</td>
                    <td>
                        <button onclick="editMenu('${menu._id}')">Edit</button>
                        <button onclick="deleteMenu('${menu._id}')">Delete</button>
                    </td>
                </tr>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}


// =====================
// DELETE MENU
// =====================
async function deleteMenu(id) {
    try {
        await fetch(`/mess/${id}`, {
            method: "DELETE"
        });

        loadMenu();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// EDIT MENU
// =====================
async function editMenu(id) {
    const day = prompt("Enter Day");
    const breakfast = prompt("Enter Breakfast");
    const lunch = prompt("Enter Lunch");
    const dinner = prompt("Enter Dinner");

    if (!day || !breakfast || !lunch || !dinner) {
        return;
    }

    try {
        await fetch(`/mess/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ day, breakfast, lunch, dinner })
        });

        loadMenu();

    } catch (error) {
        console.log(error);
    }
}


// Initial Load
loadMenu();