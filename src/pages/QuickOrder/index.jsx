import React, { useState, useEffect, useRef } from 'react'
import Select from '../../components/Select'
import ToothSel from '../../components/ToothSel'
import './QuickOrder.css'
import BaseInfoSection from './components/BaseInfoSection'
import PatientInfoSection from './components/PatientInfoSection'
import AppDesignSchemeModal from '../../components/AppDesignSchemeModal'
import { useLanguage } from '../../context/LanguageContext'

function QuickOrder({ onClose, onOpenProducts, selectedProductFromLibrary, onConsumeSelectedProduct }) {
  const { t } = useLanguage()
  const [form, setForm] = useState({
    clinic: 'ASIANTECH PTE. LTD.',
    doctor: '黄向荣',
    factory: 'f1',
    receiver: '',
    address: '',
    patientName: '',
    patientPhone: '',
    gender: '',
    age: ''
  })
  const [products, setProducts] = useState([])
  const [colors, setColors] = useState([
    { id: 1, tooth: '', mainColor: '', neckColor: '', middleColor: '', cuttingEdgeColor: '', baseColor: '', toothBodyColor: '', customColor: '' }
  ])
  const [designSchemes, setDesignSchemes] = useState({})
  const [attachments, setAttachments] = useState([])
  const [scrollToProductId, setScrollToProductId] = useState(null)
  const [uploadedImages, setUploadedImages] = useState([])
  const [uploadedFiles, setUploadedFiles] = useState([])
  const [uploaded3DFiles, setUploaded3DFiles] = useState([])

  const [activeProductId, setActiveProductId] = useState(null)
  const [showProductSelector, setShowProductSelector] = useState(false)
  const [showToothSelector, setShowToothSelector] = useState(false)
  const [toothEditing, setToothEditing] = useState({ type: null, id: null })
  const [librarySelectForProductId, setLibrarySelectForProductId] = useState(null)
  const [pendingProductNames, setPendingProductNames] = useState({})
  const [showColorSelector, setShowColorSelector] = useState(false)
  const [colorEditing, setColorEditing] = useState({ id: null, field: null })
  const [showDesign, setShowDesign] = useState(false)
  const [showAttachmentSelector, setShowAttachmentSelector] = useState(false)
  const [tempAttachments, setTempAttachments] = useState([])
  const [activeColorTab, setActiveColorTab] = useState('vita-classic')

  const [implantParamsList, setImplantParamsList] = useState([])
  const [implantParamsVisible, setImplantParamsVisible] = useState(false)
  const [pendingProduct, setPendingProduct] = useState(null)
  const [editingImplantParams, setEditingImplantParams] = useState(null)
  const [currentProductId, setCurrentProductId] = useState(null)

  const isBaseColorField = colorEditing.field === 'baseColor'
  const vitaClassicColors = {
    A: ['A1','A2','A3','A3.5','A4'],
    B: ['B1','B2','B3','B4'],
    C: ['C1','C2','C3','C4'],
    D: ['D2','D3','D4']
  }
  const vita3DMasterColors = {
    '1': ['1M1','1M2'],
    '2': ['2L1.5','2L2.5','2M1','2M2','2M3','2R1.5','2R2.5'],
    '3': ['3L1.5','3L2.5','3M1','3M2','3M3','3R1.5','3R2.5'],
    '4': ['4L1.5','4L2.5','4M1','4M2','4M3','4R1.5','4R2.5'],
    '5': ['5M1','5M2','5M3']
  }
  const specialColors = [
    { id: 'fluorosis', label: t('quickOrder.specialColors.fluorosis') },
    { id: 'tetracycline', label: t('quickOrder.specialColors.tetracycline') },
    { id: 'metal-post', label: t('quickOrder.specialColors.metalPost') },
    { id: 'fiber-post', label: t('quickOrder.specialColors.fiberPost') }
  ]

  const updateForm = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const addProduct = () => setProducts(prev => ([...prev, { id: prev.length + 1, name: t('quickOrder.clickToSelect'), tooth: '', molding: 'normal', scan: '', connection: 'single', repair: 'new' }]))
  const updateProduct = (id, k, v) => setProducts(prev => prev.map(p => p.id === id ? { ...p, [k]: v } : p))
  const deleteProduct = (id) => setProducts(prev => prev.filter(p => p.id !== id))
  const addColor = () => setColors(prev => ([...prev, { id: prev.length + 1, tooth: '', mainColor: '', neckColor: '', middleColor: '', cuttingEdgeColor: '', baseColor: '', toothBodyColor: '', customColor: '' }]))
  const updateColor = (id, k, v) => setColors(prev => prev.map(c => c.id === id ? { ...c, [k]: v } : c))
  const deleteColor = (id) => setColors(prev => prev.filter(c => c.id !== id))
  const removeDesign = (category) => setDesignSchemes(prev => { const n={...prev}; delete n[category]; return n })
  const removeAttachment = (name) => setAttachments(prev => prev.filter(a => a.name !== name))

  const submit = () => {
    Object.entries(pendingProductNames).forEach(([id, name]) => {
      updateProduct(Number(id), 'name', name)
    })
    setPendingProductNames({})
    onClose && onClose()
  }

  const save = () => {
    console.info('Save Draft', { form, products, colors, attachments })
    alert(t('quickOrder.savedDraft'))
  }
  const reset = () => {
    setForm({ clinic: 'ASIANTECH PTE. LTD.', doctor: '黄向荣', factory: 'f1', receiver: '', address: '', patientName: '', patientPhone: '', gender: '', age: '' })
    setProducts([])
    setColors([{ id: 1, tooth: '', mainColor: '', neckColor: '', middleColor: '', cuttingEdgeColor: '', baseColor: '', toothBodyColor: '', customColor: '' }])
  }

  const lastConsumedSigRef = useRef(null)
  useEffect(() => {
    if (selectedProductFromLibrary) {
      const name = selectedProductFromLibrary.title || selectedProductFromLibrary.name
      const sig = `${selectedProductFromLibrary.id || name}-${selectedProductFromLibrary._ts || ''}`
      if (lastConsumedSigRef.current === sig) return
      if (librarySelectForProductId) {
        setPendingProductNames(prev => ({ ...prev, [librarySelectForProductId]: name }))
        if (String(name).includes('种植')) {
          setCurrentProductId(librarySelectForProductId)
          setPendingProduct({ name, key: selectedProductFromLibrary.id, productCode: selectedProductFromLibrary.productCode })
          setEditingImplantParams(null)
          setImplantParamsVisible(true)
        }
        setLibrarySelectForProductId(null)
      } else {
        setProducts(prev => {
          const nextId = prev.length + 1
          setScrollToProductId(nextId)
          return [...prev, { id: nextId, name, tooth: '', molding: 'normal', scan: '', connection: 'single', repair: 'new' }]
        })
        if (String(name).includes('种植')) {
          setCurrentProductId(products.length + 1)
          setPendingProduct({ name, key: selectedProductFromLibrary.id, productCode: selectedProductFromLibrary.productCode })
          setEditingImplantParams(null)
          setImplantParamsVisible(true)
        }
      }
      lastConsumedSigRef.current = sig
      onConsumeSelectedProduct && onConsumeSelectedProduct()
      setTimeout(() => { lastConsumedSigRef.current = null }, 100)
    }
  }, [selectedProductFromLibrary, onConsumeSelectedProduct, librarySelectForProductId])

  useEffect(() => {
    if (scrollToProductId) {
      const el = document.getElementById(`product-item-${scrollToProductId}`)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
      setScrollToProductId(null)
    }
  }, [scrollToProductId, products])

  useEffect(() => {
    if (showAttachmentSelector) {
      setTempAttachments(attachments)
    }
  }, [showAttachmentSelector, attachments])

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const next = files.map(file => ({ name: file.name, url: URL.createObjectURL(file) }))
    setUploadedImages(prev => [...prev, ...next])
    e.target.value = ''
  }

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const next = files.map(file => ({ name: file.name }))
    setUploadedFiles(prev => [...prev, ...next])
    e.target.value = ''
  }

  const handle3DUpload = (e) => {
    const files = Array.from(e.target.files || [])
    const next = files.map(file => ({ name: file.name }))
    setUploaded3DFiles(prev => [...prev, ...next])
    e.target.value = ''
  }

  const removeImage = (idx) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== idx))
  }
  const removeFile = (idx) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== idx))
  }
  const remove3DFile = (idx) => {
    setUploaded3DFiles(prev => prev.filter((_, i) => i !== idx))
  }

  const moldingOptions = [
    { label: t('quickOrder.options.molding.normal'), value: 'normal' },
    { label: t('quickOrder.options.molding.digital'), value: 'digital' }
  ]
  const connectionOptions = [
    { label: t('quickOrder.options.connection.single'), value: 'single' },
    { label: t('quickOrder.options.connection.bridge'), value: 'bridge' }
  ]
  const repairOptions = [
    { label: t('quickOrder.options.repair.new'), value: 'new' },
    { label: t('quickOrder.options.repair.repair'), value: 'repair' },
    { label: t('quickOrder.options.repair.redo'), value: 'redo' }
  ]

  return (
    <div className="quick-order-page">
      <div className="qo-header">
        <div className="qo-title">{t('quickOrder.title')}</div>
        <div className="qo-header-right">
          <button className="qo-secondary" onClick={onClose}>{t('quickOrder.back')}</button>
        </div>
      </div>

      <div className="qo-body">
        <BaseInfoSection form={form} updateForm={updateForm} />

        <PatientInfoSection form={form} updateForm={updateForm} />

        {/* 产品信息 */}
        <div className="qo-section">
          <div className="qo-section-title">{t('quickOrder.productInfo')}（{products.length}）</div>
          <div className="qo-section-content">
            <button className="qo-secondary" onClick={()=>{
              onOpenProducts && onOpenProducts()
            }}>{t('quickOrder.addProduct')}</button>
            {products.map(p => (
              <div key={p.id} id={`product-item-${p.id}`} className="qo-product-item">
                <div className="qo-row"><div className="qo-label">{t('quickOrder.productName')}</div><button className="qo-secondary" onClick={()=>{setActiveProductId(p.id);setLibrarySelectForProductId(p.id);onOpenProducts && onOpenProducts()}}>{pendingProductNames[p.id] || p.name}</button></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.toothPosition')}</div>
                  <button className="qo-secondary" onClick={()=>{setToothEditing({type:'product',id:p.id});setShowToothSelector(true)}}>
                    {p.tooth ? (
                      <span className="tooth-grid">
                        {renderToothGrid(p.tooth)}
                      </span>
                    ) : t('quickOrder.selectTooth')}
                  </button>
                </div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.molding')}</div><Select className="qo-select" value={p.molding} onChange={(v)=>updateProduct(p.id,'molding',v)} options={moldingOptions} /></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.scan')}</div><input className="qo-input" value={p.scan} onChange={(e)=>updateProduct(p.id,'scan',e.target.value)} placeholder={t('quickOrder.scanPlaceholder')} /></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.connection')}</div><Select className="qo-select" value={p.connection} onChange={(v)=>updateProduct(p.id,'connection',v)} options={connectionOptions} /></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.repair')}</div><Select className="qo-select" value={p.repair} onChange={(v)=>updateProduct(p.id,'repair',v)} options={repairOptions} /></div>
                <button className="qo-secondary" onClick={()=>deleteProduct(p.id)}>{t('common.delete')}</button>
              </div>
            ))}
          </div>
        </div>

        {implantParamsList.length > 0 && (
          <div className="qo-section">
            <div className="qo-section-title">{t('quickOrder.implantParams')}（{implantParamsList.length}）</div>
            <div className="qo-section-content">
              <div className="product-table-container">
                <table className="product-table" style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr>
                      <th style={{width:80,textAlign:'left',borderBottom:'1px solid #f0f0f0',padding:'8px 0'}}>{t('common.no')}</th>
                      <th style={{textAlign:'left',borderBottom:'1px solid #f0f0f0',padding:'8px 0'}}>{t('quickOrder.implantParams')}</th>
                      <th style={{width:120,textAlign:'left',borderBottom:'1px solid #f0f0f0',padding:'8px 0'}}>{t('common.action')}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {implantParamsList.map((item) => (
                      <tr key={item.productId}>
                        <td style={{padding:'8px 0'}}>{item.productId}</td>
                        <td style={{padding:'8px 0'}}>
                          <div style={{ fontSize: 13, lineHeight: '1.8' }}>
                            <div>{t('quickOrder.implantSystem')}：{item.params?.implantSystem || '-'}</div>
                            <div>{t('quickOrder.implantModel')}：{item.params?.implantModel || '-'}</div>
                            <div>{t('quickOrder.healingCapDiameter')}：{item.params?.healingCapDiameter || '-'}</div>
                            <div>{t('quickOrder.impressionPost')}：{item.params?.impressionPost || '-'}</div>
                            <div>{t('quickOrder.repairMethod')}：{item.params?.repairMethod || '-'}</div>
                          </div>
                        </td>
                        <td style={{padding:'8px 0'}}>
                          <button className="qo-secondary" onClick={()=>{
                            setEditingImplantParams(item); setCurrentProductId(item.productId); setImplantParamsVisible(true)
                          }} style={{marginRight:8}}>{t('common.edit')}</button>
                          <button className="qo-secondary" onClick={()=>{
                            setImplantParamsList(prev=>prev.filter(x=>x.productId!==item.productId))
                          }}>{t('common.delete')}</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 颜色设定 */}
        <div className="qo-section">
          <div className="qo-section-title">{t('quickOrder.colorSettings')}</div>
          <div className="qo-section-content">
            <button className="qo-secondary" onClick={addColor}>{t('quickOrder.addColor')}</button>
            {colors.map(c => (
              <div key={c.id} className="qo-product-item">
                <div className="qo-row"><div className="qo-label">{t('quickOrder.toothPosition')}</div>
                  <button className="qo-secondary" onClick={()=>{setToothEditing({type:'color',id:c.id});setShowToothSelector(true)}}>
                    {c.tooth ? (
                      <span className="tooth-grid">
                        {renderToothGrid(c.tooth)}
                      </span>
                    ) : t('quickOrder.selectTooth')}
                  </button>
                </div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.mainColor')}</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'mainColor'});setShowColorSelector(true)}}>{c.mainColor||t('quickOrder.clickToSelect')}</button></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.neckColor')}</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'neckColor'});setShowColorSelector(true)}}>{c.neckColor||t('quickOrder.clickToSelect')}</button></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.middleColor')}</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'middleColor'});setShowColorSelector(true)}}>{c.middleColor||t('quickOrder.clickToSelect')}</button></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.cuttingEdgeColor')}</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'cuttingEdgeColor'});setShowColorSelector(true)}}>{c.cuttingEdgeColor||t('quickOrder.clickToSelect')}</button></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.baseColor')}</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'baseColor'});setShowColorSelector(true)}}>{c.baseColor||t('quickOrder.clickToSelect')}</button></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.toothBodyColor')}</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'toothBodyColor'});setShowColorSelector(true)}}>{c.toothBodyColor||t('quickOrder.clickToSelect')}</button></div>
                <div className="qo-row"><div className="qo-label">{t('quickOrder.customColor')}</div><input className="qo-input" value={c.customColor} onChange={(e)=>updateColor(c.id,'customColor',e.target.value)} /></div>
                <button className="qo-secondary" onClick={()=>deleteColor(c.id)}>{t('common.delete')}</button>
              </div>
            ))}
          </div>
        </div>

        {/* 其他设置 */}
        <div className="qo-section">
          <div className="qo-section-title">{t('quickOrder.otherSettings')}</div>
          <div className="qo-section-content">
            <div className="qo-row"><div className="qo-label">{t('quickOrder.trialStatus')}</div><Select className="qo-select" value={form.trialStatus} onChange={(v)=>updateForm('trialStatus',v)} placeholder={t('common.selectPlaceholder')} options={[
              { label: t('quickOrder.options.trial.wax'), value: 'wax' },
              { label: t('quickOrder.options.trial.inner'), value: 'inner' },
              { label: t('quickOrder.options.trial.color'), value: 'color' },
              { label: t('quickOrder.options.trial.ceramic'), value: 'ceramic' },
              { label: t('quickOrder.options.trial.abutment'), value: 'abutment' },
              { label: t('quickOrder.options.trial.waxAbutment'), value: 'waxAbutment' }
            ]} /></div>
            <div className="qo-row"><div className="qo-label">{t('quickOrder.designScheme')}</div><button className="qo-secondary" onClick={()=>setShowDesign(true)}>{t('quickOrder.selectScheme')}</button></div>
            <div className="qo-row"><div className="qo-label">{t('quickOrder.selectedScheme')}</div><div className="list" style={{flex:1}}>{Object.values(designSchemes).map(s=> <div key={s.id} className="list-item"><span>{s.name}</span><button className="qo-secondary" onClick={()=>removeDesign(s.category)}>{t('quickOrder.remove')}</button></div>)}</div></div>
            <div className="qo-row"><div className="qo-label">{t('quickOrder.selectAttachment')}</div><button className="qo-secondary" onClick={()=>setShowAttachmentSelector(true)}>{t('quickOrder.selectAttachment')}</button></div>
            <div className="qo-row"><div className="qo-label">{t('quickOrder.selectedAttachment')}</div><div className="list" style={{flex:1}}>{attachments.map(a=> <div key={a.name} className="list-item"><span>{a.name} * {a.count}</span><button className="qo-secondary" onClick={()=>removeAttachment(a.name)}>{t('quickOrder.remove')}</button></div>)}</div></div>
            <div className="qo-row"><div className="qo-label">{t('quickOrder.remark')}</div><input className="qo-input" value={form.remark || ''} onChange={(e)=>updateForm('remark', e.target.value)} placeholder={t('quickOrder.remarkPlaceholder')} /></div>

            <div className="qo-row"><div className="qo-label">{t('quickOrder.imageUpload')}</div>
              <div style={{flex:1}}>
                <div className="list" style={{marginBottom:8}}>
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="list-item" style={{gap:12}}>
                      <img src={img.url} alt={img.name} style={{width:48,height:48,borderRadius:6,objectFit:'cover'}} />
                      <span style={{flex:1}}>{img.name}</span>
                      <button className="qo-secondary" onClick={()=>removeImage(idx)}>{t('quickOrder.remove')}</button>
                    </div>
                  ))}
                </div>
                <label className="qo-secondary" style={{display:'inline-block',cursor:'pointer'}}>
                  + {t('quickOrder.imageUpload')}
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display:'none'}} />
                </label>
              </div>
            </div>

            <div className="qo-row"><div className="qo-label">{t('quickOrder.fileUpload')}</div>
              <div style={{flex:1}}>
                <div className="list" style={{marginBottom:8}}>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="list-item" style={{gap:12}}>
                      <span style={{flex:1}}>{file.name}</span>
                      <button className="qo-secondary" onClick={()=>removeFile(idx)}>{t('quickOrder.remove')}</button>
                    </div>
                  ))}
                </div>
                <label className="qo-secondary" style={{display:'inline-block',cursor:'pointer'}}>
                  + {t('quickOrder.fileUpload')}

                  <input type="file" multiple onChange={handleFileUpload} style={{display:'none'}} />
                </label>
              </div>
            </div>

            <div className="qo-row"><div className="qo-label">{t('quickOrder.3dUpload')}</div>
              <div style={{flex:1}}>
                <div className="list" style={{marginBottom:8}}>
                  {uploaded3DFiles.map((file, idx) => (
                    <div key={idx} className="list-item" style={{gap:12}}>
                      <span style={{flex:1}}>{file.name}</span>
                      <button className="qo-secondary" onClick={()=>remove3DFile(idx)}>{t('quickOrder.remove')}</button>
                    </div>
                  ))}
                </div>
                <label className="qo-secondary" style={{display:'inline-block',cursor:'pointer'}}>
                  + {t('quickOrder.3dUpload')}
                  <input type="file" multiple onChange={handle3DUpload} style={{display:'none'}} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="qo-actions">
        <button className="qo-primary" onClick={submit}>{t('quickOrder.submit')}</button>
        <button className="qo-secondary" onClick={save}>{t('common.save')}</button>
        <button className="qo-secondary" onClick={reset}>{t('quickOrder.reset')}</button>
      </div>

      {showProductSelector && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>setShowProductSelector(false)}>{t('common.back')}</button>
            <div className="page-title">{t('quickOrder.selectProduct')}</div>
            <button className="primary-btn" onClick={()=>setShowProductSelector(false)}>{t('common.confirm')}</button>
          </div>
          <div className="page-body">
            <div className="list">
              {[
                {id:'p1',name:t('quickOrder.localList.p1'),productCode:'D1'},
                {id:'p2',name:t('quickOrder.localList.p2'),productCode:'VP'},
                {id:'p3',name:t('quickOrder.localList.p3'),productCode:'PFM'},
                {id:'p4',name:t('quickOrder.localList.p4'),productCode:'IMPLANT'}
              ].map(item=> (
                <div key={item.id} className="list-item">
                  <div>{item.name}</div>
                  <button className="qo-secondary" onClick={()=>{
                    if(activeProductId){
                      updateProduct(activeProductId,'name',item.name)
                      if (String(item.name).includes('种植') || String(item.productCode) === 'IMPLANT') {
                        setCurrentProductId(activeProductId)
                        setPendingProduct({ name: item.name, key: item.id, productCode: item.productCode })
                        setEditingImplantParams(null)
                        setImplantParamsVisible(true)
                      }
                    }
                  }}>{t('common.select')}</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showToothSelector && (
        <ToothSel
          visible={showToothSelector}
          onClose={() => setShowToothSelector(false)}
          initialValue={(function(){
            if (toothEditing.type === 'product') {
              return (products.find(p => p.id === toothEditing.id)?.tooth || '')
            }
            const set = new Set()
            products.forEach(p => {
              String(p.tooth||'').split(',').filter(Boolean).forEach(t => set.add(t))
            })
            return Array.from(set).join(',')
          })()}
          allowedTeeth={(function(){
            const set = new Set()
            products.forEach(p => {
              String(p.tooth||'').split(',').filter(Boolean).forEach(t => {
                const n = parseInt(t,10); if(!Number.isNaN(n)) set.add(n)
              })
            })
            return Array.from(set)
          })()}
          onConfirm={(codes) => {
            const nextStr = codes.map(c => String(c)).join(',')
            if (toothEditing.type === 'product') updateProduct(toothEditing.id, 'tooth', nextStr)
            else updateColor(toothEditing.id, 'tooth', nextStr)
          }}
        />
      )}

      {showColorSelector && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>setShowColorSelector(false)}>{t('common.back')}</button>
            <div className="page-title">{t('quickOrder.selectColor')}</div>
            <button className="primary-btn" onClick={()=>setShowColorSelector(false)}>{t('common.confirm')}</button>
          </div>
          <div className="page-body">
            <div className="list" style={{flexDirection:'row',gap:8,marginBottom:12}}>
              <button className={`grid-btn ${activeColorTab==='vita-classic'?'active':''}`} onClick={()=>setActiveColorTab('vita-classic')}>{t('quickOrder.colorTabs.vitaClassic')}</button>
              <button className={`grid-btn ${activeColorTab==='vita-3d'?'active':''}`} onClick={()=>setActiveColorTab('vita-3d')}>{t('quickOrder.colorTabs.vita3d')}</button>
              <button className={`grid-btn ${activeColorTab==='special'?'active':''}`} onClick={()=>isBaseColorField && setActiveColorTab('special')} disabled={!isBaseColorField}>{t('quickOrder.colorTabs.special')}</button>
              <button className={`grid-btn ${activeColorTab==='image'?'active':''}`} onClick={()=>setActiveColorTab('image')}>{t('quickOrder.colorTabs.image')}</button>
            </div>

            {activeColorTab==='vita-classic' && (
              <div className="list">
                {Object.entries(vitaClassicColors).map(([group, cols]) => (
                  <div key={group} className="list-item" style={{display:'block'}}>
                    <div style={{marginBottom:6,fontWeight:600}}>{group}</div>
                    <div className="grid" style={{gridTemplateColumns:'repeat(5,1fr)'}}>
                      {cols.map(c => (
                        <button key={c} className="grid-btn" onClick={()=>{ if(colorEditing.id){ updateColor(colorEditing.id, colorEditing.field, c); setShowColorSelector(false) } }}>{c}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeColorTab==='vita-3d' && (
              <div className="list">
                {Object.entries(vita3DMasterColors).map(([group, cols]) => (
                  <div key={group} className="list-item" style={{display:'block'}}>
                    <div style={{marginBottom:6,fontWeight:600}}>{group}</div>
                    <div className="grid" style={{gridTemplateColumns:'repeat(7,1fr)'}}>
                      {cols.map(c => (
                        <button key={c} className="grid-btn" onClick={()=>{ if(colorEditing.id){ updateColor(colorEditing.id, colorEditing.field, c); setShowColorSelector(false) } }}>{c}</button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeColorTab==='special' && (
              <div className="grid" style={{gridTemplateColumns:'repeat(2,1fr)'}}>
                {specialColors.map(s => (
                  <button key={s.id} className="grid-btn" onClick={()=>{ if(colorEditing.id){ updateColor(colorEditing.id, colorEditing.field, s.label); setShowColorSelector(false) } }}>{s.label}</button>
                ))}
              </div>
            )}

            {activeColorTab==='image' && (
              <div>
                <label className="qo-secondary" style={{display:'inline-block',cursor:'pointer'}}>
                  {t('quickOrder.uploadImage')}
                  <input type="file" accept="image/*" onChange={(e)=>{
                    const f = (e.target.files||[])[0]
                    if (f && colorEditing.id) {
                      updateColor(colorEditing.id, colorEditing.field, `Image:${f.name}`)
                      setShowColorSelector(false)
                      e.target.value=''
                    }
                  }} style={{display:'none'}} />
                </label>
                <p style={{fontSize:12,color:'#666',marginTop:8}}>{t('quickOrder.imageUploadNote')}</p>
              </div>
            )}
          </div>
        </div>
      )}

      <AppDesignSchemeModal
        visible={showDesign}
        onClose={() => setShowDesign(false)}
        onConfirm={(schemes) => setDesignSchemes(schemes)}
        initialSelection={designSchemes}
      />

      {showAttachmentSelector && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>setShowAttachmentSelector(false)}>{t('common.back')}</button>
            <div className="page-title">{t('quickOrder.selectAttachment')}</div>
            <button className="primary-btn" onClick={()=>{ setAttachments(tempAttachments); setShowAttachmentSelector(false) }}>{t('common.confirm')}</button>
          </div>
          <div className="page-body">
            <div className="list" style={{marginBottom:12}}>
              {tempAttachments.map(item => (
                <div key={item.name} className="list-item">
                  <div style={{flex:1}}>{t(`quickOrder.attachments.${item.name}`)}</div>
                  <button className="secondary-btn" onClick={()=>{
                    setTempAttachments(prev => prev.map(a => a.name===item.name ? { ...a, count: Math.max(1, (a.count||1)-1) } : a))
                  }}>－</button>
                  <div style={{width:32,textAlign:'center'}}>{item.count||1}</div>
                  <button className="secondary-btn" onClick={()=>{
                    setTempAttachments(prev => prev.map(a => a.name===item.name ? { ...a, count: (a.count||1)+1 } : a))
                  }}>＋</button>
                </div>
              ))}
            </div>

            <div style={{fontSize:12,color:'#666',margin:'0 0 8px 0'}}>{t('quickOrder.attachmentNote')}</div>
            <div className="grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
              {[
                'factoryNeck','neckSpacer','screw','buccalTube','bracket','spiral','band','impressionPost','oldMold','analog','doctorNeck','usb','waxCrown','refMold','rubber','transferScrew','warranty','abutmentList','locator','impressionCap','abutment','oldTooth','transfer','impressionScrew'
              ].map(name => {
                const selected = tempAttachments.some(a => a.name===name)
                return (
                  <button
                    key={name}
                    className={`grid-btn ${selected?'active':''}`}
                    onClick={()=>{
                      setTempAttachments(prev => {
                        const found = prev.find(a => a.name===name)
                        if(found){
                          return prev.filter(a => a.name!==name)
                        }
                        return [...prev, { name, count: 1 }]
                      })
                    }}
                  >{t(`quickOrder.attachments.${name}`)}</button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {implantParamsVisible && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>{ setImplantParamsVisible(false); setPendingProduct(null); setEditingImplantParams(null) }}>{t('common.back')}</button>
            <div className="page-title">{t('quickOrder.implantParamsSelector')}</div>
            <button className="primary-btn" onClick={()=>{
              setImplantParamsVisible(false)
            }}>{t('common.confirm')}</button>
          </div>
          <div className="page-body">
            <div className="qo-product-item">
              <div className="qo-row"><div className="qo-label">{t('quickOrder.implantParams.system')}</div><input id="ipt-implantSystem" className="qo-input" placeholder={t('quickOrder.inputOrSelect')} /></div>
              <div className="qo-row"><div className="qo-label">{t('quickOrder.implantParams.model')}</div><input id="ipt-implantModel" className="qo-input" placeholder={t('quickOrder.inputModel')} /></div>
              <div className="qo-row"><div className="qo-label">{t('quickOrder.implantParams.healingCap')}</div><input id="ipt-healingCapDiameter" className="qo-input" placeholder={t('quickOrder.inputDia')} /></div>
              <div className="qo-row"><div className="qo-label">{t('quickOrder.implantParams.impressionPost')}</div><input id="ipt-impressionPost" className="qo-input" placeholder={t('quickOrder.inputPost')} /></div>
              <div className="qo-row"><div className="qo-label">{t('quickOrder.implantParams.repairMethod')}</div><Select className="qo-select" value={editingImplantParams?.params?.repairMethod || t('quickOrder.options.repair.new')} onChange={(v)=>{
                const el = document.getElementById('ipt-repairMethod-store'); if(el) el.value = v
              }} options={[t('quickOrder.options.repair.new'),t('quickOrder.options.repair.repair'),t('quickOrder.options.repair.redo')]} /></div>
              <input id="ipt-repairMethod-store" type="hidden" defaultValue={editingImplantParams?.params?.repairMethod || t('quickOrder.options.repair.new')} />
              <div style={{display:'flex',gap:8,marginTop:12}}>
                <button className="qo-primary" onClick={()=>{
                  const params = {
                    implantSystem: document.getElementById('ipt-implantSystem')?.value || '',
                    implantModel: document.getElementById('ipt-implantModel')?.value || '',
                    healingCapDiameter: document.getElementById('ipt-healingCapDiameter')?.value || '',
                    impressionPost: document.getElementById('ipt-impressionPost')?.value || '',
                    repairMethod: document.getElementById('ipt-repairMethod-store')?.value || t('quickOrder.options.repair.new')
                  }
                  if (editingImplantParams) {
                    setImplantParamsList(prev=>prev.map(it=> it.productId===editingImplantParams.productId ? { ...it, params } : it))
                    setEditingImplantParams(null)
                    setImplantParamsVisible(false)
                  } else if (currentProductId && pendingProduct) {
                    setImplantParamsList(prev=>[...prev, { productId: currentProductId, productName: pendingProduct.name, params }])
                    setPendingProduct(null)
                    setImplantParamsVisible(false)
                  }
                }}>{t('quickOrder.saveParams')}</button>
                <button className="qo-secondary" onClick={()=>{ setImplantParamsVisible(false); setPendingProduct(null); setEditingImplantParams(null) }}>{t('common.cancel')}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function renderToothGrid(toothStr){
  const arr = toothStr.split(',').filter(Boolean)
  const quadrants = { TL:[], TR:[], BL:[], BR:[] }
  arr.forEach(code=>{
    const q = code[0]
    const d = code[1]
    if(q==='2') quadrants.TL.push(d)
    else if(q==='1') quadrants.TR.push(d)
    else if(q==='3') quadrants.BL.push(d)
    else if(q==='4') quadrants.BR.push(d)
  })
  return (
    <>
      <div className="tooth-row">
        <div className="tooth-cell-display">{quadrants.TL.join(',')||''}</div>
        <div className="tooth-cell-display">{quadrants.TR.join(',')||''}</div>
      </div>
      <div className="tooth-row">
        <div className="tooth-cell-display">{quadrants.BL.join(',')||''}</div>
        <div className="tooth-cell-display">{quadrants.BR.join(',')||''}</div>
      </div>
    </>
  )
}

export default QuickOrder
  
