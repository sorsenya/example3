// Чтобы добавить фото: положите файл в public/gallery (webp/jpg), добавьте строку ниже.
// Для каждого фото желательно 2 версии: «имя.webp» (~1000px) и «имя-sm.webp» (~520px).
// category: 'hair' | 'nails' | 'brows' | 'interior'
export type GalleryCategory = 'hair' | 'nails' | 'brows' | 'interior'
export type GalleryItem = { src: string; alt: string; category: GalleryCategory; w: number; h: number }

export const galleryLabels: Record<GalleryCategory, string> = {
  hair: 'Волосы', nails: 'Ногти', brows: 'Ресницы и брови', interior: 'Интерьер',
}

export const gallery: GalleryItem[] = [
  { src: 'hair-long', alt: 'Длинные светлые волосы после работы мастера', category: 'hair', w: 960, h: 1280 },
  { src: 'interior-3', alt: 'Визуализация интерьера: розовая стена и ажурная перегородка', category: 'interior', w: 600, h: 758 },
  { src: 'nails-1', alt: 'Маникюр с французским дизайном и розовым акцентом', category: 'nails', w: 960, h: 1280 },
  { src: 'wall-logo', alt: 'Визуализация зоны ожидания с перламутровой стеной и логотипом', category: 'interior', w: 600, h: 758 },
  { src: 'brows-lashes', alt: 'Оформление бровей и ресниц', category: 'brows', w: 602, h: 800 },
  { src: 'interior-1', alt: 'Визуализация интерьера: парикмахерская зона с бирюзовыми креслами', category: 'interior', w: 821, h: 1038 },
  { src: 'pedicure', alt: 'Педикюр с нежно-розовым покрытием', category: 'nails', w: 960, h: 1280 },
  { src: 'interior-6', alt: 'Визуализация маникюрной зоны у голубой стены', category: 'interior', w: 600, h: 758 },
  { src: 'nail-bar', alt: 'Визуализация стойки с лаками для ногтей', category: 'interior', w: 600, h: 758 },
  { src: 'interior-2', alt: 'Визуализация интерьера: мойка и кушетка за перегородкой', category: 'interior', w: 600, h: 758 },
  { src: 'cabinet', alt: 'Визуализация кабинета с кушеткой', category: 'interior', w: 600, h: 758 },
  { src: 'facade', alt: 'Входная группа студии Ангелина', category: 'interior', w: 720, h: 1280 },
]
