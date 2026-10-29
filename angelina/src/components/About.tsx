export default function About() {
  return (
    <section id="about" className="section about" aria-labelledby="about-title">
      <div className="wrap about__grid">
        <div className="about__text reveal">
          <p className="eyebrow">О салоне</p>
          <h2 id="about-title">Пространство, где можно уделить время <em>себе</em></h2>
          <p className="about__lead">«Ангелина» — пространство красоты, где можно уделить время себе, обновить образ и подобрать уход под свои пожелания.</p>
          <p>От стрижки и окрашивания до маникюра и косметологических процедур — мы собрали направления, которые помогают заботиться о себе в одном месте.</p>
        </div>
        <div className="about__photos">
          <img className="ph ph--a reveal" src="/gallery/interior-3.webp" alt="Визуализация интерьера: пудрово-розовая стена, ажурная перегородка и бирюзовое кресло" loading="lazy" width="600" height="758" />
          <img className="ph ph--b reveal" src="/gallery/wall-logo-2.webp" alt="Визуализация зоны ожидания с перламутровой стеной" loading="lazy" width="600" height="758" />
          <img className="ph ph--c reveal" src="/gallery/interior-7-sm.webp" alt="Визуализация рабочей зоны со светлым полом под дерево" loading="lazy" width="520" height="657" />
        </div>
      </div>
    </section>
  )
}
