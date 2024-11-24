document.addEventListener('DOMContentLoaded', () => {
    // Ładowanie zapisanych danych (jeśli istnieją)
    loadMembersList();

    // Form Submission
    document.getElementById('joinForm').addEventListener('submit', function (e) {
        e.preventDefault();

        // Pobierz dane z formularza
        const nickname = document.getElementById('nickname').value.trim();
        const role = document.getElementById('role').value;
        const discord = document.getElementById('discord').value.trim();
        const weapon = document.getElementById('weapon') ? document.getElementById('weapon').value : '';

        // Sprawdzanie, czy użytkownik wypełnił wszystkie wymagane pola
        if (!nickname || !role || !discord || (role === 'dps' && !weapon)) {
            alert('Wszystkie pola są wymagane!');
            return;
        }

        // Zapisz dane w localStorage
        const newMember = { nickname, role, discord, weapon };
        const existingMembers = JSON.parse(localStorage.getItem('members')) || [];

        // Sprawdzenie, czy dany użytkownik już istnieje
        if (existingMembers.some(member => member.nickname === nickname)) {
            alert('Już dołączyłeś do Slavic Nation!');
            return;
        }

        // Dodanie nowego członka do listy
        existingMembers.push(newMember);
        localStorage.setItem('members', JSON.stringify(existingMembers));

        // Dodaj członka do listy na stronie
        addMemberToList(newMember);

        // Reset formularza
        document.getElementById('joinForm').reset();
    });

    // Pokaż broń tylko dla DPS
    document.getElementById('role').addEventListener('change', function (e) {
        const weaponSelect = document.getElementById('dps-weapons');
        if (e.target.value === 'dps') {
            weaponSelect.style.display = 'block';
        } else {
            weaponSelect.style.display = 'none';
        }
    });
});

// Funkcja do ładowania członków z localStorage
function loadMembersList() {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    members.forEach(member => addMemberToList(member));
}

// Funkcja do dodawania członka do listy
function addMemberToList(member) {
    const memberList = document.getElementById('members');
    const listItem = document.createElement('li');

    // Ikona roli
    let roleIcon = '';
    let roleClass = '';
    switch (member.role) {
        case 'tank':
            roleIcon = '🛡️';
            roleClass = 'role-tank';
            break;
        case 'healer':
            roleIcon = '💉';
            roleClass = 'role-healer';
            break;
        case 'dps':
            roleIcon = '⚔️';
            roleClass = 'role-dps';
            break;
        default:
            roleClass = '';
    }

    listItem.classList.add(roleClass);
    listItem.innerHTML = `${member.nickname} (Discord: ${member.discord}) - Rola: ${member.role} ${roleIcon} ${member.weapon ? `| Broń: ${member.weapon}` : ''}`;
    memberList.appendChild(listItem);
}
