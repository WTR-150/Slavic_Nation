// Pobieranie elementów formularza
document.getElementById('joinForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Pobierz dane z formularza
    const nickname = document.getElementById('nickname').value;
    const role = document.getElementById('role').value;
    const discord = document.getElementById('discord').value;
    const weapon = document.getElementById('weapon') ? document.getElementById('weapon').value : '';

    // Sprawdź, czy wszystkie wymagane dane zostały wypełnione
    if (!nickname || !role || !discord || (role === 'dps' && !weapon)) {
        alert('Wszystkie pola są wymagane!');
        return;
    }

    // Dodanie ikony roli
    let roleIcon = '';
    let roleClass = '';
    switch (role) {
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

    // Dodaj członka do listy
    const memberList = document.getElementById('members');
    const listItem = document.createElement('li');
    listItem.classList.add(roleClass);
    listItem.innerHTML = `${nickname} (Discord: ${discord}) - Rola: ${role} ${roleIcon} ${weapon ? `| Broń: ${weapon}` : ''}`;

    // Dodaj element do listy członków
    memberList.appendChild(listItem);

    // Wyczyść formularz
    document.getElementById('joinForm').reset();
});

// Pokazanie pól broni tylko dla DPS
document.getElementById('role').addEventListener('change', function (e) {
    const weaponSelect = document.getElementById('dps-weapons');
    if (e.target.value === 'dps') {
        weaponSelect.style.display = 'block';
    } else {
        weaponSelect.style.display = 'none';
    }
});
