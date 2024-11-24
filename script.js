document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("recruit-form");
    const membersList = document.getElementById("members");

    // Pokazuje opcje broni dla DPS
    document.getElementById("role").addEventListener("change", function () {
        const dpsOptions = document.getElementById("dps-options");
        if (this.value === "dps") {
            dpsOptions.style.display = "block";
        } else {
            dpsOptions.style.display = "none";
        }
    });

    // Wczytanie członków z LocalStorage, jeśli istnieją
    const loadMembers = () => {
        const members = JSON.parse(localStorage.getItem("members")) || [];
        membersList.innerHTML = ''; // Wyczyść listę przed załadowaniem nowych danych
        members.forEach(member => {
            displayMember(member);
        });
    };

    // Funkcja do wyświetlania członka na stronie
    const displayMember = (member) => {
        const memberInfo = document.createElement("li");
        memberInfo.classList.add(`role-${member.role}`);

        // Przypisanie ikony roli
        const roleIcon = member.role === "tank" ? '🛡️' : member.role === "healer" ? '💖' : '⚔️';
        const status = member.status; // Status można zmieniać na podstawie daty do obliczeń
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

    // Obsługuje dodawanie członków do listy
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Pobiera dane z formularza
        const nickname = document.getElementById("nickname").value;
        const role = document.getElementById("role").value;
        const discord = document.getElementById("discord").value;
        let weapon = '';

        if (role === "dps") {
            weapon = document.getElementById("dps-weapon").value;
        }

        // Określenie statusu członka (nowy, starszy członek itp.)
        const status = "Nowy członek"; // Możesz tu zmieniać status na podstawie czasu od dodania

        // Tworzenie obiektu dla członka
        const newMember = {
            nickname: nickname,
            role: role,
            discord: discord,
            weapon: weapon,
            status: status
        };

        // Pobiera istniejących członków z LocalStorage
        const existingMembers = JSON.parse(localStorage.getItem("members")) || [];

        // Dodaje nowego członka do istniejącej listy
        existingMembers.push(newMember);

        // Zapisuje zaktualizowaną listę członków do LocalStorage
        localStorage.setItem("members", JSON.stringify(existingMembers));

        // Wyświetlanie nowego członka na stronie
        displayMember(newMember);

        // Resetowanie formularza po dodaniu
        form.reset();
    });

    // Wczytanie członków, gdy strona jest załadowana
    loadMembers();
});
