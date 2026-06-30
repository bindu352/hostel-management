const eventForm = document.getElementById("eventForm");
const eventsList = document.getElementById("eventsList");

// =====================
// CREATE EVENT
// =====================
eventForm.addEventListener("submit", async function(e) {
    e.preventDefault();

    const eventData = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value,
        time: document.getElementById("time").value,
        venue: document.getElementById("venue").value
    };

    try {
        await fetch("/events", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(eventData)
        });

        eventForm.reset();
        loadEvents();

    } catch (error) {
        console.log(error);
    }
});


// =====================
// LOAD EVENTS
// =====================
async function loadEvents() {
    try {
        const response = await fetch("/events");
        const events = await response.json();

        eventsList.innerHTML = "";

        events.forEach(event => {
            eventsList.innerHTML += `
                <div class="event-card">
                    <h3>${event.title}</h3>
                    <p><b>Description:</b> ${event.description}</p>
                    <p><b>Date:</b> ${event.date}</p>
                    <p><b>Time:</b> ${event.time}</p>
                    <p><b>Venue:</b> ${event.venue}</p>

                    <button class="delete-btn"
                        onclick="deleteEvent('${event._id}')">
                        Delete
                    </button>
                </div>
            `;
        });

    } catch (error) {
        console.log(error);
    }
}


// =====================
// DELETE EVENT
// =====================
async function deleteEvent(id) {
    try {
        await fetch(`/events/${id}`, {
            method: "DELETE"
        });

        loadEvents();

    } catch (error) {
        console.log(error);
    }
}


// =====================
// INIT
// =====================
loadEvents();