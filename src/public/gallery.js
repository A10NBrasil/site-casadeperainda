// Configuração das acomodações e seus arquivos
const accommodations = {
  'Casa Areia': Array.from({ length: 21 }, (_, i) => ({
    name: `Casa Areia ${String(i + 1).padStart(2, '0')}`,
    type: i < 3 ? 'image' : 'video',
    ext: i < 3 ? 'jpg' : 'mp4',
  })),
  'Casa Concha': Array.from({ length: 2 }, (_, i) => ({
    name: `Casa Concha ${String(i + 1).padStart(2, '0')}`,
    type: 'video',
    ext: 'mp4',
  })),
  'Casa Coral': Array.from({ length: 11 }, (_, i) => ({
    name: `Casa Coral ${String(i + 1).padStart(2, '0')}`,
    type: i < 4 ? 'image' : 'video',
    ext: i < 4 ? 'jpg' : 'mp4',
  })),
  'Casa Mar': Array.from({ length: 6 }, (_, i) => ({
    name: `Casa Mar ${String(i + 1).padStart(2, '0')}`,
    type: i < 4 ? 'image' : 'video',
    ext: i < 4 ? 'jpg' : 'mp4',
  })),
  'Casa Tartaruga': Array.from({ length: 1 }, (_, i) => ({
    name: `Casa Tartaruga ${String(i + 1).padStart(2, '0')}`,
    type: 'video',
    ext: 'mp4',
  })),
  'Suíte Ancora': Array.from({ length: 13 }, (_, i) => ({
    name: `Suíte Ancora ${String(i + 1).padStart(2, '0')}`,
    type: i < 11 ? 'image' : 'video',
    ext: i < 11 ? 'jpg' : 'mp4',
  })),
  'Suíte Cavalo Marinho': Array.from({ length: 7 }, (_, i) => ({
    name: `Suíte Cavalo Marinho ${String(i + 1).padStart(2, '0')}`,
    type: i < 4 ? 'image' : 'video',
    ext: i < 4 ? 'jpg' : 'mp4',
  })),
  'Suíte Estrela do Mar': Array.from({ length: 10 }, (_, i) => ({
    name: `Suíte Estrela do Mar ${String(i + 1).padStart(2, '0')}`,
    type: i < 6 ? 'image' : 'video',
    ext: i < 6 ? 'jpg' : 'mp4',
  })),
  'Suíte Marimbá': Array.from({ length: 6 }, (_, i) => ({
    name: `Suíte Marimbá ${String(i + 1).padStart(2, '0')}`,
    type: 'video',
    ext: 'mp4',
  })),
};

// Renderizar galeria
function renderGallery() {
  const container = document.getElementById('galleryContainer');

  Object.entries(accommodations).forEach(([accommodation, items]) => {
    // Criar seção para cada acomodação
    const section = document.createElement('div');
    section.className = 'accommodation-section';
    section.innerHTML = `<h3 class="accommodation-title">${accommodation}</h3>`;

    const grid = document.createElement('div');
    grid.className = 'accommodation-grid';

    items.forEach((item) => {
      const galleryItem = document.createElement('div');
      galleryItem.className = 'gallery-item';

      let content;
      if (item.type === 'image') {
        content = `
          <img
            src="/images/${accommodation}/${item.name}.${item.ext}"
            alt="${item.name}"
            loading="lazy"
            onerror="this.parentElement.style.display='none'"
          >
        `;
      } else {
        content = `
          <video
            controls
            preload="metadata"
            onerror="this.parentElement.style.display='none'"
          >
            <source src="/videos/${accommodation}/${item.name}.${item.ext}" type="video/mp4">
            Seu navegador não suporta vídeos HTML5.
          </video>
        `;
      }

      galleryItem.innerHTML = `
        ${content}
        <div class="gallery-item-label">${item.name}</div>
      `;

      grid.appendChild(galleryItem);
    });

    section.appendChild(grid);
    container.appendChild(section);
  });
}

// Adicionar estilos para as seções de acomodação
const style = document.createElement('style');
style.textContent = `
  .accommodation-section {
    margin-bottom: 50px;
  }

  .accommodation-title {
    font-size: 22px;
    color: #1e3c72;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #2a5298;
  }

  .accommodation-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  @media (max-width: 768px) {
    .accommodation-grid {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }
  }
`;
document.head.appendChild(style);

// Renderizar quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderGallery);
} else {
  renderGallery();
}
