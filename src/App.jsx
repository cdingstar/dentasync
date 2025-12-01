import React, { useState } from 'react'
import Login from './pages/Login/Login'
import StatusBar from './components/StatusBar'
import Header from './components/Header'
import MenuBar from './components/MenuBar'
import Workspace from './pages/Workspace'
import Messages from './pages/Messages'
import Orders from './pages/Orders'
import My from './pages/My'
import Products from './pages/Products'
import QuickOrder from './pages/QuickOrder/QuickOrder.jsx'
import AddressManagement from './pages/AddressManagement'
import PatientArchive from './pages/PatientArchive'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [currentPage, setCurrentPage] = useState('workspace')
  const [showProducts, setShowProducts] = useState(false)
  const [productSelectCallback, setProductSelectCallback] = useState(null)
  const [selectedProductFromLibrary, setSelectedProductFromLibrary] = useState(null)
  const [showOrderSelection, setShowOrderSelection] = useState(false)
  const [ordersDefaultTab, setOrdersDefaultTab] = useState('all')

  const handlePageChange = (page) => {
    if (page === 'order') {
      setCurrentPage('order')
      setShowOrderSelection(false)
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
    setProductSelectCallback(() => (product) => {
      setSelectedProductFromLibrary({ ...product, _ts: Date.now() })
      setCurrentPage('order')
    })
    setShowProducts(true)
  }

  const openProductLibrary = () => {
    setProductSelectCallback(() => (product) => {
      setSelectedProductFromLibrary({ ...product, _ts: Date.now() })
    })
    setShowProducts(true)
  }

  const handleCloseProducts = () => {
    setShowProducts(false)
    setProductSelectCallback(null)
  }

  const handleNavigateToOrders = (defaultTab = 'all') => {
    setOrdersDefaultTab(defaultTab)
    setCurrentPage('orders')
    setShowProducts(false)
    setShowOrderSelection(false)
  }

  const handleNavigateToAddress = () => {
    setCurrentPage('address')
    setShowProducts(false)
    setShowOrderSelection(false)
  }

  const handleNavigateToPatient = () => {
    setCurrentPage('patient')
    setShowProducts(false)
    setShowOrderSelection(false)
  }

  const handleNavigateToMessages = () => {
    setCurrentPage('messages')
    setShowProducts(false)
    setShowOrderSelection(false)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'workspace':
        return <Workspace 
          onOpenProducts={handleOpenProducts} 
          onNavigateToOrders={handleNavigateToOrders}
          onNavigateToAddress={handleNavigateToAddress}
          onNavigateToPatient={handleNavigateToPatient}
          onNavigateToMessages={handleNavigateToMessages}
        />
      case 'messages':
        return <Messages />

      case 'orders':
        return <Orders defaultTab={ordersDefaultTab} onGoPlaceOrder={() => setCurrentPage('order')} />
      case 'my':
        return <My onLogout={() => setLoggedIn(false)} />
      case 'address':
        return <AddressManagement />
      case 'patient':
        return <PatientArchive />
      default:
        return <Workspace onOpenProducts={handleOpenProducts} />
    }
  }

  return (
    <div className="phone-container">
      {loggedIn ? (
        <>
          <StatusBar />
      {showProducts ? (
        <Products onClose={handleCloseProducts} onSelect={productSelectCallback} />
      ) : (
        <>
          {currentPage !== 'order' && <Header currentPage={currentPage} />}
          <div className="main-content">
            {currentPage === 'order' ? (
              <QuickOrder 
                onClose={() => setCurrentPage('workspace')} 
                onOpenProducts={openProductLibrary} 
                selectedProductFromLibrary={selectedProductFromLibrary}
                onConsumeSelectedProduct={() => setSelectedProductFromLibrary(null)}
              />
            ) : renderCurrentPage()}
          </div>
          <MenuBar currentPage={currentPage} onPageChange={handlePageChange} />
        </>
      )}
        </>
      ) : (
        <Login onSubmit={() => setLoggedIn(true)} />
      )}
    </div>
  )
}

export default App
