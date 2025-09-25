import React, { useState } from 'react'
import StatusBar from './components/StatusBar'
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import Workspace from './pages/Workspace'
import Messages from './pages/Messages'
import Orders from './pages/Orders'
import More from './pages/More'
import Products from './pages/Products'
import OrderSelection from './pages/OrderSelection'
import './App.css'

function App() {
  const [currentPage, setCurrentPage] = useState('workspace')
  const [showProducts, setShowProducts] = useState(false)
  const [showOrderSelection, setShowOrderSelection] = useState(false)
  const [ordersDefaultTab, setOrdersDefaultTab] = useState('all')

  const handlePageChange = (page) => {
    if (page === 'order') {
      // 点击底部菜单的"下单"按钮，显示OrderSelection
      setShowOrderSelection(true)
      return
    }
    setCurrentPage(page)
    setShowProducts(false)
    setShowOrderSelection(false)
  }

  const closeOrderSelection = () => {
    setShowOrderSelection(false)
  }

  const handleOpenProducts = () => {
    setShowProducts(true)
  }

  const handleCloseProducts = () => {
    setShowProducts(false)
  }

  const handleNavigateToOrders = (defaultTab = 'all') => {
    setOrdersDefaultTab(defaultTab)
    setCurrentPage('orders')
    setShowProducts(false)
    setShowOrderSelection(false)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'workspace':
        return <Workspace 
          onOpenProducts={handleOpenProducts} 
          onNavigateToOrders={handleNavigateToOrders}
        />
      case 'messages':
        return <Messages />

      case 'orders':
        return <Orders defaultTab={ordersDefaultTab} />
      case 'more':
        return <More />
      default:
        return <Workspace onOpenProducts={handleOpenProducts} />
    }
  }

  return (
    <div className="phone-container">
      <StatusBar />
      
      {showProducts ? (
        <Products onClose={handleCloseProducts} />
      ) : showOrderSelection ? (
        <OrderSelection 
          onClose={closeOrderSelection}
          productName="订单选择"
        />
      ) : (
        <>
          <Header currentPage={currentPage} />
          <div className="main-content">
            {renderCurrentPage()}
          </div>
          <MenuBar currentPage={currentPage} onPageChange={handlePageChange} />
        </>
      )}
    </div>
  )
}

export default App