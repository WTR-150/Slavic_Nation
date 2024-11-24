document.getElementById('recruitment-form').addEventListener('submit', function (e) {
    e.preventDefault();

    const nickname = document.getElementById('nickname').value;
    const discord = document.getElementById('discord').value;
    const role = document.getElementById('role').value;

    const member = { nickname, discord, role };
    addMemberToList(member);

    saveMember(member);
    e.target.reset();
});

function addMemberToList(member) {
    const list = document.getElementById('members');
    const item = document.createElement('li');
    item.textContent = `${member.nickname} (${member.discord}) - ${member.role}`;
    list.appendChild(item);
}

function saveMember(member) {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    members.push(member);
    localStorage.setItem('members', JSON.stringify(members));
}

function loadMembers() {
    const members = JSON.parse(localStorage.getItem('members')) || [];
    members.forEach(addMemberToList);
}

loadMembers();
