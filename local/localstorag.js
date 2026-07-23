// Local Storage helper functions for localstorage.html
const keyInput = document.getElementById('itemKey');
const titleInput = document.getElementById('itemTitle');
const valueInput = document.getElementById('itemValue');
const searchInput = document.getElementById('searchQuery');
const saveButton = document.getElementById('saveButton');
const loadButton = document.getElementById('loadButton');
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const savedValue = document.getElementById('savedValue');
const savedItems = document.getElementById('savedItems');

function updateSavedValueDisplay(text) {
    savedValue.textContent = text ? `Stored value: ${text}` : 'No saved value found.';
}

function renderItems(items, title = 'Saved items') {
    if (!Array.isArray(items) || items.length === 0) {
        savedItems.innerHTML = `<p><strong>${title}:</strong> none found.</p>`;
        return;
    }

    savedItems.innerHTML = `
        <h2>${title}</h2>
        <ul>${items.map(item => `
            <li>
                <strong>${item.title || 'Untitled'}</strong> <em>(${item.savedAt})</em><br />
                ${escapeHtml(item.value)}
            </li>
        `).join('')}</ul>
    `;
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
        .replace(/\n/g, '<br />');
}

function getStoredItems(key) {
    const raw = localStorage.getItem(key);
    if (!raw) {
        return [];
    }

    try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        return [];
    }
}

function saveToLocalStorage() {
    const key = keyInput.value.trim();
    const value = valueInput.value;
    const title = titleInput.value.trim();

    if (!key) {
        alert('Please enter a storage key.');
        return;
    }

    if (!value) {
        alert('Please enter text to save.');
        return;
    }

    const items = getStoredItems(key);
    const newItem = {
        id: Date.now(),
        title: title || `Item ${items.length + 1}`,
        value,
        savedAt: new Date().toLocaleString(),
    };

    items.push(newItem);
    localStorage.setItem(key, JSON.stringify(items));
    updateSavedValueDisplay(`Saved ${items.length} item(s) under key: ${key}`);
    renderItems(items);
    alert(`Saved item under key: ${key}`);
}

function loadFromLocalStorage() {
    const key = keyInput.value.trim();

    if (!key) {
        alert('Please enter a storage key to load.');
        return;
    }

    const items = getStoredItems(key);

    if (items.length === 0) {
        updateSavedValueDisplay('No value stored under that key.');
        renderItems(items);
        return;
    }

    const lastItem = items[items.length - 1];
    valueInput.value = lastItem.value;
    titleInput.value = lastItem.title || '';
    updateSavedValueDisplay(`Loaded ${items.length} item(s). Showing the latest item.`);
    renderItems(items);
}

function searchLocalStorageItems() {
    const key = keyInput.value.trim();
    const query = searchInput.value.trim().toLowerCase();

    if (!key) {
        alert('Please enter a storage key to search.');
        return;
    }

    if (!query) {
        alert('Please enter a search query.');
        return;
    }

    const items = getStoredItems(key);
    const matched = items.filter(item =>
        item.title.toLowerCase().includes(query) || item.value.toLowerCase().includes(query)
    );

    updateSavedValueDisplay(`Found ${matched.length} matching item(s).`);
    renderItems(matched, `Search results for “${escapeHtml(query)}”`);
}

function clearLocalStorageValue() {
    const key = keyInput.value.trim();

    if (!key) {
        alert('Please enter a storage key to clear.');
        return;
    }

    localStorage.removeItem(key);
    valueInput.value = '';
    titleInput.value = '';
    searchInput.value = '';
    updateSavedValueDisplay('No saved value found.');
    renderItems([]);
    alert(`Cleared storage key: ${key}`);
}

saveButton.addEventListener('click', saveToLocalStorage);
loadButton.addEventListener('click', loadFromLocalStorage);
searchButton.addEventListener('click', searchLocalStorageItems);
clearButton.addEventListener('click', clearLocalStorageValue);

window.addEventListener('DOMContentLoaded', () => {
    const defaultKey = keyInput.value.trim();
    const items = defaultKey ? getStoredItems(defaultKey) : [];
    const storedText = items.length > 0 ? `Loaded ${items.length} item(s)` : null;
    updateSavedValueDisplay(storedText);
    renderItems(items);
});
