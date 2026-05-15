const state = {
  groups: [],
  filteredGeneration: 0,
  token: localStorage.getItem('kpopToken') || '',
};

const colors = ['gen-1', 'gen-2', 'gen-3', 'gen-4'];

const pages = document.querySelectorAll('.page');
const navButtons = document.querySelectorAll('[data-page]');
const loginLink = document.getElementById('login-link');
const searchInput = document.getElementById('search-input');
const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

function showPage(page) {
  pages.forEach((item) => item.classList.toggle('active', item.id === `page-${page}`));
  document.querySelectorAll('.nav-links button').forEach((item) => {
    item.classList.toggle('active', item.dataset.page === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function authHeaders() {
  return state.token ? { Authorization: `Bearer ${state.token}` } : {};
}

async function login(username, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  const payload = await response.json();

  if (!response.ok || !payload.ok) {
    throw new Error(payload.message || 'Nao foi possivel entrar.');
  }

  state.token = payload.token;
  localStorage.setItem('kpopToken', payload.token);
  loginLink.textContent = 'Online';
  loginMessage.textContent = 'Login realizado com sucesso.';
  await loadGroups();
  showPage('groups');
}

async function loadGroups() {
  if (!state.token) {
    renderLockedState();
    return;
  }

  try {
    const response = await fetch('/api/groups', { headers: authHeaders() });
    const payload = await response.json();

    if (!response.ok || !payload.ok) {
      throw new Error(payload.message || 'Nao foi possivel carregar os grupos.');
    }

    state.groups = payload.data;
    updateStats();
    renderFeatured();
    renderGroups();
    renderMembers();
  } catch (error) {
    if (error.message.toLowerCase().includes('token')) {
      localStorage.removeItem('kpopToken');
      state.token = '';
      loginLink.textContent = 'Login';
    }
    renderMessage('groups-grid', error.message);
    renderMessage('featured-groups', 'Entre novamente para carregar os grupos.');
    renderMessage('members-cloud', 'Entre novamente para visualizar os membros.');
  }
}

function updateStats() {
  const total = state.groups.length;
  const byGeneration = (generation) => state.groups.filter((group) => group.generation === generation).length;

  document.getElementById('hero-count').textContent = total || '--';
  document.getElementById('groups-count').textContent = `${total} groups`;
  document.getElementById('stat-total').textContent = total;
  document.getElementById('stat-g1').textContent = byGeneration(1);
  document.getElementById('stat-g3').textContent = byGeneration(3);
  document.getElementById('stat-g4').textContent = byGeneration(4);
}

function renderFeatured() {
  const container = document.getElementById('featured-groups');
  container.innerHTML = '';

  state.groups.slice(0, 10).forEach((group) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'featured-card';
    card.innerHTML = `
      <span class="featured-visual">
        <span class="featured-figure ${colorClass(group.generation)}"></span>
      </span>
      <strong>${escapeHtml(group.name)}</strong>
    `;
    card.addEventListener('click', () => showDetail(group));
    container.appendChild(card);
  });
}

function renderGroups() {
  const container = document.getElementById('groups-grid');
  const term = searchInput.value.trim().toLowerCase();
  const groups = state.groups.filter((group) => {
    const matchesTerm = [group.name, group.fandom, String(group.debutYear)]
      .some((value) => value.toLowerCase().includes(term));
    const matchesGeneration = !state.filteredGeneration || group.generation === state.filteredGeneration;
    return matchesTerm && matchesGeneration;
  });

  container.innerHTML = '';

  if (!groups.length) {
    renderMessage('groups-grid', 'Nenhum grupo encontrado.');
    return;
  }

  groups.forEach((group, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = 'group-card';
    card.innerHTML = `
      <small>${String(index + 1).padStart(2, '0')}</small>
      <strong>${escapeHtml(group.name)}</strong>
      <span>${escapeHtml(group.fandom)}</span>
      <div class="card-meta">
        <span>${group.debutYear}</span>
        <i class="gen-dot ${colorClass(group.generation)}" aria-hidden="true"></i>
      </div>
    `;
    card.addEventListener('click', () => showDetail(group));
    container.appendChild(card);
  });
}

function renderMembers() {
  const container = document.getElementById('members-cloud');
  const members = state.groups.flatMap((group) => (
    group.members || []
  ).map((member) => ({ member, group: group.name })));

  container.innerHTML = '';
  document.getElementById('members-count').textContent = `${members.length} members`;

  members.forEach(({ member, group }) => {
    const chip = document.createElement('span');
    chip.className = 'member-chip';
    chip.textContent = `${member} / ${group}`;
    container.appendChild(chip);
  });
}

function showDetail(group) {
  document.getElementById('detail-generation').textContent = `${group.generation || '--'} generation`;
  document.getElementById('detail-name').textContent = group.name;
  document.getElementById('detail-fandom').textContent = group.fandom;
  document.getElementById('detail-year').textContent = group.debutYear;
  document.getElementById('detail-total').textContent = (group.members || []).length;

  const container = document.getElementById('detail-members');
  container.innerHTML = '';
  (group.members || []).forEach((member) => {
    const chip = document.createElement('span');
    chip.textContent = member;
    container.appendChild(chip);
  });

  showPage('detail');
}

function setGeneration(button) {
  state.filteredGeneration = Number(button.dataset.gen);
  document.querySelectorAll('.filter').forEach((item) => {
    item.classList.toggle('active', item === button);
  });
  renderGroups();
}

function renderLockedState() {
  loginLink.textContent = 'Login';
  renderMessage('groups-grid', 'Faca login para carregar os grupos.');
  renderMessage('featured-groups', 'Faca login para carregar os grupos.');
  renderMessage('members-cloud', 'Faca login para visualizar os membros.');
}

function renderMessage(id, text) {
  const container = document.getElementById(id);
  container.innerHTML = `<p class="muted">${escapeHtml(text)}</p>`;
}

function colorClass(generation) {
  return colors[(Number(generation) || 1) - 1] || 'gen-4';
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

navButtons.forEach((button) => {
  button.addEventListener('click', () => showPage(button.dataset.page));
});

document.querySelectorAll('.filter').forEach((button) => {
  button.addEventListener('click', () => setGeneration(button));
});

searchInput.addEventListener('input', renderGroups);

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginMessage.textContent = 'Entrando...';

  try {
    await login(
      document.getElementById('username').value,
      document.getElementById('password').value,
    );
  } catch (error) {
    loginMessage.textContent = error.message;
  }
});

if (state.token) {
  loginLink.textContent = 'Online';
}

loadGroups();
