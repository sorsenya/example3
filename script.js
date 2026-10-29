'use strict'

/* ============ ДАННЫЕ (редактируйте здесь) ============ */
const SITE = {
  address: null,        // 'г. …, ул. …'
  phone: null,          // '+7 (___) ___-__-__'
  hours: null,          // 'Ежедневно 10:00–20:00'
  yandexMapsUrl: null,  // ссылка на Яндекс Карты
  socials: [],          // [{ label: 'Telegram', href: 'https://t.me/…' }]
  privacyUrl: null,     // ссылка на политику обработки ПДн
}

const CATEGORIES = [
  { id: 'hair', tab: 'Волосы', title: 'Парикмахерские услуги', image: 'gallery/hair-long',
    lead: 'Стрижки, цвет и уход — с подбором решения под ваши пожелания.',
    items: [
      { name: 'Женская стрижка', price: '650–1000 ₽' }, { name: 'Мужская стрижка', price: '300–600 ₽' },
      { name: 'Детская стрижка' }, { name: 'Окрашивание' }, { name: 'Тонирование' }, { name: 'Мелирование' },
      { name: 'Укладка' }, { name: 'Локоны и кудри' }, { name: 'Вечерняя и свадебная укладка' },
      { name: 'Уходовые процедуры для волос' }, { name: 'Холодное восстановление волос' }, { name: 'Ботокс для волос' },
      { name: 'Кератиновое восстановление' }, { name: 'Кератиновое выпрямление' }, { name: 'Наращивание волос' },
      { name: 'Французские косички' }, { name: 'Плетение из собственных волос' } ] },
  { id: 'nails', tab: 'Ногти', title: 'Маникюр и педикюр', image: 'gallery/nails-1',
    lead: 'Аккуратные руки и ноги: от классического ухода до дизайна.',
    items: [
      { name: 'Классический женский маникюр с покрытием', price: '1700 ₽' },
      { name: 'Мужской маникюр' }, { name: 'Детский маникюр' }, { name: 'Аппаратный маникюр' },
      { name: 'Женский педикюр' }, { name: 'Мужской педикюр' }, { name: 'Аппаратный педикюр' }, { name: 'Комбинированный педикюр' },
      { name: 'Наращивание ногтей' }, { name: 'Покрытие ногтей' }, { name: 'Снятие покрытия' },
      { name: 'Дизайн ногтей' }, { name: 'Парафинотерапия' } ] },
  { id: 'cosmetology', tab: 'Косметология', title: 'Косметология', image: 'gallery/cabinet',
    lead: 'Уход за лицом и процедуры, которые подбираются индивидуально.',
    items: [
      { name: 'Уход за лицом' }, { name: 'Пилинг' }, { name: 'Контурная пластика' }, { name: 'Увеличение губ' },
      { name: 'Биополимерный гель' }, { name: 'Врачебная косметология' }, { name: 'Удаление перманентного макияжа' } ] },
  { id: 'lashes', tab: 'Ресницы и брови', title: 'Ресницы и брови', image: 'gallery/brows-lashes',
    lead: 'Выразительный взгляд: форма, цвет и аккуратные акценты.',
    items: [
      { name: 'Наращивание ресниц' }, { name: 'Ламинирование ресниц' }, { name: 'Коррекция бровей' },
      { name: 'Окрашивание бровей и ресниц' }, { name: 'Татуаж и перманентный макияж' } ] },
]

// Новые фото: положите файлы в gallery/ (имя.webp ~1000px и имя-sm.webp ~520px) и добавьте строку.
// category: 'hair' | 'nails' | 'brows' | 'interior'
const GALLERY_LABELS = { hair: 'Волосы', nails: 'Ногти', brows: 'Ресницы и брови', interior: 'Интерьер' }
const GALLERY = [
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

// Отзывы с Яндекс Карт (текст сохранён, исправлено только форматирование)
const REVIEWS = [
  { author: 'Ксения Т.', text: [
    'Уже не первый раз доверяю свои волосы мастеру Антонине, и всегда остаюсь в восторге!',
    'Антонина изначально почувствовала, какая стрижка мне больше всего подходит, и, если хочется что-то поменять, даёт советы, как будет красивее и лучше смотреться с учётом моих запросов.',
    'Как-то захотела сделать себе мелирование, но Антонина предложила альтернативную идею, результат которой оказался намного лучше, чем я видела изначально!',
    'С большой любовью и благодарностью к этому мастеру, очень рекомендую!'] },
  { author: 'Ольга Дьяконова', text: [
    'Очень понравился мастер Антонина, очень внимательна и настоящий профессионал, учла все пожелания по стрижке, научила быстрой и лёгкой укладке, дала много советов по уходовым средствам ❤️ А самое главное — с ней я сменила цвет волос и очень этому теперь рада.'] },
  { author: 'Алина Л.', text: [
    'Советую всем данный салон. Мастер Антонина профессионал своего дела! Свои волосы доверяю исключительно только ей! Если вы не знаете чего хотите, всегда подскажет, поможет, направит 😊 Помимо профессионализма очень открытая и позитивная, всегда есть о чём поговорить 🤩'] },
]

/* ============ УТИЛИТЫ ============ */
const $ = (s, r = document) => r.querySelector(s)
const $$ = (s, r = document) => [...r.querySelectorAll(s)]
const el = (tag, cls, html) => { const e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e }
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches
const catById = id => CATEGORIES.find(c => c.id === id)

/* ============ ЗАПИСЬ: прокрутка к форме + подстановка ============ */
function openBooking(category, service) {
  if (category) {
    $('#lead-category').value = category
    fillServices(category)
    if (service) $('#lead-service').value = service
  }
  $('#booking').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
  history.replaceState(null, '', '#booking')
  setTimeout(() => $('#lead-name').focus({ preventScroll: true }), reduceMotion ? 0 : 700)
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-book]')
  if (!b) return
  e.preventDefault()
  closeMenu()
  openBooking(b.dataset.category, b.dataset.service)
})

/* ============ HEADER ============ */
const header = $('#header'), burger = $('#burger')
function closeMenu() {
  header.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false')
  burger.setAttribute('aria-label', 'Открыть меню'); document.body.style.overflow = ''
}
burger.addEventListener('click', () => {
  const open = header.classList.toggle('is-open')
  burger.setAttribute('aria-expanded', String(open))
  burger.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню')
  document.body.style.overflow = open ? 'hidden' : ''
})
document.addEventListener('keydown', e => { if (e.key === 'Escape' && header.classList.contains('is-open')) { closeMenu(); burger.focus() } })
$$('#nav a:not([data-book])').forEach(a => a.addEventListener('click', closeMenu))
const onScroll = () => header.classList.toggle('is-solid', scrollY > 24)
addEventListener('scroll', onScroll, { passive: true }); onScroll()

/* ============ НАПРАВЛЕНИЯ ============ */
const dirs = $('#directions')
CATEGORIES.forEach((c, i) => {
  const a = el('article', `dir dir--${i + 1} reveal`, `
    <div class="dir__img"><img src="${c.image}-sm.webp" alt="" loading="lazy" width="520" height="693" /></div>
    <div class="dir__body">
      <span class="dir__n" aria-hidden="true">0${i + 1}</span>
      <h3>${c.title}</h3><p>${c.lead}</p>
      <div class="dir__links">
        <a class="link" href="#prices" data-tab="${c.id}">Услуги и цены</a>
        <button class="link link--btn" type="button" data-book data-category="${c.id}">Записаться</button>
      </div></div>`)
  dirs.append(a)
})
dirs.addEventListener('click', e => { const t = e.target.closest('[data-tab]'); if (t) selectTab(t.dataset.tab, false) })

/* ============ КАТАЛОГ УСЛУГ ============ */
const LIMIT = 6
let active = 'hair'
const expanded = {}
const tabsBox = $('#tabs'), rows = $('#rows'), expandBtn = $('#expand'), panelBook = $('#panel-book')

CATEGORIES.forEach(c => {
  const b = el('button', null, c.tab)
  Object.assign(b, { type: 'button' }); b.id = `tab-${c.id}`; b.dataset.id = c.id
  b.setAttribute('role', 'tab'); b.setAttribute('aria-controls', 'catalog-panel')
  tabsBox.append(b)
})
tabsBox.addEventListener('click', e => { const b = e.target.closest('button'); if (b) selectTab(b.dataset.id, true) })
tabsBox.addEventListener('keydown', e => {
  const d = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0
  if (!d) return
  e.preventDefault()
  const i = CATEGORIES.findIndex(c => c.id === active)
  selectTab(CATEGORIES[(i + d + CATEGORIES.length) % CATEGORIES.length].id, true)
})
function selectTab(id, focus) { active = id; renderCatalog(); if (focus) $(`#tab-${id}`).focus() }

function renderCatalog() {
  const c = catById(active)
  $$('button', tabsBox).forEach(b => { const on = b.dataset.id === active; b.setAttribute('aria-selected', on); b.tabIndex = on ? 0 : -1 })
  $('#catalog-panel').setAttribute('aria-labelledby', `tab-${active}`)
  $('#panel-title').textContent = c.title
  const shown = expanded[active] ? c.items : c.items.slice(0, LIMIT)
  rows.innerHTML = ''
  shown.forEach(s => {
    const li = el('li'), b = el('button', 'row')
    b.type = 'button'; b.dataset.book = ''; b.dataset.category = c.id; b.dataset.service = s.name
    b.setAttribute('aria-label', `${s.name}${s.price ? ', ' + s.price : ', стоимость уточняйте при записи'}. Выбрать для записи`)
    b.innerHTML = `<span class="row__name">${s.name}</span><span class="row__dots" aria-hidden="true"></span>` +
      (s.price ? `<span class="row__price">${s.price}</span>` : '<span class="row__ask">уточняйте при записи</span>')
    li.append(b); rows.append(li)
  })
  expandBtn.hidden = c.items.length <= LIMIT
  expandBtn.setAttribute('aria-expanded', !!expanded[active])
  expandBtn.textContent = expanded[active] ? 'Свернуть список' : `Показать все услуги (${c.items.length})`
  panelBook.textContent = `Записаться: ${c.tab.toLowerCase()}`
  panelBook.dataset.category = c.id
  const panel = $('#catalog-panel'); panel.style.animation = 'none'; void panel.offsetWidth; panel.style.animation = ''
}
expandBtn.addEventListener('click', () => { expanded[active] = !expanded[active]; renderCatalog() })
renderCatalog()

/* ============ ГАЛЕРЕЯ + LIGHTBOX ============ */
const mosaic = $('#mosaic'), filtersBox = $('#filters'), dlg = $('#lightbox')
let filter = 'all', cur = 0, lastFocus = null
const visible = () => filter === 'all' ? GALLERY : GALLERY.filter(g => g.category === filter)

function renderGallery() {
  const items = visible()
  mosaic.innerHTML = ''
  items.forEach((g, i) => {
    const li = el('li', 'tile'), b = el('button')
    b.type = 'button'; b.dataset.i = i; b.setAttribute('aria-label', `Открыть фото крупнее: ${g.alt}`)
    b.innerHTML = `<img src="gallery/${g.src}-sm.webp" alt="${g.alt}" loading="lazy" width="520" height="${Math.round(520 * g.h / g.w)}" />`
    li.append(b); mosaic.append(li)
  })
  $$('button', filtersBox).forEach(b => b.setAttribute('aria-pressed', b.dataset.f === filter))
}
const cats = Object.keys(GALLERY_LABELS).filter(c => GALLERY.some(g => g.category === c))
if (cats.length > 1) {
  ;['all', ...cats].forEach(c => {
    const b = el('button', null, c === 'all' ? 'Все' : GALLERY_LABELS[c]); b.type = 'button'; b.dataset.f = c
    filtersBox.append(b)
  })
  filtersBox.addEventListener('click', e => { const b = e.target.closest('button'); if (b) { filter = b.dataset.f; renderGallery() } })
} else filtersBox.remove()
renderGallery()

function showLb(i) {
  const items = visible(); cur = (i + items.length) % items.length; const g = items[cur]
  const img = $('#lb-img'); img.src = `gallery/${g.src}.webp`; img.alt = g.alt
  $('#lb-cap').textContent = `${g.alt} · ${cur + 1} / ${items.length}`
}
mosaic.addEventListener('click', e => {
  const b = e.target.closest('button'); if (!b) return
  lastFocus = b; showLb(+b.dataset.i); dlg.showModal()
})
const closeLb = () => dlg.close()
dlg.addEventListener('close', () => lastFocus && lastFocus.focus())
$('#lb-close').addEventListener('click', closeLb)
$('#lb-prev').addEventListener('click', () => showLb(cur - 1))
$('#lb-next').addEventListener('click', () => showLb(cur + 1))
dlg.addEventListener('click', e => { if (e.target === dlg) closeLb() })
dlg.addEventListener('keydown', e => { if (e.key === 'ArrowRight') showLb(cur + 1); if (e.key === 'ArrowLeft') showLb(cur - 1) })

/* ============ ОТЗЫВЫ ============ */
const stars = '<span class="stars" role="img" aria-label="Оценка: 5 из 5">★★★★★</span>'
REVIEWS.forEach((r, i) => {
  $('#rev-grid').append(el('figure', `quote${i === 0 ? ' quote--main' : ''} reveal`,
    `${stars}<blockquote>${r.text.map(t => `<p>${t}</p>`).join('')}</blockquote><figcaption>${r.author}</figcaption>`))
})
if (SITE.yandexMapsUrl) { const a = $('#ymaps-reviews'); a.href = SITE.yandexMapsUrl; a.hidden = false }

/* ============ ФОРМА (демо: данные никуда не отправляются) ============ */
const form = $('#form'), selCat = $('#lead-category'), selSrv = $('#lead-service')
CATEGORIES.forEach(c => selCat.append(new Option(c.title, c.id)))
function fillServices(id) {
  const c = catById(id)
  selSrv.innerHTML = ''
  if (!c) { selSrv.append(new Option('Сначала выберите направление', '')); selSrv.disabled = true; return }
  selSrv.append(new Option('Выберите услугу или «не знаю»', ''))
  selSrv.append(new Option('Не знаю, нужна консультация', 'Не знаю, нужна консультация'))
  c.items.forEach(s => selSrv.append(new Option(s.name, s.name)))
  selSrv.disabled = false
}
selCat.addEventListener('change', () => fillServices(selCat.value))
$('#lead-date').min = new Date().toISOString().slice(0, 10)
if (SITE.privacyUrl) { $('#privacy-link').href = SITE.privacyUrl; $('#privacy-wrap').hidden = false }

function formatPhone(raw) {
  if (!raw) return ''
  let d = raw.replace(/\D/g, ''); if (/^[78]/.test(d)) d = d.slice(1); d = d.slice(0, 10)
  let o = '+7'
  if (d.length) o += ' (' + d.slice(0, 3)
  if (d.length >= 3) o += ')'
  if (d.length > 3) o += ' ' + d.slice(3, 6)
  if (d.length > 6) o += '-' + d.slice(6, 8)
  if (d.length > 8) o += '-' + d.slice(8, 10)
  return o
}
const phoneEl = $('#lead-phone')
phoneEl.addEventListener('input', () => { phoneEl.value = formatPhone(phoneEl.value) })

function setErr(id, input, msg) {
  const p = $(`#err-${id}`); p.textContent = msg || ''; p.hidden = !msg
  if (msg) input.setAttribute('aria-invalid', 'true'); else input.removeAttribute('aria-invalid')
}
form.addEventListener('submit', e => {
  e.preventDefault()
  const name = $('#lead-name'), consent = $('#lead-consent')
  const bad = []
  const nameBad = name.value.trim().length < 2
  const phoneBad = phoneEl.value.replace(/\D/g, '').replace(/^[78]/, '').length !== 10
  setErr('name', name, nameBad ? 'Укажите, как к вам обращаться' : '')
  setErr('phone', phoneEl, phoneBad ? 'Введите номер полностью: +7 (900) 000-00-00' : '')
  setErr('consent', consent, consent.checked ? '' : 'Нужно согласие на обработку персональных данных')
  if (nameBad) bad.push(name); if (phoneBad) bad.push(phoneEl); if (!consent.checked) bad.push(consent)
  const note = $('#demo-note')
  if (bad.length) { note.hidden = true; bad[0].focus(); return }
  // ДЕМО: обработчика нет, данные никуда не уходят.
  note.textContent = 'Демонстрационная форма: заявка никуда не отправляется. Чтобы записаться, свяжитесь с салоном напрямую.'
  note.hidden = false
})

/* ============ КОНТАКТЫ ============ */
const list = $('#contacts-list')
const add = (t, html) => list.append(el('div', null, `<dt>${t}</dt><dd>${html}</dd>`))
add('Салон', 'Ангелина — Beauty Studio')
if (SITE.address) add('Адрес', SITE.address)
if (SITE.phone) add('Телефон', `<a href="tel:${SITE.phone.replace(/[^\d+]/g, '')}">${SITE.phone}</a>`)
if (SITE.hours) add('График работы', SITE.hours)
if (SITE.yandexMapsUrl) add('Яндекс Карты', `<a href="${SITE.yandexMapsUrl}" target="_blank" rel="noopener noreferrer">Открыть на карте</a>`)
if (SITE.socials.length) add('Мы в сети', SITE.socials.map(s => `<a class="inline" href="${s.href}" target="_blank" rel="noopener noreferrer">${s.label}</a>`).join(''))
$('#copy').textContent = `© ${new Date().getFullYear()} Ангелина — Beauty Studio`

/* ============ ПОЯВЛЕНИЕ СЕКЦИЙ И МОБИЛЬНАЯ КНОПКА ============ */
const revealEls = $$('.reveal')
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } }),
    { threshold: 0.12, rootMargin: '0px 0px -6% 0px' })
  revealEls.forEach(e => io.observe(e))
} else revealEls.forEach(e => e.classList.add('in'))

const sticky = $('#sticky'); let past = false, atForm = false
const updSticky = () => sticky.classList.toggle('is-on', past && !atForm)
addEventListener('scroll', () => { past = scrollY > 600; updSticky() }, { passive: true })
if ('IntersectionObserver' in window) {
  const io2 = new IntersectionObserver(es => { atForm = es.some(e => e.isIntersecting); updSticky() }, { threshold: 0.15 })
  io2.observe($('#booking')); io2.observe($('#contacts'))
}
