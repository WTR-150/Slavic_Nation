document.getElementById('role').addEventListener('change', function(event) {
    const dpsOptions = document.getElementById('dps-options');
    if (event.target.value === 'dps') {
        dpsOptions.style.display = 'block';
    } else {
        dpsOptions.style.display = 'none';
    }
});

document.getElementById('recruit-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nickname = document.getElementById('nickname').value;
    const role = document.getElementById('role').value;
    const discord = document.getElementById('discord').value;
    const weapon = role === 'dps' ? document.getElementById('dps-weapon').value : 'Brak';

    // Prześlij dane do backendu
    await fetch('http://localhost:3000/members', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nickname, role, discord, weapon })
    });

    // Pobierz aktualną listę członków
    loadMembers();
});

// Funkcja do pobierania członków z serwera
async function loadMembers() {
    const response = await fetch('http://localhost:3000/members');
    const members = await response.json();
    const membersList = document.getElementById('members-list');
    membersList.innerHTML = '';
    members.forEach(member => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${member.nickname}</span> - ${member.role} - ${member.discord} - Broń: ${member.weapon}`;
        membersList.appendChild(li);
    });
}

// Załaduj członków przy załadowaniu strony
loadMembers();
