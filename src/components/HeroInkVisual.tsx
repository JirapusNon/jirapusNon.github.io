const BRANDS = ['Epson', 'Canon', 'Brother', 'HP'] as const;

const INK_LEVELS = [
  { id: 'k', label: 'Black', code: '664', level: 18, warn: true },
  { id: 'c', label: 'Cyan', code: '664', level: 42, warn: false },
  { id: 'm', label: 'Magenta', code: '664', level: 35, warn: false },
  { id: 'y', label: 'Yellow', code: '664', level: 51, warn: false },
] as const;

export default function HeroInkVisual() {
  return (
    <div className="hero-mock hero-animate hero-animate-3" aria-hidden="true">
      <div className="hero-mock-card">
        <div className="hero-mock-card__strip cmyk-strip cmyk-strip-thin">
          <span />
          <span />
          <span />
          <span />
        </div>

        <div className="hero-mock-header">
          <span className="hero-mock-header__icon">
            <SearchIcon />
          </span>
          <div>
            <p className="hero-mock-header__title">หาหมึกตรงรุ่น</p>
            <p className="hero-mock-header__sub">เลือกแบรนด์ → รุ่นเครื่อง → สั่งได้ทันที</p>
          </div>
        </div>

        <div className="hero-mock-brands">
          {BRANDS.map((brand, index) => (
            <span
              key={brand}
              className={`hero-mock-brand${index === 0 ? ' hero-mock-brand--active' : ''}`}
            >
              {brand}
            </span>
          ))}
        </div>

        <div className="hero-mock-field">
          <span className="hero-mock-field__label">รุ่นเครื่องพิมพ์</span>
          <div className="hero-mock-field__input">
            <span className="hero-mock-field__value">Epson L3110</span>
            <span className="hero-mock-cursor" />
          </div>
        </div>

        <div className="hero-mock-match">
          <div className="hero-mock-match__head">
            <CheckIcon />
            <span>หมึกที่ใช้กับเครื่องนี้</span>
          </div>

          <ul className="hero-mock-inks">
            {INK_LEVELS.map((ink) => (
              <li key={ink.id} className={`hero-mock-ink hero-mock-ink--${ink.id}`}>
                <span className={`hero-mock-ink__dot hero-mock-ink__dot--${ink.id}`} />
                <div className="hero-mock-ink__info">
                  <span className="hero-mock-ink__name">
                    {ink.label} {ink.code}
                    {ink.warn ? (
                      <span className="hero-mock-ink__warn">ใกล้หมด</span>
                    ) : null}
                  </span>
                  <div className="hero-mock-ink__bar-track">
                    <span
                      className={`hero-mock-ink__bar${ink.warn ? ' hero-mock-ink__bar--warn' : ''}`}
                      style={{ width: `${ink.level}%` }}
                    />
                  </div>
                </div>
                <span className="hero-mock-ink__price">฿290</span>
                <span className="hero-mock-ink__stock">พร้อมส่ง</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="hero-mock-shipping">
          <div className="hero-mock-shipping__row">
            <span className="hero-mock-shipping__label">ส่งฟรีเมื่อครบ ฿1,000</span>
            <span className="hero-mock-shipping__amount">฿720 / ฿1,000</span>
          </div>
          <div className="hero-mock-shipping__track">
            <span className="hero-mock-shipping__fill" />
          </div>
        </div>

        <div className="hero-mock-actions">
          <span className="hero-mock-actions__hint">สั่งซ้ำได้ผ่าน LINE</span>
          <span className="hero-mock-actions__btn">สั่งซื้อ LINE</span>
        </div>
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
    </svg>
  );
}
