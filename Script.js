class AnimeApp {
    constructor() {
        this.baseUrl = 'https://graphql.anilist.co';
        this.currentPage = 1;
        this.currentSearch = '';
        this.currentType = '';
        this.currentStatus = '';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadTopAnime();
    }

    // ... initializeElements y attachEventListeners sin cambios ...

    // Mapea los valores de tus <select> a los que espera AniList
    mapType(type) {
        const map = { 'tv': 'TV', 'movie': 'MOVIE', 'ova': 'OVA', 'special': 'SPECIAL' };
        return map[type] || null;
    }

    mapStatus(status) {
        const map = {
            'airing': 'RELEASING',
            'complete': 'FINISHED',
            'upcoming': 'NOT_YET_RELEASED'
        };
        return map[status] || null;
    }

    async loadTopAnime() {
        this.showLoading();
        this.hideError();

        try {
            const query = `
                query ($page: Int, $perPage: Int, $type: MediaType, $status: MediaStatus) {
                    Page(page: $page, perPage: $perPage) {
                        media(type: $type, status: $status, sort: POPULARITY_DESC) {
                            id
                            title { romaji english }
                            coverImage { large }
                            type
                            episodes
                            status
                            averageScore
                            description(asHtml: false)
                        }
                    }
                }
            `;

            const variables = {
                page: this.currentPage,
                perPage: 12,
                type: this.mapType(this.currentType),
                status: this.mapStatus(this.currentStatus)
            };

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ query, variables })
            });

            if (!response.ok) throw new Error('Error en la respuesta de la API');

            const data = await response.json();
            this.displayAnime(data.data.Page.media);
        } catch (error) {
            console.error('Error:', error);
            this.showError();
        } finally {
            this.hideLoading();
        }
    }

    async searchAnime() {
        this.showLoading();
        this.hideError();

        try {
            const query = `
                query ($search: String, $page: Int, $perPage: Int, $type: MediaType, $status: MediaStatus) {
                    Page(page: $page, perPage: $perPage) {
                        media(search: $search, type: $type, status: $status, sort: SEARCH_MATCH) {
                            id
                            title { romaji english }
                            coverImage { large }
                            type
                            episodes
                            status
                            averageScore
                            description(asHtml: false)
                        }
                    }
                }
            `;

            const variables = {
                search: this.currentSearch,
                page: this.currentPage,
                perPage: 12,
                type: this.mapType(this.currentType),
                status: this.mapStatus(this.currentStatus)
            };

            const response = await fetch(this.baseUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ query, variables })
            });

            if (!response.ok) throw new Error('Error en la respuesta de la API');

            const data = await response.json();
            this.displayAnime(data.data.Page.media);
        } catch (error) {
            console.error('Error:', error);
            this.showError();
        } finally {
            this.hideLoading();
        }
    }

    displayAnime(animeList) {
        if (!animeList || animeList.length === 0) {
            this.animeGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: white; font-size: 1.2rem;">No se encontraron animes</p>';
            return;
        }

        animeList.forEach(anime => {
            const animeCard = this.createAnimeCard(anime);
            this.animeGrid.appendChild(animeCard);
        });
    }

    createAnimeCard(anime) {
        const card = document.createElement('div');
        card.className = 'anime-card';

        const title = anime.title.english || anime.title.romaji || 'Sin título';
        const synopsis = anime.description
            ? anime.description.replace(/<[^>]*>/g, '').substring(0, 150) + '...'
            : 'Sin descripción disponible';

        card.innerHTML = `
            <img src="${anime.coverImage.large}" 
                 alt="${title}" 
                 class="anime-image"
                 onerror="this.src='https://via.placeholder.com/300x400/667eea/white?text=Imagen+No+Disponible'">
            <div class="anime-info">
                <h3 class="anime-title">${title}</h3>
                <div class="anime-details">
                    <span>${anime.type || 'N/A'}</span>
                    <span class="anime-score">⭐ ${anime.averageScore || 'N/A'}</span>
                </div>
                <div class="anime-details">
                    <span>Episodios: ${anime.episodes || 'N/A'}</span>
                    <span>${anime.status || 'N/A'}</span>
                </div>
                <p class="anime-synopsis">${synopsis}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            this.showAnimeDetails({ ...anime, _title: title, _synopsis: synopsis });
        });

        return card;
    }

    showAnimeDetails(anime) {
        alert(`Detalles de: ${anime._title}\n\nPuntuación: ${anime.averageScore || 'N/A'}\nEpisodios: ${anime.episodes || 'N/A'}\nEstado: ${anime.status || 'N/A'}\n\n${anime._synopsis || 'Sin descripción'}`);
    }

    // ... handleScroll, showLoading, hideLoading, showError, hideError sin cambios ...
}

document.addEventListener('DOMContentLoaded', () => {
    new AnimeApp();
});
