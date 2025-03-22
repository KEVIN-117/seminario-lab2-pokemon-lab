
import { fetchPokemon } from './pokemon';
import { renderPokemon } from './ui';

const input = document.getElementById('searchInput') as HTMLInputElement;
const button = document.getElementById('searchBtn') as HTMLButtonElement;
const resultDiv = document.getElementById('result')! as HTMLDivElement;
const historyDiv = document.getElementById('history')! as HTMLDivElement;


loadHistory();

button.addEventListener('click', async () => {
    const name = input.value.trim();

    if (!name) return;

    const history = localStorage.getItem('history');
    if (history && name) {
        const historyArray = JSON.parse(history) as string[];
        if (!historyArray.includes(name)) {
            historyArray.push(name);
            localStorage.setItem('history', JSON.stringify(historyArray));
        }
    }
    else {
        localStorage.setItem('history', JSON.stringify([name]));
    }

    resultDiv.innerHTML = "🔄 Buscando...";
    try {
        const pokemon = await fetchPokemon(name);
        console.log(pokemon);
        renderPokemon(pokemon);

    } catch (error) {
        resultDiv.innerHTML = `<p style="color:red;">${(error as Error).message}</p>`;
    }
    loadHistory();
});

function loadHistory() {
    const history = localStorage.getItem('history');
    if (history) {
        const historyArray = JSON.parse(history) as string[];
        historyDiv.innerHTML = '';

        if (historyArray.length > 0) {
            historyDiv.innerHTML = `
                ${historyArray.map(name => `
                    <button class="btn-history">${name}</button>
                `).join('')}
            `;
        } else {
            historyDiv.innerHTML = '<p>No hay búsquedas previas</p>';
        }
    }

    historyDiv.querySelectorAll('.btn-history').forEach(btn => {
        btn.addEventListener('click', async () => {
            const pokemon = await fetchPokemon(btn.textContent!);
            renderPokemon(pokemon);
        });
    });
}

