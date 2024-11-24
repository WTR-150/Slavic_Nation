// Funkcja do wyświetlania członka na stronie
const displayMember = (member) => {
    const membersList = document.getElementById("members");
    const memberInfo = document.createElement("li");
    memberInfo.classList.add(`role-${member.role}`);

    // Ikona roli (tank, healer, dps)
    const roleIcon = member.role === "tank" ? '🛡️' : member.role === "healer" ? '💖' : '⚔️';
    const status = member.status; // Status członka

    // Wyświetlanie danych
    memberInfo.innerHTML = `
        <span class="nickname">${member.nickname} (${status})</span><br>
        Rola: ${member.role} <br>
        ${member.role === "dps" ? `Broń: ${member.weapon}` : ''} <br>
        Discord: ${member.discord}
    `;

    // Dodanie ikony przed nickiem
    const memberIcon = document.createElement("span");
    memberIcon.textContent = roleIcon;
    memberInfo.prepend(memberIcon);

    // Dodanie członka do listy
    membersList.appendChild(memberInfo);
};

// Funkcja do wczytywania członków z LocalStorage
const loadMembers = () => {
    const members = JSON.parse(localStorage.getItem("members")) || [];
    const membersList = document.getElementById("members");

    // Jeśli są członkowie, wczytujemy ich na stronę
    if (members.length > 0) {
        members.forEach(member => {
            displayMember(member);
        });
    } else {
        membersList.innerHTML = "Brak członków.";
    }
};

// Funkcja do dodawania nowego członka
const addMember = (nickname, role, discord, weapon) => {
    const status = "Nowy członek"; // Można później dodać obliczanie czasu członkostwa

    const newMember = {
        nickname: nickname,
        role: role,
        discord: discord,
        weapon: weapon,
        status: status
    };

    // Pobiera istniejących członków z LocalStorage
    const existingMembers = JSON.parse(localStorage.getItem("members")) || [];

    // Dodaje nowego członka do listy
    existingMembers.push(newMember);

    // Zapisuje zaktualizowaną listę do LocalStorage
    localStorage.setItem("members", JSON.stringify(existingMembers));

    // Wyświetla nowego członka na stronie
    displayMember(newMember);
};
