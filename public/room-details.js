const students = [
    {name:"Deva", room:101, floor:2, type:"Double", status:"Allocated"},
    {name:"Rahul", room:101, floor:2, type:"Double", status:"Allocated"},

    {name:"Bindu", room:102, floor:2, type:"Single", status:"Allocated"},

    {name:"Akhila", room:103, floor:2, type:"Double", status:"Allocated"},
    {name:"Keerthi", room:103, floor:2, type:"Double", status:"Allocated"},

    {name:"Kundana", room:104, floor:2, type:"Single", status:"Allocated"},

    {name:"Jayasree", room:105, floor:2, type:"Double", status:"Allocated"},
    {name:"Pooja", room:105, floor:2, type:"Double", status:"Allocated"},

    {name:"Janu", room:106, floor:3, type:"Single", status:"Allocated"},

    {name:"Suresh", room:107, floor:3, type:"Double", status:"Allocated"},
    {name:"Ravi", room:107, floor:3, type:"Double", status:"Allocated"}
];

const studentTable = document.getElementById("studentTable");

students.forEach(student => {
    studentTable.innerHTML += `
        <tr onclick="showDetails('${student.name}')" style="cursor:pointer;">
            <td>${student.name}</td>
            <td>${student.room}</td>
            <td>${student.floor}</td>
            <td>${student.type}</td>
            <td>${student.status}</td>
        </tr>
    `;
});

function showDetails(studentName) {

    const student = students.find(s => s.name === studentName);

    let partner = "No Partner";

    if (student.type === "Double") {
        const partnerStudent = students.find(
            s => s.room === student.room && s.name !== student.name
        );

        if (partnerStudent) {
            partner = partnerStudent.name;
        }
    }

    alert(
        "Student Name: " + student.name + "\n" +
        "Room No: " + student.room + "\n" +
        "Floor: " + student.floor + "\n" +
        "Room Type: " + student.type + "\n" +
        "Partner: " + partner + "\n" +
        "Status: " + student.status
    );
}