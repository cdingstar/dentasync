import React, { useEffect, useRef, useState } from 'react'
import './Products.css'
import FilterPanel from '../components/FilterPanel'
import { productsData } from '../data/productsData'

function Products({ onClose, onSelect }) {
  const [showFilterPanel, setShowFilterPanel] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentCategory, setCurrentCategory] = useState('flash')
  const [filters, setFilters] = useState({
    function: ['all'],
    material: ['all'],
    brand: ['all'],
    other: ['all']
  })
  const categoryTabsRef = useRef(null)

  const products = productsData

  const toggleFilterPanel = () => {
    console.log('筛选按钮被点击，当前状态:', showFilterPanel)
    setShowFilterPanel(!showFilterPanel)
  }

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  const clearSearch = () => {
    setSearchQuery('')
  }

  const executeSearch = () => {
    // 这里可以添加搜索逻辑
    console.log('执行搜索:', searchQuery)
  }

  const handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') {
      executeSearch()
    }
  }

  useEffect(() => {
    const handler = (e) => {
      const { page, query } = e.detail || {}
      if (page === 'products') {
        setSearchQuery(query || '')
      }
    }
    window.addEventListener('globalSearch', handler)
    return () => window.removeEventListener('globalSearch', handler)
  }, [])

  useEffect(() => {
    const closeHandler = () => {
      setShowFilterPanel(false)
    }
    window.addEventListener('requestCloseDialogs', closeHandler)
    return () => window.removeEventListener('requestCloseDialogs', closeHandler)
  }, [])

  const scrollCategoryTabs = (direction) => {
    if (categoryTabsRef.current) {
      const scrollAmount = 120 // 每次滑动的距离
      const currentScroll = categoryTabsRef.current.scrollLeft
      const targetScroll = direction === 'left' 
        ? currentScroll - scrollAmount 
        : currentScroll + scrollAmount
      
      categoryTabsRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
    }
  }

  const selectCategory = (category) => {
    setCurrentCategory(category)
  }

  const selectFilter = (category, value) => {
    setFilters(prev => {
      const newFilters = { ...prev }
      if (value === 'all') {
        newFilters[category] = ['all']
      } else {
        const currentFilters = newFilters[category].filter(f => f !== 'all')
        if (currentFilters.includes(value)) {
          const updatedFilters = currentFilters.filter(f => f !== value)
          newFilters[category] = updatedFilters.length === 0 ? ['all'] : updatedFilters
        } else {
          newFilters[category] = [...currentFilters, value]
        }
      }
      return newFilters
    })
  }

  const resetFilters = () => {
    setFilters({
      function: ['all'],
      material: ['all'],
      brand: ['all'],
      other: ['all']
    })
  }

  const applyFilters = () => {
    setShowFilterPanel(false)
    // 这里可以添加应用筛选的逻辑
    console.log('应用筛选条件:', filters)
  }

  const orderProduct = (product) => {
    if(onSelect){
      onSelect({ title: product.title, id: product.id })
      onClose && onClose()
    } else {
      alert(`下单产品: ${product.title}`)
    }
  }

  const filteredProducts = products.filter(product => {
    if (searchQuery && !product.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false
    }
    if (currentCategory !== 'all' && product.category !== currentCategory) {
      return false
    }
    return true
  })

  return (
    <div className="products-page">
      {/* 顶部导航栏 */}
      <div className="products-header">
        <div className="header-left">
          <div className="back-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M12.5 15L7.5 10L12.5 5" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="header-title">产品库</div>
        </div>
        <div className="header-right">
          <div className="search-container">
            <input 
              type="text" 
              placeholder="产品名称" 
              value={searchQuery}
              onChange={handleSearch}
              onKeyPress={handleSearchKeyPress}
            />
            {searchQuery && (
              <div className="search-clear" onClick={clearSearch}>×</div>
            )}
            <button className="search-btn" onClick={executeSearch} aria-label="搜索">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7 12C9.76142 12 12 9.76142 12 7C12 4.23858 9.76142 2 7 2C4.23858 2 2 4.23858 2 7C2 9.76142 4.23858 12 7 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 14L10.5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>
          <div className="filter-btn" onClick={toggleFilterPanel}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M3 6h14M7 12h6M9 18h2" stroke="#333" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 筛选面板 */}
      <FilterPanel 
        showFilterPanel={showFilterPanel}
        toggleFilterPanel={toggleFilterPanel}
        filters={filters}
        selectFilter={selectFilter}
        resetFilters={resetFilters}
        applyFilters={applyFilters}
      />

      {/* 分类标签 */}
      <div className="category-tabs-container">
        <button 
          className="category-scroll-btn category-scroll-left"
          onClick={() => scrollCategoryTabs('left')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10 12L6 8L10 4" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <div className="category-tabs" ref={categoryTabsRef}>
          <div 
            className={`category-tab ${currentCategory === 'flash' ? 'active' : ''}`}
            onClick={() => selectCategory('flash')}
          >
            闪瓷系列
          </div>
          <div 
            className={`category-tab ${currentCategory === 'zirconia' ? 'active' : ''}`}
            onClick={() => selectCategory('zirconia')}
          >
            氧化锆类
          </div>
          <div 
            className={`category-tab ${currentCategory === 'metal' ? 'active' : ''}`}
            onClick={() => selectCategory('metal')}
          >
            金属类
          </div>
          <div 
            className={`category-tab ${currentCategory === 'ceramic' ? 'active' : ''}`}
            onClick={() => selectCategory('ceramic')}
          >
            铸瓷类
          </div>
          <div 
            className={`category-tab ${currentCategory === 'implant' ? 'active' : ''}`}
            onClick={() => selectCategory('implant')}
          >
            种植产品
          </div>
        </div>
        
        <button 
          className="category-scroll-btn category-scroll-right"
          onClick={() => scrollCategoryTabs('right')}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 4L10 8L6 12" stroke="#666" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      {/* 产品列表 */}
      <div className="products-content">
        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-item">
              <div className="product-image">
                <div className="product-placeholder">🦷</div>
              </div>
              <div className="product-info">
                <div className="product-title">{product.title}</div>
                <div className="product-status">{product.status}</div>
              </div>
              <div className="product-action">
                <button 
                  className="order-btn" 
                  onClick={() => orderProduct(product)}
                >
                  立即下单
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
}

export default Products
