import React, { useState, useEffect, useRef } from 'react'
import './FilterPanel.css'

// 筛选Tab面板组件
function FilterTabPanel({ category, options, activeFilters, onSelectFilter, onResetToAll }) {
  return (
    <div className="filter-tab-panel">
      <div className="filter-panel-header">
        <span className="filter-count">
          已选择 {activeFilters.includes('all') ? 0 : activeFilters.length} 项
        </span>
        <button className="filter-reset-btn" onClick={onResetToAll}>
          重置为全部
        </button>
      </div>
      
      <div className="filter-options">
        {options.map(option => (
          <button
            key={option.value}
            className={`filter-option ${activeFilters.includes(option.value) ? 'active' : ''}`}
            onClick={() => onSelectFilter(category, option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  )
}

// 主筛选面板组件
function FilterPanel({ showFilterPanel, toggleFilterPanel, filters, selectFilter, resetFilters, applyFilters }) {
  const [activeFilterTab, setActiveFilterTab] = useState('function')
  const [selectedSuppliers, setSelectedSuppliers] = useState(['ASIANTECH PTE. LTD.'])
  const [showSupplierDropdown, setShowSupplierDropdown] = useState(false)
  const supplierSelectorRef = useRef(null)

  const suppliers = [
    'ASIANTECH PTE. LTD.',
    'DentalTech Solutions',
    'Premium Dental Co.',
    'Global Dental Supply'
  ]

  // 点击外部区域关闭供应商下拉菜单
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (supplierSelectorRef.current && !supplierSelectorRef.current.contains(event.target)) {
        setShowSupplierDropdown(false)
      }
    }

    if (showSupplierDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showSupplierDropdown])

  const toggleSupplier = (supplier) => {
    setSelectedSuppliers(prev => {
      if (prev.includes(supplier)) {
        // 如果已选择，则移除（但至少保留一个）
        return prev.length > 1 ? prev.filter(s => s !== supplier) : prev
      } else {
        // 如果未选择，则添加
        return [...prev, supplier]
      }
    })
  }

  const getSupplierDisplayText = () => {
    if (selectedSuppliers.length === 1) {
      return selectedSuppliers[0]
    } else if (selectedSuppliers.length === suppliers.length) {
      return '全部供应商'
    } else {
      return `已选择 ${selectedSuppliers.length} 个供应商`
    }
  }

  if (!showFilterPanel) return null

  return (
    <div className="filter-panel" onClick={toggleFilterPanel}>
      <div className="filter-panel-content" onClick={(e) => e.stopPropagation()}>
        <div className="filter-header">
          <h3>筛选条件</h3>
          <div className="filter-header-right">
            <button className="filter-close" onClick={toggleFilterPanel}>×</button>
          </div>
        </div>
        
        <div className="filter-content">
          {/* Tab 标签页 */}
          <div className="filter-tabs">
            <button 
              className={`filter-tab ${activeFilterTab === 'function' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('function')}
            >
              功能
            </button>
            <button 
              className={`filter-tab ${activeFilterTab === 'material' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('material')}
            >
              材质
            </button>
            <button 
              className={`filter-tab ${activeFilterTab === 'brand' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('brand')}
            >
              品牌
            </button>
            <button 
              className={`filter-tab ${activeFilterTab === 'other' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('other')}
            >
              其他
            </button>
          </div>

          {/* Tab 内容区域 */}
          <div className="filter-tab-content">
            {activeFilterTab === 'function' && (
              <FilterTabPanel 
                category="function"
                options={[
                  { value: 'all', label: '全部' },
                  { value: 'crown', label: '牙冠修复' },
                  { value: 'bridge', label: '桥体修复' },
                  { value: 'inlay', label: '嵌体填充' },
                  { value: 'veneer', label: '贴面美容' }
                ]}
                activeFilters={filters.function}
                onSelectFilter={selectFilter}
                onResetToAll={() => selectFilter('function', 'all')}
              />
            )}
            
            {activeFilterTab === 'material' && (
              <FilterTabPanel 
                category="material"
                options={[
                  { value: 'all', label: '全部' },
                  { value: 'zirconia', label: '氧化锆' },
                  { value: 'ceramic', label: '全瓷' },
                  { value: 'metal', label: '金属' },
                  { value: 'composite', label: '复合材料' }
                ]}
                activeFilters={filters.material}
                onSelectFilter={selectFilter}
                onResetToAll={() => selectFilter('material', 'all')}
              />
            )}
            
            {activeFilterTab === 'brand' && (
              <FilterTabPanel 
                category="brand"
                options={[
                  { value: 'all', label: '全部' },
                  { value: 'premium', label: 'Premium系列' },
                  { value: 'digital', label: '数码系列' },
                  { value: 'classic', label: '经典系列' },
                  { value: 'japan', label: '日本进口' }
                ]}
                activeFilters={filters.brand}
                onSelectFilter={selectFilter}
                onResetToAll={() => selectFilter('brand', 'all')}
              />
            )}
            
            {activeFilterTab === 'other' && (
              <FilterTabPanel 
                category="other"
                options={[
                  { value: 'all', label: '全部' },
                  { value: 'new', label: '新品推荐' },
                  { value: 'popular', label: '热门产品' },
                  { value: 'discount', label: '优惠产品' }
                ]}
                activeFilters={filters.other}
                onSelectFilter={selectFilter}
                onResetToAll={() => selectFilter('other', 'all')}
              />
            )}
          </div>
        </div>
        
        <div className="filter-actions">
          <button className="filter-reset" onClick={resetFilters}>重置</button>
          <button className="filter-apply" onClick={applyFilters}>应用筛选</button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
