# Ангелина — Beauty Studio (сайт-визитка)

React + TypeScript + Vite. Без UI-библиотек; шрифты Cormorant Garamond и Manrope подключены локально (@fontsource).

## Команды
    npm install
    npm run dev       # разработка
    npm run build     # сборка в dist/
    npm run preview   # просмотр сборки

## Где что менять
- `src/data/site.ts` — адрес, телефон, график, Яндекс Карты, соцсети, ссылка на политику ПДн. Пустые поля на сайте скрыты.
- `src/data/services.ts` — услуги и цены (цена только у тех, что известны).
- `src/data/gallery.ts` — фото галереи и категории. Файлы кладите в `public/gallery/` (`имя.webp` ~1000px и `имя-sm.webp` ~520px). Фильтры показываются только для категорий, где есть фото.
- `src/data/reviews.ts` — отзывы.

## Заявки
Форма отправляет POST JSON на адрес из `VITE_LEAD_ENDPOINT` (см. `.env.example`), любой ответ 2xx считается успехом.
Пока адрес не задан, форма честно сообщает, что отправка не настроена, и «успех» не показывает.
Формат: `{ name, phone, category, service, date?, time?, comment?, consent, source }`. Адаптер: `src/lib/submitLead.ts`.
Секретные ключи (Telegram-бот, CRM) держите на стороне обработчика, не в клиентском коде.
