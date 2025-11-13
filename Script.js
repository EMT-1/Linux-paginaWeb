class AnimeApp {
    constructor() {
        this.baseUrl = 'https://api.jikan.moe/v4';
        this.currentPage = 1;
        this.currentSearch = '';
        this.currentType = '';
        this.currentStatus = '';
        
        this.initializeElements();
        this.attachEventListeners();
        this.loadTopAnime();
    }

    initializeElements() {
        this.animeGrid = document.getElementById('animeGrid');
        this.searchInput = document.getElementById('searchInput');
        this.searchBtn = document.getElementById('searchBtn');
        this.typeFilter = document.getElementById('typeFilter');
        this.statusFilter = document.getElementById('statusFilter');
        this.loading = document.getElementById('loading');
        this.errorMessage = document.getElementById('errorMessage');
    }

    attachEventListeners() {
        this.searchBtn.addEventListener('click', () => this.handleSearch());
        this.searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleSearch();
        });
        
        this.typeFilter.addEventListener('change', () => this.handleFilterChange());
        this.statusFilter.addEventListener('change', () => this.handleFilterChange());
        
        // Carga más animes al hacer scroll
        window.addEventListener('scroll', () => this.handleScroll());
    }

    handleSearch() {
        this.currentSearch = this.searchInput.value.trim();
        this.currentPage = 1;
        this.animeGrid.innerHTML = '';
        
        if (this.currentSearch) {
            this.searchAnime();
        } else {
            this.loadTopAnime();
        }
    }

    handleFilterChange() {
        this.currentType = this.typeFilter.value;
        this.currentStatus = this.statusFilter.value;
        this.currentPage = 1;
        this.animeGrid.innerHTML = '';
        
        if (this.currentSearch) {
            this.searchAnime();
        } else {
            this.loadTopAnime();
        }
    }

    async loadTopAnime() {
        this.showLoading();
        this.hideError();

        try {
            let url = `${this.baseUrl}/top/anime?page=${this.currentPage}&limit=12`;
            
            // Agregar filtros si están seleccionados
            const filters = [];
            if (this.currentType) filters.push(`type=${this.currentType}`);
            if (this.currentStatus) filters.push(`status=${this.currentStatus}`);
            
            if (filters.length > 0) {
                url += `&${filters.join('&')}`;
            }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            
            const data = await response.json();
            this.displayAnime(data.data);
            
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
            let url = `${this.baseUrl}/anime?q=${encodeURIComponent(this.currentSearch)}&page=${this.currentPage}&limit=12`;
            
            // Agregar filtros si están seleccionados
            const filters = [];
            if (this.currentType) filters.push(`type=${this.currentType}`);
            if (this.currentStatus) filters.push(`status=${this.currentStatus}`);
            
            if (filters.length > 0) {
                url += `&${filters.join('&')}`;
            }

            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            
            const data = await response.json();
            this.displayAnime(data.data);
            
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
        
        const synopsis = anime.synopsis 
            ? anime.synopsis.substring(0, 150) + '...' 
            : 'Sin descripción disponible';
        
        card.innerHTML = `
            <img src="${anime.images.jpg.large_image_url}" 
                 alt="${anime.title}" 
                 class="anime-image"
                 onerror="this.src='https://via.placeholder.com/300x400/667eea/white?text=Imagen+No+Disponible'">
            <div class="anime-info">
                <h3 class="anime-title">${anime.title}</h3>
                <div class="anime-details">
                    <span>${anime.type || 'N/A'}</span>
                    <span class="anime-score">⭐ ${anime.score || 'N/A'}</span>
                </div>
                <div class="anime-details">
                    <span>Episodios: ${anime.episodes || 'N/A'}</span>
                    <span>${anime.status || 'N/A'}</span>
                </div>
                <p class="anime-synopsis">${synopsis}</p>
            </div>
        `;

        // Agregar evento de click para mostrar más información
        card.addEventListener('click', () => {
            this.showAnimeDetails(anime);
        });

        return card;
    }

    showAnimeDetails(anime) {
        // Aquí podrías implementar un modal con más detalles
        alert(`Detalles de: ${anime.title}\n\nPuntuación: ${anime.score || 'N/A'}\nEpisodios: ${anime.episodes || 'N/A'}\nEstado: ${anime.status || 'N/A'}\n\n${anime.synopsis || 'Sin descripción'}`);
    }

    handleScroll() {
        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
        
        if (scrollTop + clientHeight >= scrollHeight - 100) {
            this.currentPage++;
            if (this.currentSearch) {
                this.searchAnime();
            } else {
                this.loadTopAnime();
            }
        }
    }

    showLoading() {
        this.loading.classList.remove('hidden');
    }

    hideLoading() {
        this.loading.classList.add('hidden');
    }

    showError() {
        this.errorMessage.classList.remove('hidden');
    }

    hideError() {
        this.errorMessage.classList.add('hidden');
    }
}

// Inicializar la aplicación cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new AnimeApp();
});