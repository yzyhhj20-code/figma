import { useState, useEffect } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// SVG geometric decorations  (De Stijl / constructivist — no emoji)
// ─────────────────────────────────────────────────────────────────────────────

/** Vinyl record in Mondrian palette */
function SvgVinyl({ size = 80, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} style={style}>
      <circle cx="40" cy="40" r="38" fill="#0D0D0D" stroke="#0D0D0D" strokeWidth="2" />
      <circle cx="40" cy="40" r="28" fill="none" stroke="#F4EFE6" strokeWidth="1" />
      <circle cx="40" cy="40" r="18" fill="none" stroke="#F4EFE6" strokeWidth="1" />
      <circle cx="40" cy="40" r="8"  fill="#C8271F" stroke="#0D0D0D" strokeWidth="2" />
      <circle cx="40" cy="40" r="3"  fill="#F4EFE6" />
    </svg>
  )
}

/** Geometric music note (rectangle stem + filled circle head) */
function SvgNote({ size = 60, fill = '#0D0D0D', className = '', style = {} }: { size?: number; fill?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className={className} style={style}>
      <rect x="26" y="8" width="5" height="34" fill={fill} />
      <rect x="26" y="8" width="20" height="5" fill={fill} />
      <rect x="41" y="8" width="5" height="16" fill={fill} />
      <ellipse cx="22" cy="44" rx="10" ry="7" fill={fill} transform="rotate(-15 22 44)" />
      <ellipse cx="46" cy="30" rx="8"  ry="6"  fill={fill} transform="rotate(-15 46 30)" />
    </svg>
  )
}

/** Four-pointed star / cross shape */
function SvgStar({ size = 60, fill = '#F5BE00', className = '', style = {} }: { size?: number; fill?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" className={className} style={style}>
      <path d="M30 2 L34 26 L58 30 L34 34 L30 58 L26 34 L2 30 L26 26 Z" fill={fill} stroke="#0D0D0D" strokeWidth="2" />
    </svg>
  )
}

/** Mondrian square cluster */
function SvgCluster({ size = 80, className = '', style = {} }: { size?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 80 80" fill="none" className={className} style={style}>
      <rect x="2"  y="2"  width="35" height="35" fill="#C8271F" stroke="#0D0D0D" strokeWidth="2" />
      <rect x="43" y="2"  width="35" height="35" fill="#F5BE00" stroke="#0D0D0D" strokeWidth="2" />
      <rect x="2"  y="43" width="35" height="35" fill="#F4EFE6" stroke="#0D0D0D" strokeWidth="2" />
      <rect x="43" y="43" width="35" height="35" fill="#003882" stroke="#0D0D0D" strokeWidth="2" />
    </svg>
  )
}

/** Microphone silhouette — geometric */
function SvgMic({ size = 64, fill = '#0D0D0D', className = '', style = {} }: { size?: number; fill?: string; className?: string; style?: React.CSSProperties }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} style={style}>
      <rect x="22" y="4"  width="20" height="30" rx="10" fill={fill} />
      <path d="M10 28 C10 44 54 44 54 28" stroke={fill} strokeWidth="4" fill="none" strokeLinecap="square" />
      <rect x="30" y="44" width="4" height="12" fill={fill} />
      <rect x="20" y="56" width="24" height="4" fill={fill} />
    </svg>
  )
}

/** Waveform bars */
function SvgWave({ width = 80, height = 40, color = '#C8271F', animated = false, className = '', style = {} }: { width?: number; height?: number; color?: string; animated?: boolean; className?: string; style?: React.CSSProperties }) {
  const bars = [0.4, 0.8, 0.55, 1, 0.7, 0.9, 0.5, 0.75, 0.45, 0.85]
  const bw = 5
  const gap = (width - bars.length * bw) / (bars.length - 1)
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} style={style}>
      {bars.map((h, i) => {
        const bh = h * height
        return (
          <rect
            key={i}
            x={i * (bw + gap)}
            y={height - bh}
            width={bw}
            height={bh}
            fill={color}
            style={animated ? { transformOrigin: `${i * (bw + gap) + bw / 2}px ${height}px`, animation: `bar-pulse ${0.7 + i * 0.08}s ease-in-out infinite`, animationDelay: `${i * 0.06}s` } : {}}
          />
        )
      })}
    </svg>
  )
}

/** Circle with inner diamond — decorative seal */
function SvgSeal({ size = 70, fill = '#003882', className = '', style = {} }: { size?: number; fill?: string; className?: string; style?: React.CSSProperties }) {
  const c = size / 2, r = c - 3
  const d = r * 0.55
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} fill="none" className={className} style={style}>
      <circle cx={c} cy={c} r={r} fill={fill} stroke="#0D0D0D" strokeWidth="2.5" />
      <polygon points={`${c},${c - d} ${c + d},${c} ${c},${c + d} ${c - d},${c}`} fill="#F5BE00" stroke="#0D0D0D" strokeWidth="1.5" />
      <circle cx={c} cy={c} r={d * 0.35} fill={fill} />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Layout primitives
// ─────────────────────────────────────────────────────────────────────────────
function Cell({ bg = '#F4EFE6', children, className = '', style = {} }: { bg?: string; children?: React.ReactNode; className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`border-ink flex items-center justify-center overflow-hidden ${className}`} style={{ backgroundColor: bg, ...style }}>
      {children}
    </div>
  )
}

function Ticker({ items }: { items: string[] }) {
  const text = items.join('  —  ')
  return (
    <div className="border-ink-bold overflow-hidden select-none" style={{ background: '#0D0D0D', borderLeft: 'none', borderRight: 'none', padding: '8px 0' }}>
      <div className="anim-marquee flex whitespace-nowrap">
        <span className="f-bebas text-lg tracking-widest pr-16" style={{ color: '#F5BE00', fontSize: '1.1rem' }}>
          {text}  —  {text}  —  {text}  —  {text}
        </span>
        <span className="f-bebas text-lg tracking-widest pr-16" style={{ color: '#F5BE00', fontSize: '1.1rem' }}>
          {text}  —  {text}  —  {text}  —  {text}
        </span>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page 1 · Hero
// ─────────────────────────────────────────────────────────────────────────────
function HeroPage() {
  return (
    <section id="hero" className="w-full" style={{ minHeight: '100vh', backgroundColor: '#F4EFE6' }}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '200px 1fr 160px 100px',
          gridTemplateRows:    '80px 1fr 140px 72px',
          border: '6px solid #0D0D0D',
          minHeight: '100vh',
        }}
      >
        {/* ── Row 1 ── */}
        <Cell bg="#F4EFE6" style={{ gridColumn: 1, gridRow: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', padding: '0 18px', gap: 2 }}>
          <p className="f-mono" style={{ fontSize: '0.6rem', color: '#888', letterSpacing: '0.1em' }}>PORTFOLIO · 2024</p>
          <p className="f-fraunces" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0D0D0D', lineHeight: 1.1 }}>陈 音悦</p>
        </Cell>

        <Cell bg="#C8271F" style={{ gridColumn: 2, gridRow: 1, gap: 28 }}>
          {['关于我', '作品集', '联系我'].map((t) => (
            <button key={t} className="f-sans"
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#F4EFE6', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.08em' }}
              onClick={() => { const m: Record<string,string> = { '关于我':'about', '作品集':'portfolio', '联系我':'contact' }; document.getElementById(m[t])?.scrollIntoView({ behavior: 'smooth' }) }}
            >{t}</button>
          ))}
        </Cell>

        {/* anim 1 — spinning vinyl */}
        <Cell bg="#F5BE00" style={{ gridColumn: 3, gridRow: 1 }}>
          <SvgVinyl size={52} className="anim-spin-cw" />
        </Cell>
        <Cell bg="#0D0D0D" style={{ gridColumn: 4, gridRow: 1 }}>
          <span className="f-mono" style={{ color: '#F5BE00', fontSize: '0.65rem', writingMode: 'vertical-rl', letterSpacing: '0.2em' }}>2024</span>
        </Cell>

        {/* ── Row 2 + 3 left: large name ── */}
        <Cell
          bg="#F4EFE6"
          style={{ gridColumn: '1 / 3', gridRow: '2 / 4', padding: '36px 40px', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-end', position: 'relative' }}
        >
          {/* anim 2 — floating cluster */}
          <SvgCluster size={72} className="anim-float" style={{ position: 'absolute', top: '12%', right: '12%', animationDelay: '0.4s' }} />
          {/* static decorations */}
          <SvgStar size={44} fill="#F5BE00" style={{ position: 'absolute', top: '40%', left: '58%' }} />
          <SvgNote size={52} fill="#C8271F" style={{ position: 'absolute', top: '18%', left: '12%' }} />

          <h1 className="f-fraunces" style={{ fontSize: 'clamp(56px,9vw,112px)', fontWeight: 900, color: '#0D0D0D', lineHeight: 0.88, letterSpacing: '-0.03em' }}>
            CHEN<br />YINYUE
          </h1>
          <p className="f-bebas mt-3" style={{ color: '#C8271F', fontSize: '1.2rem', letterSpacing: '0.25em' }}>
            流行演唱  ·  应届毕业生
          </p>
        </Cell>

        {/* ── Row 2 right ── */}
        <Cell bg="#003882" style={{ gridColumn: 3, gridRow: 2, flexDirection: 'column', gap: 12, padding: 20 }}>
          <SvgMic size={52} fill="#F4EFE6" />
          <span className="f-bebas" style={{ color: '#F5BE00', fontSize: '0.85rem', letterSpacing: '0.2em', writingMode: 'vertical-rl' }}>VOCAL</span>
        </Cell>
        <Cell bg="#F5BE00" style={{ gridColumn: 4, gridRow: '2 / 4', flexDirection: 'column', gap: 16, padding: '20px 10px' }}>
          <SvgSeal size={60} fill="#C8271F" />
          <p className="f-mono" style={{ fontSize: '0.55rem', color: '#0D0D0D', writingMode: 'vertical-rl', letterSpacing: '0.15em', marginTop: 8 }}>MUSIC IS LIFE</p>
        </Cell>

        {/* ── Row 3 mid-right ── */}
        {/* anim 3 — waveform bars */}
        <Cell bg="#C8271F" style={{ gridColumn: 3, gridRow: 3, alignItems: 'flex-end', padding: '0 16px 16px' }}>
          <SvgWave width={110} height={60} color="#F5BE00" animated />
        </Cell>

        {/* ── Row 4 ── */}
        <Cell bg="#0D0D0D" style={{ gridColumn: 1, gridRow: 4, padding: '0 18px', justifyContent: 'flex-start' }}>
          <span className="f-mono anim-blink" style={{ color: '#F5BE00', fontSize: '0.7rem', letterSpacing: '0.12em' }}>SCROLL ↓</span>
        </Cell>
        <Cell bg="#F4EFE6" style={{ gridColumn: 2, gridRow: 4, padding: '0 24px', justifyContent: 'flex-start' }}>
          <span className="f-sans" style={{ color: '#888', fontSize: '0.78rem' }}>本科毕业  ·  北京音乐学院  ·  2024</span>
        </Cell>
        <Cell bg="#C8271F" style={{ gridColumn: '3 / 5', gridRow: 4 }}>
          <span className="f-bebas" style={{ color: '#F4EFE6', fontSize: '1.4rem', letterSpacing: '0.3em' }}>POP VOCAL PERFORMANCE</span>
        </Cell>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page 2 · About & Skills
// ─────────────────────────────────────────────────────────────────────────────
const SKILLS = [
  { title: '演唱技巧', color: '#C8271F', fg: '#F4EFE6', items: ['流行美声唱法', '混声技巧', '真假声转换', '气息控制', 'R&B演唱'] },
  { title: '音乐素养', color: '#003882', fg: '#F4EFE6', items: ['乐理基础', '视唱练耳', '钢琴伴奏', '编曲概念', '音乐赏析'] },
  { title: '舞台表演', color: '#F5BE00', fg: '#0D0D0D', items: ['舞台表现力', '形体训练', 'MV拍摄经验', '现场演出', '粉丝互动'] },
  { title: '多媒体', color: '#0D0D0D', fg: '#F4EFE6', items: ['录音制作', '社交媒体运营', '内容创作', '短视频制作', '直播经验'] },
]

function SkillCard({ s, i }: { s: typeof SKILLS[0]; i: number }) {
  const [open, setOpen] = useState(false)
  return (
    <div
      onClick={() => setOpen(!open)}
      style={{
        borderRight: i < 3 ? '4px solid #0D0D0D' : 'none',
        background: open ? s.color : '#F4EFE6',
        display: 'flex', flexDirection: 'column',
        padding: '28px 24px', minHeight: 220, cursor: 'pointer',
        transition: 'background 0.3s',
      }}
    >
      <h3 className="f-fraunces" style={{ fontSize: '1.35rem', fontWeight: 700, color: open ? s.fg : '#0D0D0D', marginBottom: 16, transition: 'color 0.3s' }}>
        {s.title}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
        {s.items.map((item, j) => (
          <div key={j} className="f-sans" style={{ fontSize: '0.8rem', color: open ? s.fg : '#555', opacity: open ? 1 : 0.75, transform: open ? 'translateX(0)' : 'translateX(-6px)', transition: `all 0.25s ${j * 40}ms` }}>
            — {item}
          </div>
        ))}
      </div>
      <span className="f-mono mt-auto self-end" style={{ fontSize: '0.6rem', color: open ? s.fg : '#aaa', opacity: 0.7 }}>
        {open ? '收起 ↑' : '点击展开 ↓'}
      </span>
    </div>
  )
}

function AboutPage() {
  return (
    <section id="about" style={{ minHeight: '100vh', backgroundColor: '#F4EFE6' }}>
      <div style={{ border: '6px solid #0D0D0D', borderTop: 'none', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', borderBottom: '4px solid #0D0D0D' }}>
          <div style={{ borderRight: '4px solid #0D0D0D', padding: '22px 36px', background: '#003882' }}>
            <h2 className="f-fraunces" style={{ color: '#F4EFE6', fontSize: '2.4rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.02em' }}>关于我 / About</h2>
          </div>
          <div style={{ padding: '22px 28px', background: '#F5Be00', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* anim 1 — spinning seal */}
            <SvgSeal size={52} fill="#003882" className="anim-spin-ccw" />
            <span className="f-mono" style={{ fontSize: '0.7rem', color: '#0D0D0D' }}>PAGE 02</span>
          </div>
        </div>

        {/* bio row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px', borderBottom: '4px solid #0D0D0D' }}>
          <div style={{ borderRight: '4px solid #0D0D0D', padding: '36px 40px' }}>
            <p className="f-fraunces" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: '#C8271F', marginBottom: 12 }}>
              "用声音触碰每一颗心灵"
            </p>
            <p className="f-sans" style={{ fontSize: '0.9rem', lineHeight: 1.8, color: '#0D0D0D', maxWidth: 520 }}>
              你好！我是<strong>陈音悦</strong>，毕业于北京音乐学院流行演唱专业。四年系统学习让我在流行、R&B、电子等多种风格中都能驾驭自如。热爱舞台，享受用声音传递情感的每一个瞬间。
            </p>
            <p className="f-sans" style={{ fontSize: '0.85rem', lineHeight: 1.8, color: '#555', marginTop: 12, maxWidth: 520 }}>
              在校期间参与多场大型演出、录制原创单曲、担任校园乐队主唱，现积极寻求演唱、声优、音乐制作及演出等相关机会。
            </p>
            <div style={{ marginTop: 20, display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {['#流行演唱', '#R&B', '#舞台表演', '#原创音乐', '#声音工作者'].map((tag) => (
                <span key={tag} className="f-mono border-ink" style={{ padding: '4px 10px', fontSize: '0.65rem', background: '#F4EFE6', transition: 'all 0.2s', cursor: 'default' }}
                  onMouseEnter={e => { (e.target as HTMLElement).style.background = '#C8271F'; (e.target as HTMLElement).style.color = '#F4EFE6' }}
                  onMouseLeave={e => { (e.target as HTMLElement).style.background = '#F4EFE6'; (e.target as HTMLElement).style.color = '#0D0D0D' }}
                >{tag}</span>
              ))}
            </div>
          </div>
          <div style={{ background: '#C8271F', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, padding: 28 }}>
            {/* anim 2 — floating mic */}
            <SvgMic size={72} fill="#F4EFE6" className="anim-float" />
            <p className="f-mono" style={{ color: '#F4EFE6', fontSize: '0.7rem', textAlign: 'center', lineHeight: 1.8 }}>
              北京音乐学院<br />流行演唱 · 本科<br />2020 – 2024
            </p>
          </div>
        </div>

        {/* skills row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', flex: 1 }}>
          {SKILLS.map((s, i) => <SkillCard key={i} s={s} i={i} />)}
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page 3 · Portfolio index
// ─────────────────────────────────────────────────────────────────────────────
const PROJECTS = [
  { id: 'project1', num: '01', title: '《夏日微风》', sub: '原创单曲', color: '#C8271F', fg: '#F4EFE6', desc: '个人首张原创Pop单曲，融合清新夏日元素与R&B律动，收录于校园音乐节专辑。' },
  { id: 'project2', num: '02', title: '毕业汇演',    sub: '现场演出', color: '#003882', fg: '#F4EFE6', desc: '2024届毕业汇演主演，独唱+领唱五首曲目，现场观众逾千人，荣获年度最佳演出。' },
  { id: 'project3', num: '03', title: '声音工作室',  sub: '商业配音', color: '#F5Be00', fg: '#0D0D0D', desc: '为品牌广告及短片进行专业配音录制，涵盖角色声音设计与情感表达训练。' },
]

function ProjectRow({ p, i, onNav }: { p: typeof PROJECTS[0]; i: number; onNav: (id: string) => void }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onClick={() => onNav(p.id)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        borderBottom: i < 2 ? '4px solid #0D0D0D' : 'none',
        background: hov ? p.color : '#F4EFE6',
        display: 'grid', gridTemplateColumns: '100px 1fr 120px',
        alignItems: 'stretch', flex: 1, cursor: 'pointer', transition: 'background 0.3s',
      }}
    >
      <div style={{ borderRight: '4px solid #0D0D0D', background: hov ? '#0D0D0D' : p.color, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.3s' }}>
        <span className="f-bebas" style={{ fontSize: '2.8rem', color: hov ? p.color : p.fg }}>{p.num}</span>
      </div>
      <div style={{ padding: '26px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 8 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 14 }}>
          <h3 className="f-fraunces" style={{ fontSize: '1.6rem', fontWeight: 700, color: hov ? p.fg : '#0D0D0D', transition: 'color 0.3s' }}>{p.title}</h3>
          <span className="f-mono border-ink" style={{ padding: '2px 8px', fontSize: '0.6rem', background: 'transparent', color: hov ? p.fg : '#0D0D0D', borderColor: hov ? p.fg : '#0D0D0D', transition: 'all 0.3s' }}>{p.sub}</span>
        </div>
        <p className="f-sans" style={{ fontSize: '0.82rem', color: hov ? p.fg : '#555', maxWidth: 480, lineHeight: 1.7, transition: 'color 0.3s' }}>{p.desc}</p>
      </div>
      <div style={{ borderLeft: '4px solid #0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
        <span className="f-mono" style={{ fontSize: '0.75rem', color: hov ? p.fg : '#aaa', transform: hov ? 'translateX(6px)' : 'translateX(0)', transition: 'all 0.25s' }}>查看 →</span>
      </div>
    </div>
  )
}

function PortfolioIndexPage({ onNav }: { onNav: (id: string) => void }) {
  return (
    <section id="portfolio" style={{ minHeight: '100vh', backgroundColor: '#F4EFE6' }}>
      <div style={{ border: '6px solid #0D0D0D', borderTop: 'none', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', borderBottom: '4px solid #0D0D0D' }}>
          <div style={{ borderRight: '4px solid #0D0D0D', padding: '22px 36px', background: '#F5BE00' }}>
            <h2 className="f-fraunces" style={{ fontSize: '2.4rem', fontWeight: 900, color: '#0D0D0D', letterSpacing: '-0.02em' }}>作品集 / Works</h2>
          </div>
          <div style={{ padding: '22px 36px', background: '#0D0D0D', display: 'flex', alignItems: 'center', gap: 16 }}>
            {/* anim 1 — spinning note */}
            <SvgNote size={38} fill="#C8271F" className="anim-spin-ccw" />
            <span className="f-mono" style={{ color: '#F5BE00', fontSize: '0.75rem', letterSpacing: '0.12em' }}>PAGE 03 — 3 PROJECTS</span>
          </div>
        </div>
        {/* anim 2 — waveform in a side panel */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          {PROJECTS.map((p, i) => <ProjectRow key={i} p={p} i={i} onNav={onNav} />)}
        </div>
        {/* decorative footer row */}
        <div style={{ borderTop: '4px solid #0D0D0D', background: '#C8271F', padding: '10px 36px', display: 'flex', alignItems: 'center', gap: 16 }}>
          {/* anim 3 */}
          <SvgWave width={120} height={30} color="#F5BE00" animated />
          <span className="f-bebas" style={{ color: '#F4EFE6', fontSize: '1rem', letterSpacing: '0.3em' }}>
            ORIGINAL WORKS  ·  STAGE PERFORMANCES  ·  COMMERCIAL VOICE
          </span>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Pages 4–6 · Project detail
// ─────────────────────────────────────────────────────────────────────────────
function ProjectDetailPage({ id, num, title, sub, color, fg, accent, year, role, desc, highlights, tags, Deco }: {
  id: string; num: string; title: string; sub: string
  color: string; fg: string; accent: string
  year: string; role: string; desc: string
  highlights: string[]; tags: string[]
  Deco: React.ReactNode
}) {
  return (
    <section id={id} style={{ minHeight: '100vh', backgroundColor: '#F4EFE6' }}>
      <div style={{ border: '6px solid #0D0D0D', borderTop: 'none', minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        {/* header */}
        <div style={{ display: 'grid', gridTemplateColumns: '110px 1fr 140px', borderBottom: '4px solid #0D0D0D' }}>
          <div style={{ background: '#0D0D0D', borderRight: '4px solid #0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="f-bebas" style={{ fontSize: '3.2rem', color: accent }}>{num}</span>
          </div>
          <div style={{ background: color, padding: '20px 36px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h2 className="f-fraunces" style={{ fontSize: '2rem', fontWeight: 900, color: fg }}>{title}</h2>
            <p className="f-sans" style={{ color: fg, opacity: 0.8, fontSize: '0.85rem', marginTop: 4 }}>{sub}</p>
          </div>
          <div style={{ background: accent, borderLeft: '4px solid #0D0D0D', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {Deco}
          </div>
        </div>
        {/* body */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 260px' }}>
          <div style={{ borderRight: '4px solid #0D0D0D', padding: '40px', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#aaa', marginBottom: 10 }}>— 项目描述</p>
              <p className="f-sans" style={{ fontSize: '0.92rem', lineHeight: 1.85, color: '#0D0D0D', maxWidth: 540 }}>{desc}</p>
            </div>
            <div>
              <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#aaa', marginBottom: 12 }}>— 项目亮点</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {highlights.map((h, i) => (
                  <div key={i} className="border-ink" style={{ padding: '10px 16px', display: 'flex', alignItems: 'center', gap: 10, background: '#F4EFE6', transition: 'all 0.2s', cursor: 'default' }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = color; (e.currentTarget as HTMLElement).style.color = fg }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#F4EFE6'; (e.currentTarget as HTMLElement).style.color = '#0D0D0D' }}
                  >
                    <span style={{ color: color, fontWeight: 700, fontSize: '0.9rem', transition: 'color 0.2s' }}>✦</span>
                    <span className="f-sans" style={{ fontSize: '0.85rem' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 'auto' }}>
              {tags.map((t) => (
                <span key={t} className="f-mono border-ink" style={{ padding: '4px 10px', fontSize: '0.65rem', background: color, color: fg }}>{t}</span>
              ))}
            </div>
          </div>
          {/* right sidebar */}
          <div style={{ background: '#0D0D0D', padding: '40px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#F5Be00', marginBottom: 8 }}>— 担任角色</p>
              <p className="f-sans" style={{ fontSize: '0.85rem', color: '#F4EFE6' }}>{role}</p>
            </div>
            <div>
              <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#F5Be00', marginBottom: 8 }}>— 完成时间</p>
              <p className="f-fraunces" style={{ fontSize: '1.4rem', fontWeight: 700, color: '#F4EFE6' }}>{year}</p>
            </div>
            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <SvgVinyl size={110} className="anim-spin-cw" style={{ opacity: 0.85 }} />
            </div>
            <button className="f-sans" style={{ background: accent, color: accent === '#F5BE00' ? '#0D0D0D' : '#F4EFE6', border: '3px solid #F4EFE6', padding: '12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.05em', transition: 'opacity 0.2s' }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            >← 返回目录</button>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Page 7 · Contact
// ─────────────────────────────────────────────────────────────────────────────
function ContactPage() {
  const [copied, setCopied] = useState<string | null>(null)
  const cp = (text: string, key: string) => {
    navigator.clipboard.writeText(text).then(() => { setCopied(key); setTimeout(() => setCopied(null), 2000) })
  }

  return (
    <section id="contact" style={{ minHeight: '100vh', backgroundColor: '#F4EFE6' }}>
      <div style={{ border: '6px solid #0D0D0D', borderTop: 'none', minHeight: '100vh', display: 'grid', gridTemplateRows: 'auto 1fr auto' }}>
        {/* header */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 180px', borderBottom: '4px solid #0D0D0D' }}>
          <div style={{ borderRight: '4px solid #0D0D0D', padding: '22px 36px', background: '#C8271F' }}>
            <h2 className="f-fraunces" style={{ fontSize: '2.4rem', fontWeight: 900, fontStyle: 'italic', color: '#F4EFE6' }}>联系我 / Contact</h2>
          </div>
          <div style={{ padding: '22px 28px', background: '#F5Be00', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {/* anim 1 */}
            <SvgStar size={46} fill="#C8271F" className="anim-spin-cw" />
            <span className="f-mono" style={{ fontSize: '0.7rem', color: '#0D0D0D' }}>PAGE 07</span>
          </div>
        </div>

        {/* contact grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridTemplateRows: 'auto auto' }}>
          {/* phone */}
          <div onClick={() => cp('13800008888', 'phone')} style={{ borderRight: '4px solid #0D0D0D', borderBottom: '4px solid #0D0D0D', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#C8271F')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F4EFE6')}
          >
            {/* anim 2 — floating note */}
            <SvgNote size={44} fill="#C8271F" className="anim-float" />
            <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#aaa' }}>— 手机号码</p>
            <p className="f-fraunces" style={{ fontSize: '2rem', fontWeight: 700, color: '#0D0D0D' }}>138-0000-8888</p>
            <p className="f-mono" style={{ fontSize: '0.7rem', color: copied === 'phone' ? '#C8271F' : '#aaa' }}>{copied === 'phone' ? '✓ 已复制!' : '点击复制 →'}</p>
          </div>
          {/* email */}
          <div onClick={() => cp('yinyue.chen@email.com', 'email')} style={{ borderBottom: '4px solid #0D0D0D', padding: '48px 40px', display: 'flex', flexDirection: 'column', gap: 14, cursor: 'pointer', transition: 'background 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.background = '#003882')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F4EFE6')}
          >
            <SvgSeal size={44} fill="#003882" />
            <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#aaa' }}>— 电子邮箱</p>
            <p className="f-fraunces" style={{ fontSize: '1.6rem', fontWeight: 700, color: '#0D0D0D' }}>yinyue.chen@email.com</p>
            <p className="f-mono" style={{ fontSize: '0.7rem', color: copied === 'email' ? '#003882' : '#aaa' }}>{copied === 'email' ? '✓ 已复制!' : '点击复制 →'}</p>
          </div>
          {/* social */}
          <div style={{ borderRight: '4px solid #0D0D0D', padding: '36px 40px', background: '#003882', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#F5BE00', marginBottom: 4 }}>— 社交媒体</p>
            {['微博 @音悦chen', '抖音 @yinyue_music', 'B站 @音悦的音乐盒'].map((s) => (
              <p key={s} className="f-sans" style={{ fontSize: '0.88rem', color: '#F4EFE6', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ color: '#F5BE00' }}>✦</span> {s}
              </p>
            ))}
          </div>
          {/* status */}
          <div style={{ padding: '36px 40px', background: '#F5Be00', display: 'flex', flexDirection: 'column', gap: 12 }}>
            <p className="f-mono" style={{ fontSize: '0.65rem', letterSpacing: '0.15em', color: '#888', marginBottom: 4 }}>— 求职状态</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="anim-blink" style={{ width: 10, height: 10, background: '#C8271F', display: 'inline-block' }} />
              <span className="f-fraunces" style={{ fontSize: '1.1rem', fontWeight: 700, color: '#0D0D0D' }}>积极求职中</span>
            </div>
            <p className="f-sans" style={{ fontSize: '0.82rem', color: '#444', lineHeight: 1.8 }}>
              期望岗位：演唱 / 声优 / 音乐制作<br />
              地点偏好：北京 · 上海<br />
              可接受远程合作
            </p>
          </div>
        </div>

        {/* footer */}
        <div style={{ borderTop: '4px solid #0D0D0D', background: '#0D0D0D', padding: '14px 36px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span className="f-fraunces" style={{ color: '#F5Be00', fontSize: '1rem', fontStyle: 'italic' }}>陈音悦 · Chen Yinyue · 2024</span>
          {/* anim 3 */}
          <SvgWave width={100} height={24} color="#C8271F" animated />
          <span className="f-mono" style={{ color: '#555', fontSize: '0.65rem', letterSpacing: '0.1em' }}>POP VOCAL · 应届毕业生</span>
        </div>
      </div>
    </section>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Nav dots
// ─────────────────────────────────────────────────────────────────────────────
const PAGE_IDS = ['hero', 'about', 'portfolio', 'project1', 'project2', 'project3', 'contact']

function NavDots({ cur }: { cur: number }) {
  return (
    <div style={{ position: 'fixed', right: 18, top: '50%', transform: 'translateY(-50%)', zIndex: 100, display: 'flex', flexDirection: 'column', gap: 9 }}>
      {PAGE_IDS.map((id, i) => (
        <button key={id} onClick={() => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })}
          style={{ width: 9, height: 9, border: '2px solid #0D0D0D', background: cur === i ? '#C8271F' : '#F4EFE6', cursor: 'pointer', padding: 0, transform: cur === i ? 'scale(1.4)' : 'scale(1)', transition: 'all 0.2s' }}
        />
      ))}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Root
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [cur, setCur] = useState(0)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { if (e.isIntersecting) { const i = PAGE_IDS.indexOf(e.target.id); if (i !== -1) setCur(i) } }) },
      { threshold: 0.5 }
    )
    PAGE_IDS.forEach((id) => { const el = document.getElementById(id); if (el) obs.observe(el) })
    return () => obs.disconnect()
  }, [])

  const nav = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  const ticker1 = ['流行演唱', 'POP VOCAL', '原创音乐', 'MUSIC IS LIFE', '舞台之星', 'STAGE PERFORMER']
  const ticker2 = ['WORKS', '作品集', 'PROJECTS', '音乐作品', 'PORTFOLIO', '创作集锦']

  return (
    <div>
      <NavDots cur={cur} />
      <HeroPage />
      <Ticker items={ticker1} />
      <AboutPage />
      <Ticker items={ticker2} />
      <PortfolioIndexPage onNav={nav} />

      <ProjectDetailPage
        id="project1" num="01" title="《夏日微风》" sub="原创Pop单曲"
        color="#C8271F" fg="#F4EFE6" accent="#F5BE00" year="2023"
        role="词曲创作 / 演唱 / 录音"
        desc="《夏日微风》是我大三创作的第一首个人原创Pop单曲。灵感来源于暑假在海边的旅行，融合清新的夏日元素与轻盈的R&B律动。从词曲创作到录制完成历时三个月，最终收录于校园音乐节特辑专辑，获得师生广泛好评。"
        highlights={['独立完成词曲创作与编曲构思', '专业录音棚录制，达商业发行标准', '校园音乐节特辑收录曲目', '累计播放量破5,000次', 'MV拍摄全程参与制作']}
        tags={['#原创', '#Pop', '#R&B', '#录音棚', '#MV']}
        Deco={<SvgCluster size={64} className="anim-float" />}
      />

      <ProjectDetailPage
        id="project2" num="02" title="毕业汇演" sub="现场舞台演出"
        color="#003882" fg="#F4EFE6" accent="#C8271F" year="2024"
        role="主演 / 领唱 / 节目统筹"
        desc="2024届毕业汇演是我四年求学生涯的重要收官之作。担任晚会主演及领唱，独立完成五首曲目的舞台呈现，涵盖流行、R&B、电子三种风格。晚会现场观众逾千人，获系部年度最佳演出奖项。"
        highlights={['担任晚会主演，领唱五首曲目', '现场观众逾1,000人', '荣获系部年度最佳演出奖', '独立完成舞台造型与表演设计', '媒体报道并收录校史']}
        tags={['#舞台演出', '#流行', '#R&B', '#电子', '#最佳演出']}
        Deco={<SvgStar size={56} fill="#F5BE00" className="anim-spin-ccw" />}
      />

      <ProjectDetailPage
        id="project3" num="03" title="声音工作室" sub="商业配音项目"
        color="#F5BE00" fg="#0D0D0D" accent="#003882" year="2023–2024"
        role="配音演员 / 声音设计"
        desc="在校期间承接多个商业配音项目，包括品牌广告、短片旁白及动画角色配音。通过专业声音训练和情感表达练习，逐渐形成独特的声音辨识度，与多家制作公司建立稳定合作关系。"
        highlights={['累计完成8个商业配音项目', '涵盖广告、短片、动画多种类型', '建立个人声音档案与作品库', '与多家制作公司建立合作', '客户好评率100%']}
        tags={['#配音', '#声音设计', '#商业项目', '#广告', '#动画']}
        Deco={<SvgMic size={56} fill="#F4EFE6" className="anim-float" />}
      />

      <ContactPage />
    </div>
  )
}
