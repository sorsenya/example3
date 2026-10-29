// Единая конфигурация салона. Пустые значения (null) на сайте скрываются.
export const site = {
  name: 'Ангелина',
  tagline: 'Beauty Studio',
  address: null as string | null,            // 'г. …, ул. …, д. …'
  phone: null as string | null,              // '+7 (___) ___-__-__'
  hours: null as string | null,              // 'Ежедневно с 10:00 до 20:00'
  yandexMapsUrl: null as string | null,      // ссылка на карточку в Яндекс Картах (и на отзывы)
  socials: [] as { label: string; href: string }[], // [{label:'Telegram', href:'https://t.me/…'}]
  privacyUrl: null as string | null,         // ссылка на политику обработки персональных данных
  leadEndpoint: (import.meta.env.VITE_LEAD_ENDPOINT as string | undefined) || null,
}
