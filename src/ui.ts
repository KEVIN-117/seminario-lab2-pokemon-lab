
import { fetchNextPokemon, fetchPreviousPokemon, PokemonResponse } from './pokemon';


export function renderPokemon(pokemon: PokemonResponse): void {
  pokemon.abilities.forEach(ability => {
    if (ability.ability) {
      console.log(`<p>${ability.ability.name}</p>`);
    }
  });

  const resultDiv = document.getElementById('result')!;
  resultDiv.innerHTML = `
    <div class="pokemon-card">
      <div class="pokemon-header">
        <h2 class="pokemon-name">${pokemon.name.toUpperCase()}</h2>
        <p class="pokemon-id">#${pokemon.id}</p>
      </div>      
      <div class="sprites-container">
        ${Object.entries(pokemon.sprites)
      .filter(([_, value]) => typeof value === "string" && value !== null)
      .map(([key, value]) => `
            <div class="sprite-box">
              <img src="${value}" alt="${key}" title="${key}" />
            </div>
          `).join('')}
      </div>

      <div class="pokemon-header">
        <h2 class="pokemon-details-key">
          WEIGHT
        </h2>
        <p class="pokemon-details-value ">${pokemon.weight}</p>
      </div>
      
      <div class="abilities-section">
        <h2 class="abilities-title">ABILITIES</h2>
        <div class="abilities-grid">
          ${pokemon.abilities.map(ability => `
            <div class="ability-pill">${ability.ability.name}</div>
          `).join('')}
        </div>
      </div>
      <div class="abilities-section">
        <h2 class="abilities-title">TYPES</h2>
        <div class="abilities-grid">
          ${pokemon.types.map(type => `
            <div class="ability-pill">${type.type.name}</div>
          `).join('')}
        </div>
      </div>
      
      <div class="pokemon-footer">
        <button class="button button-previous">previous</button>
        <button class="button button-next">next</button>
      </div>
    </div>
  `;

  resultDiv.querySelector(".button-previous")?.addEventListener("click", async () => {
    const previousPokemon = await fetchPreviousPokemon(pokemon);
    renderPokemon(previousPokemon);
  });

  resultDiv.querySelector(".button-next")?.addEventListener("click", async () => {
    const nextPokemon = await fetchNextPokemon(pokemon);
    renderPokemon(nextPokemon);
  });
}

