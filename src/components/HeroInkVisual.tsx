import type { CSSProperties } from 'react';

const INK_LEVELS = [
  { id: 'k', label: 'Black', level: 18, warn: true },
  { id: 'c', label: 'Cyan', level: 46, warn: false },
  { id: 'm', label: 'Magenta', level: 38, warn: false },
  { id: 'y', label: 'Yellow', level: 54, warn: false },
] as const;

const QUICK_ACTIONS = [
  { label: 'สั่งซ้ำ', Icon: RepeatIcon },
  { label: 'ค้นหารุ่น', Icon: SearchIcon },
  { label: 'LINE', Icon: ChatIcon },
] as const;

export default function HeroInkVisual() {
  return (
    <div className="hero-visual hero-animate hero-animate-3" aria-hidden="true">
      <div className="hero-visual-glow" />

      <div className="hero-visual-stage">
        <div className="hero-visual-float hero-visual-float--stock">
          <span className="hero-visual-float__dot" />
          <span className="hero-visual-float__text">พร้อมส่งวันนี้</span>
        </div>

        <div className="hero-visual-float hero-visual-float--cartridge">
          <span className="hero-visual-cartridge hero-visual-cartridge--k" />
          <div>
            <p className="hero-visual-float__title">Epson 664 Black</p>
            <p className="hero-visual-float__meta">฿290 · คงเหลือ 12 ชิ้น</p>
          </div>
        </div>

        <div className="hero-visual-float hero-visual-float--delivery">
          <TruckIcon />
          <div>
            <p className="hero-visual-float__title">กำลังจัดส่ง</p>
            <p className="hero-visual-float__meta">ถึงพรุ่งนี้ · Kerry</p>
          </div>
        </div>

        <div className="hero-visual-phone">
          <div className="hero-visual-phone__shell">
            <div className="hero-visual-phone__notch" />
            <div className="hero-visual-phone__screen">
              <div className="hero-visual-app">
                <header className="hero-visual-app__header">
                  <div className="hero-visual-app__user">
                    <span className="hero-visual-app__avatar">S</span>
                    <div>
                      <p className="hero-visual-app__greet">สวัสดีครับ</p>
                      <p className="hero-visual-app__name">SME Office</p>
                    </div>
                  </div>
                  <span className="hero-visual-app__status">ออนไลน์</span>
                </header>

                <div className="hero-visual-app__printer">
                  <div className="hero-visual-app__printer-icon">
                    <PrinterIcon />
                    <span className="hero-visual-app__scan" />
                  </div>
                  <div className="hero-visual-app__printer-info">
                    <p className="hero-visual-app__printer-name">Epson L3110</p>
                    <p className="hero-visual-app__printer-meta">Ink Tank · 664 Series</p>
                  </div>
                  <span className="hero-visual-app__printer-badge">พร้อมพิมพ์</span>
                </div>

                <div className="hero-visual-app__card">
                  <div className="hero-visual-app__card-head">
                    <span>ระดับหมึก CMYK</span>
                    <span className="hero-visual-app__warn">Black ใกล้หมด</span>
                  </div>
                  <ul className="hero-visual-app__inks">
                    {INK_LEVELS.map((ink) => (
                      <li key={ink.id} className="hero-visual-app__ink">
                        <span
                          className={`hero-visual-app__ink-dot hero-visual-app__ink-dot--${ink.id}`}
                        />
                        <span className="hero-visual-app__ink-label">{ink.label}</span>
                        <div className="hero-visual-app__ink-track">
                          <span
                            className={`hero-visual-app__ink-fill hero-visual-app__ink-fill--${ink.id}${ink.warn ? ' hero-visual-app__ink-fill--warn' : ''}`}
                            style={{ '--ink-level': `${ink.level}%` } as CSSProperties}
                          />
                        </div>
                        <span className="hero-visual-app__ink-pct">{ink.level}%</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hero-visual-app__order">
                  <div className="hero-visual-app__order-head">
                    <span>คำสั่งซื้อ #RNK-4821</span>
                    <span className="hero-visual-app__order-tag">กำลังแพ็ก</span>
                  </div>
                  <p className="hero-visual-app__order-items">664 Black ×2 · 664 Cyan ×1</p>
                  <div className="hero-visual-app__shipping">
                    <div className="hero-visual-app__shipping-row">
                      <span>ส่งฟรีเมื่อครบ ฿1,000</span>
                      <span>฿720</span>
                    </div>
                    <div className="hero-visual-app__shipping-track">
                      <span className="hero-visual-app__shipping-fill" />
                    </div>
                  </div>
                </div>

                <div className="hero-visual-app__actions">
                  {QUICK_ACTIONS.map((action) => (
                    <span key={action.label} className="hero-visual-app__action">
                      <action.Icon />
                      {action.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PrinterIcon() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.75}
        d="M6 9V4h12v5M6 18H4a2 2 0 01-2-2v-5a2 2 0 012-2h16a2 2 0 012 2v5a2 2 0 01-2 2h-2M6 14h12v7H6v-7z"
      />
    </svg>
  );
}

function TruckIcon() {
  return (
    <svg
      className="hero-visual-float__icon"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m8 0a2 2 0 104 0"
      />
    </svg>
  );
}

function RepeatIcon() {
  return (
    <svg className="hero-visual-app__action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="hero-visual-app__action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="hero-visual-app__action-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
    </svg>
  );
}
