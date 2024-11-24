// Przechowywanie członków w localStorage
const rekrutacjaForm = document.getElementById("rekrutacjaForm");
const czlonkowieLista = document.getElementById("czlonkowieLista").getElementsByTagName("tbody")[0];

// Funkcja, aby dodać członka do listy
function addMemberToList(member) {
    const row = czlonkowieLista.insertRow();
    row.innerHTML = `
        <td>${member.nick}</td>
        <td>${member.discord}</td>
        <td>${member.rola}</td>
    `;
}

// Zapisz nowego członka do localStorage
function saveMember(member) {
    let members = JSON.parse(localStorage.getItem("members")) || [];
    members.push(member);
    localStorage.setItem("members", JSON.stringify(members));
}

// Załaduj członków z localStorage
function loadMembers() {
    let members = JSON.parse(localStorage.getItem("members")) || [];
    members.forEach(addMemberToList);
}

// Obsługuje submit formularza
rekrutacjaForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const nick = document.getElementById("nick").value;
    const discord = document.getElementById("discord").value;
    const rola = document.getElementById("rola").value;

    const newMember = { nick, discord, rola };
    
    // Zapisz i dodaj do listy
    saveMember(newMember);
    addMemberToList(newMember);

    // Wyczyść formularz
    rekrutacjaForm.reset();
});

// Załaduj członków przy załadowaniu strony
window.onload = loadMembers;
