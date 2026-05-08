import type { Win, WinsByDate, LifeArea } from './wins'
import { LIFE_AREAS } from './wins'

const WEEKDAY_LABELS = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'] as const

const MONTH_LABELS = [
  'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
  'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER',
] as const

type CalendarProps = {
  year: number
  month: number
  winsByDate: WinsByDate
  onSelectWin: (win: Win) => void
  onPreviousMonth: () => void
  onNextMonth: () => void
  onJumpToToday: () => void
}

type CalendarCell = { kind: 'day'; day: number; isoDate: string } | { kind: 'empty' }

function toIsoDate(year: number, monthIndex: number, day: number): string {
  return `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

function buildMonthGrid(year: number, month: number): CalendarCell[] {
  const firstOfMonth = new Date(year, month, 1)
  const mondayOffset = (firstOfMonth.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells: CalendarCell[] = []
  for (let i = 0; i < mondayOffset; i++) cells.push({ kind: 'empty' })
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push({ kind: 'day', day, isoDate: toIsoDate(year, month, day) })
  }
  while (cells.length % 7 !== 0) cells.push({ kind: 'empty' })
  return cells
}

export function Calendar({
  year, month, winsByDate, onSelectWin, onPreviousMonth, onNextMonth, onJumpToToday,
}: CalendarProps) {
  const cells = buildMonthGrid(year, month)
  const today = new Date()
  const todayIso = toIsoDate(today.getFullYear(), today.getMonth(), today.getDate())

  return (
    <div className="calendar">
      <header className="calendar-header">
        <div className="calendar-header-top">
          <div className="calendar-heading-group">
            <button type="button" className="calendar-nav-button" onClick={onPreviousMonth} aria-label="Previous month">
              <span aria-hidden="true">‹</span>
            </button>
            <h1 className="calendar-month">
              <button type="button" className="calendar-month-button" onClick={onJumpToToday} title="Jump to today">
                {MONTH_LABELS[month]}
              </button>
            </h1>
            <button type="button" className="calendar-nav-button" onClick={onNextMonth} aria-label="Next month">
              <span aria-hidden="true">›</span>
            </button>
          </div>
          <span className="calendar-year">• {year} •</span>
        </div>
      </header>

      <div className="calendar-grid" role="grid">
        <div className="calendar-weekday-row" role="row">
          {WEEKDAY_LABELS.map((label) => (
            <div key={label} className="calendar-weekday" role="columnheader">{label}</div>
          ))}
        </div>

        <div className="calendar-cells">
          {cells.map((cell, index) => {
            if (cell.kind === 'empty') {
              return <div key={`empty-${index}`} className="calendar-cell calendar-cell--empty" role="gridcell"><span className="calendar-empty-dot" /></div>
            }

            const wins = winsByDate[cell.isoDate] ?? []
            const isToday = cell.isoDate === todayIso

            // Collect unique areas for this day
            const areaSet = new Set<LifeArea>()
            for (const win of wins) {
              for (const area of win.areas ?? []) areaSet.add(area as LifeArea)
            }

            return (
              <div
                key={cell.isoDate}
                className={`calendar-cell${isToday ? ' calendar-cell--today' : ''}`}
                role="gridcell"
              >
                <span className={`calendar-day-number${isToday ? ' calendar-day-number--today' : ''}`}>
                  {cell.day}
                </span>

                {wins.length > 0 && (
                  <ul className="calendar-wins">
                    {wins.slice(0, 3).map((win) => (
                      <li key={win.id}>
                        <button
                          type="button"
                          className="calendar-win-title"
                          onClick={() => onSelectWin(win)}
                        >
                          {win.title}
                        </button>
                      </li>
                    ))}
                    {wins.length > 3 && (
                      <li className="calendar-wins-overflow">+{wins.length - 3} more</li>
                    )}
                  </ul>
                )}

                {/* Area presence dots */}
                {areaSet.size > 0 && (
                  <div className="calendar-area-dots">
                    {LIFE_AREAS.filter(a => a !== 'unclassified' && areaSet.has(a)).map(area => (
                      <span key={area} className={`calendar-area-dot calendar-area-dot--${area}`} />
                    ))}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
