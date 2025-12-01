import React, { useState, useEffect } from 'react'
import './ToothSel.css'

function ToothSel({ visible, onClose, onConfirm, initialValue, allowedTeeth = [] }) {
  const [selectedTeeth, setSelectedTeeth] = useState([])

  const topLeft = [18, 17, 16, 15, 14, 13, 12, 11]
  const topRight = [21, 22, 23, 24, 25, 26, 27, 28]
  const bottomLeft = [48, 47, 46, 45, 44, 43, 42, 41]
  const bottomRight = [31, 32, 33, 34, 35, 36, 37, 38]

  useEffect(() => {
    if (visible) {
      const vals = (initialValue || '')
        .split(',')
        .map(s => parseInt(s, 10))
        .filter(n => !Number.isNaN(n))
        .filter(n => allowedTeeth.length === 0 || allowedTeeth.includes(n))
      setSelectedTeeth(vals)
    } else {
      setSelectedTeeth([])
    }
  }, [visible, initialValue, allowedTeeth])

  const toggleTooth = (toothNumber) => {
    if (allowedTeeth.length && !allowedTeeth.includes(toothNumber)) return
    setSelectedTeeth(prev => prev.includes(toothNumber) ? prev.filter(t => t !== toothNumber) : [...prev, toothNumber])
  }

  const isToothSelected = (toothNumber) => selectedTeeth.includes(toothNumber)

  const selectAll = () => {
    const all = [...topLeft, ...topRight, ...bottomLeft, ...bottomRight]
    setSelectedTeeth(allowedTeeth.length ? all.filter(t => allowedTeeth.includes(t)) : all)
  }
  const selectUpperJaw = () => {
    const upper = [...topLeft, ...topRight]
    const inAllowed = allowedTeeth.length ? upper.filter(t => allowedTeeth.includes(t)) : upper
    const allSel = inAllowed.every(t => selectedTeeth.includes(t))
    if (allSel) setSelectedTeeth(selectedTeeth.filter(t => !inAllowed.includes(t)))
    else setSelectedTeeth(Array.from(new Set([...selectedTeeth, ...inAllowed])))
  }
  const selectLowerJaw = () => {
    const lower = [...bottomLeft, ...bottomRight]
    const inAllowed = allowedTeeth.length ? lower.filter(t => allowedTeeth.includes(t)) : lower
    const allSel = inAllowed.every(t => selectedTeeth.includes(t))
    if (allSel) setSelectedTeeth(selectedTeeth.filter(t => !inAllowed.includes(t)))
    else setSelectedTeeth(Array.from(new Set([...selectedTeeth, ...inAllowed])))
  }

  const getQuadrantDisplay = (quadrant) => {
    return selectedTeeth
      .filter(t => quadrant.includes(t))
      .map(t => t % 10)
      .sort((a, b) => b - a)
      .join('')
  }

  const Tooth = ({ number, x, y, rotation = 0 }) => {
    const selected = isToothSelected(number)
    const toothNumber = number % 10
    const is3rdTooth = toothNumber === 3
    const isUpperLeft = number === 13
    const isUpperRight = number === 23
    const isLowerLeft = number === 43
    const isLowerRight = number === 33
    const disabled = allowedTeeth.length && !allowedTeeth.includes(number)
    return (
      <g 
        transform={`translate(${x}, ${y}) rotate(${rotation})`}
        onClick={(e) => { e.stopPropagation(); toggleTooth(number) }}
        className={`tooth-group ${disabled ? 'disabled' : ''}`}
      >
        {is3rdTooth ? (
          <path
            d={
              isLowerLeft || isUpperLeft
                ? "M -27,-18 Q -31.5,-9 -28.8,0 Q -27,13.5 -22.5,22.5 Q -13.5,28.8 0,30.6 Q 13.5,28.8 22.5,22.5 Q 27,13.5 28.8,0 Q 31.5,-9 27,-18 Q 18,-27 0,-28.8 Q -18,-27 -27,-18 Z"
                : "M 27,-18 Q 31.5,-9 28.8,0 Q 27,13.5 22.5,22.5 Q 13.5,28.8 0,30.6 Q -13.5,28.8 -22.5,22.5 Q -27,13.5 -28.8,0 Q -31.5,-9 -27,-18 Q -18,-27 0,-28.8 Q 18,-27 27,-18 Z"
            }
            className={`tooth-rect ${selected ? 'selected' : ''}`}
          />
        ) : (
          <rect
            x="-30.5"
            y="-30.5"
            width="61"
            height="61"
            rx="9"
            className={`tooth-rect ${selected ? 'selected' : ''}`}
          />
        )}
        <text
          x={0}
          y={0}
          className="tooth-number"
          style={{ fill: selected ? '#fff' : '#d0d0d0' }}
        >
          {toothNumber}
        </text>
      </g>
    )
  }

  if (!visible) return null

  return (
    <div className="page-overlay">
      <div className="page-header">
        <button className="primary-btn" onClick={onClose}>返回</button>
        <div className="page-title">选择牙位</div>
        <button className="primary-btn" onClick={() => { onConfirm(selectedTeeth); onClose() }}>确定</button>
      </div>
      <div className="page-body">
        <div className="teeth-diagram-wrapper">
          <svg width="500" height="500" viewBox="0 0 1000 1000">
            <Tooth number={18} x={180} y={448} rotation={-85} />
            <Tooth number={17} x={180} y={358} rotation={-80} />
            <Tooth number={16} x={185} y={268} rotation={-70} />
            <Tooth number={15} x={200} y={183} rotation={-55} />
            <Tooth number={14} x={235} y={113} rotation={-40} />
            <Tooth number={13} x={295} y={68} rotation={-25} />
            <Tooth number={12} x={370} y={43} rotation={-12} />
            <Tooth number={11} x={455} y={33} rotation={-3} />
            <Tooth number={21} x={545} y={33} rotation={3} />
            <Tooth number={22} x={630} y={43} rotation={12} />
            <Tooth number={23} x={705} y={68} rotation={25} />
            <Tooth number={24} x={765} y={113} rotation={40} />
            <Tooth number={25} x={800} y={183} rotation={55} />
            <Tooth number={26} x={815} y={268} rotation={70} />
            <Tooth number={27} x={820} y={358} rotation={80} />
            <Tooth number={28} x={820} y={448} rotation={85} />
            <Tooth number={48} x={180} y={552} rotation={-95} />
            <Tooth number={47} x={180} y={642} rotation={-100} />
            <Tooth number={46} x={185} y={732} rotation={-110} />
            <Tooth number={45} x={200} y={817} rotation={-125} />
            <Tooth number={44} x={235} y={887} rotation={-140} />
            <Tooth number={43} x={295} y={932} rotation={-155} />
            <Tooth number={42} x={370} y={957} rotation={-168} />
            <Tooth number={41} x={455} y={967} rotation={-177} />
            <Tooth number={31} x={545} y={967} rotation={177} />
            <Tooth number={32} x={630} y={957} rotation={168} />
            <Tooth number={33} x={705} y={932} rotation={155} />
            <Tooth number={34} x={765} y={887} rotation={140} />
            <Tooth number={35} x={800} y={817} rotation={125} />
            <Tooth number={36} x={815} y={732} rotation={110} />
            <Tooth number={37} x={820} y={642} rotation={100} />
            <Tooth number={38} x={820} y={552} rotation={95} />
            <line x1="300" y1="500" x2="700" y2="500" stroke="#d9d9d9" strokeWidth="2" strokeDasharray="8,4" />
            <line x1="500" y1="300" x2="500" y2="700" stroke="#d9d9d9" strokeWidth="2" />
            <text x="440" y="440" className="selected-numbers-svg" textAnchor="end">{getQuadrantDisplay(topLeft)}</text>
            <text x="560" y="440" className="selected-numbers-svg" textAnchor="start">{getQuadrantDisplay(topRight)}</text>
            <text x="440" y="570" className="selected-numbers-svg" textAnchor="end">{getQuadrantDisplay(bottomLeft)}</text>
            <text x="560" y="570" className="selected-numbers-svg" textAnchor="start">{getQuadrantDisplay(bottomRight)}</text>
          </svg>
        </div>
        <div className="quick-actions">
          <div className="quick-actions-left">
            <button className="primary-btn" onClick={selectAll}>🦷 全口</button>
            <button className="primary-btn" onClick={selectUpperJaw}>🦷 上颌</button>
            <button className="primary-btn" onClick={selectLowerJaw}>🦷 下颌</button>
          </div>
          <div className="quick-actions-right">
            <button className="secondary-btn" onClick={onClose}>取消</button>
            <button className="primary-btn" onClick={() => { onConfirm(selectedTeeth); onClose() }}>确定</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToothSel
