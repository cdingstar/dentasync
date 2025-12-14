import React, { useState, useEffect, useRef } from 'react'
import './FilterPanel.css'
import { useLanguage } from '../context/LanguageContext'

// 筛选Tab面板组件
function FilterTabPanel({ category, options, activeFilters, onSelectFilter, onResetToAll }) {
  const { t } = useLanguage()
  return (
    <div className="filter-tab-panel">
      <div className="filter-panel-header">
        <span className="filter-count">
          {t('filter.selectedCount', { count: activeFilters.includes('all') ? 0 : activeFilters.length }).replace('{count}', activeFilters.includes('all') ? 0 : activeFilters.length)}
        </span>
        <button className="filter-reset-btn" onClick={onResetToAll}>
          {t('filter.resetToAll')}
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
  const { t } = useLanguage()
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
          <h3>{t('filter.title')}</h3>
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
              {t('filter.category.function')}
            </button>
            <button 
              className={`filter-tab ${activeFilterTab === 'material' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('material')}
            >
              {t('filter.category.material')}
            </button>
            <button 
              className={`filter-tab ${activeFilterTab === 'brand' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('brand')}
            >
              {t('filter.category.brand')}
            </button>
            <button 
              className={`filter-tab ${activeFilterTab === 'other' ? 'active' : ''}`}
              onClick={() => setActiveFilterTab('other')}
            >
              {t('filter.category.other')}
            </button>
          </div>

          {/* Tab 内容区域 */}
          <div className="filter-tab-content">
            {activeFilterTab === 'function' && (
              <FilterTabPanel 
                category="function"
                options={[
                  { value: 'all', label: t('filter.options.all') },
                  { value: 'crown', label: t('filter.options.crown') },
                  { value: 'bridge', label: t('filter.options.bridge') },
                  { value: 'inlay', label: t('filter.options.inlay') },
                  { value: 'veneer', label: t('filter.options.veneer') }
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
                  { value: 'all', label: t('filter.options.all') },
                  { value: 'zirconia', label: t('filter.options.zirconia') },
                  { value: 'ceramic', label: t('filter.options.ceramic') },
                  { value: 'metal', label: t('filter.options.metal') },
                  { value: 'composite', label: t('filter.options.composite') }
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
                  { value: 'all', label: t('filter.options.all') },
                  { value: 'premium', label: t('filter.options.premium') },
                  { value: 'digital', label: t('filter.options.digital') },
                  { value: 'classic', label: t('filter.options.classic') },
                  { value: 'japan', label: t('filter.options.japan') }
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
                  { value: 'all', label: t('filter.options.all') },
                  { value: 'new', label: t('filter.options.new') },
                  { value: 'popular', label: t('filter.options.popular') },
                  { value: 'discount', label: t('filter.options.discount') }
                ]}
                activeFilters={filters.other}
                onSelectFilter={selectFilter}
                onResetToAll={() => selectFilter('other', 'all')}
              />
            )}
          </div>
        </div>
        
        <div className="filter-actions">
          <button className="filter-reset" onClick={resetFilters}>{t('filter.reset')}</button>
          <button className="filter-apply" onClick={applyFilters}>{t('filter.apply')}</button>
        </div>
      </div>
    </div>
  )
}

export default FilterPanel
