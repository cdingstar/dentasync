import React, { useState, useEffect, useRef } from 'react'
import Select from '../../components/Select'
import ToothSel from '../../components/ToothSel'
import './QuickOrder.css'
import BaseInfoSection from './components/BaseInfoSection'
import PatientInfoSection from './components/PatientInfoSection'

function QuickOrder({ onClose, onOpenProducts, selectedProductFromLibrary, onConsumeSelectedProduct }) {
  const [form, setForm] = useState({
    clinic: 'ASIANTECH PTE. LTD.',
    doctor: '黄向荣',
    factory: '南宁市谱佳齿科技术中心',
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
    { id: 'fluorosis', label: '氟斑牙' },
    { id: 'tetracycline', label: '四环素牙' },
    { id: 'metal-post', label: '金属桩' },
    { id: 'fiber-post', label: '纤维桩' }
  ]

  const updateForm = (k, v) => setForm(prev => ({ ...prev, [k]: v }))
  const addProduct = () => setProducts(prev => ([...prev, { id: prev.length + 1, name: '点击选择产品', tooth: '', molding: '常规取模', scan: '', connection: '单冠', repair: '新做' }]))
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
    console.info('保存下单草稿', { form, products, colors, attachments })
    alert('已保存草稿')
  }
  const reset = () => {
    setForm({ clinic: 'ASIANTECH PTE. LTD.', doctor: '黄向荣', factory: '南宁市谱佳齿科技术中心', receiver: '', address: '', patientName: '', patientPhone: '', gender: '', age: '' })
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
          return [...prev, { id: nextId, name, tooth: '', molding: '常规取模', scan: '', connection: '单冠', repair: '新做' }]
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

  return (
    <div className="quick-order-page">
      <div className="qo-header">
        <div className="qo-title">一键下单</div>
        <div className="qo-header-right">
          <button className="qo-secondary" onClick={onClose}>返回</button>
        </div>
      </div>

      <div className="qo-body">
        <BaseInfoSection form={form} updateForm={updateForm} />

        <PatientInfoSection form={form} updateForm={updateForm} />

        {/* 产品信息 */}
        <div className="qo-section">
          <div className="qo-section-title">产品信息（{products.length}）</div>
          <div className="qo-section-content">
            <button className="qo-secondary" onClick={()=>{
              onOpenProducts && onOpenProducts()
            }}>新增产品</button>
            {products.map(p => (
              <div key={p.id} id={`product-item-${p.id}`} className="qo-product-item">
                <div className="qo-row"><div className="qo-label">产品名称</div><button className="qo-secondary" onClick={()=>{setActiveProductId(p.id);setLibrarySelectForProductId(p.id);onOpenProducts && onOpenProducts()}}>{pendingProductNames[p.id] || p.name}</button></div>
                <div className="qo-row"><div className="qo-label">牙位选择</div>
                  <button className="qo-secondary" onClick={()=>{setToothEditing({type:'product',id:p.id});setShowToothSelector(true)}}>
                    {p.tooth ? (
                      <span className="tooth-grid">
                        {renderToothGrid(p.tooth)}
                      </span>
                    ) : '选择牙位'}
                  </button>
                </div>
                <div className="qo-row"><div className="qo-label">取模方式</div><Select className="qo-select" value={p.molding} onChange={(v)=>updateProduct(p.id,'molding',v)} options={["常规取模","口内扫描"]} /></div>
                <div className="qo-row"><div className="qo-label">扫描设备</div><input className="qo-input" value={p.scan} onChange={(e)=>updateProduct(p.id,'scan',e.target.value)} placeholder="选择设备或编号" /></div>
                <div className="qo-row"><div className="qo-label">连接方式</div><Select className="qo-select" value={p.connection} onChange={(v)=>updateProduct(p.id,'connection',v)} options={["单冠","桥体"]} /></div>
                <div className="qo-row"><div className="qo-label">修复方式</div><Select className="qo-select" value={p.repair} onChange={(v)=>updateProduct(p.id,'repair',v)} options={["新做","返修","重做"]} /></div>
                <button className="qo-secondary" onClick={()=>deleteProduct(p.id)}>删除</button>
              </div>
            ))}
          </div>
        </div>

        {implantParamsList.length > 0 && (
          <div className="qo-section">
            <div className="qo-section-title">种植参数（{implantParamsList.length}）</div>
            <div className="qo-section-content">
              <div className="product-table-container">
                <table className="product-table" style={{width:'100%',borderCollapse:'collapse'}}>
                  <thead>
                    <tr>
                      <th style={{width:80,textAlign:'left',borderBottom:'1px solid #f0f0f0',padding:'8px 0'}}>序号</th>
                      <th style={{textAlign:'left',borderBottom:'1px solid #f0f0f0',padding:'8px 0'}}>种植参数</th>
                      <th style={{width:120,textAlign:'left',borderBottom:'1px solid #f0f0f0',padding:'8px 0'}}>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    {implantParamsList.map((item) => (
                      <tr key={item.productId}>
                        <td style={{padding:'8px 0'}}>{item.productId}</td>
                        <td style={{padding:'8px 0'}}>
                          <div style={{ fontSize: 13, lineHeight: '1.8' }}>
                            <div>种植系统：{item.params?.implantSystem || '-'}</div>
                            <div>植体型号：{item.params?.implantModel || '-'}</div>
                            <div>愈合帽直径：{item.params?.healingCapDiameter || '-'}</div>
                            <div>取模杆：{item.params?.impressionPost || '-'}</div>
                            <div>修复方式：{item.params?.repairMethod || '-'}</div>
                          </div>
                        </td>
                        <td style={{padding:'8px 0'}}>
                          <button className="qo-secondary" onClick={()=>{
                            setEditingImplantParams(item); setCurrentProductId(item.productId); setImplantParamsVisible(true)
                          }} style={{marginRight:8}}>修改</button>
                          <button className="qo-secondary" onClick={()=>{
                            setImplantParamsList(prev=>prev.filter(x=>x.productId!==item.productId))
                          }}>删除</button>
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
          <div className="qo-section-title">颜色设定</div>
          <div className="qo-section-content">
            <button className="qo-secondary" onClick={addColor}>添加一行</button>
            {colors.map(c => (
              <div key={c.id} className="qo-product-item">
                <div className="qo-row"><div className="qo-label">牙位选择</div>
                  <button className="qo-secondary" onClick={()=>{setToothEditing({type:'color',id:c.id});setShowToothSelector(true)}}>
                    {c.tooth ? (
                      <span className="tooth-grid">
                        {renderToothGrid(c.tooth)}
                      </span>
                    ) : '选择牙位'}
                  </button>
                </div>
                <div className="qo-row"><div className="qo-label">主色</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'mainColor'});setShowColorSelector(true)}}>{c.mainColor||'点击选择'}</button></div>
                <div className="qo-row"><div className="qo-label">颈部颜色</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'neckColor'});setShowColorSelector(true)}}>{c.neckColor||'点击选择'}</button></div>
                <div className="qo-row"><div className="qo-label">中部颜色</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'middleColor'});setShowColorSelector(true)}}>{c.middleColor||'点击选择'}</button></div>
                <div className="qo-row"><div className="qo-label">切端颜色</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'cuttingEdgeColor'});setShowColorSelector(true)}}>{c.cuttingEdgeColor||'点击选择'}</button></div>
                <div className="qo-row"><div className="qo-label">基牙颜色</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'baseColor'});setShowColorSelector(true)}}>{c.baseColor||'点击选择'}</button></div>
                <div className="qo-row"><div className="qo-label">牙体颜色</div><button className="qo-secondary" onClick={()=>{setColorEditing({id:c.id,field:'toothBodyColor'});setShowColorSelector(true)}}>{c.toothBodyColor||'点击选择'}</button></div>
                <div className="qo-row"><div className="qo-label">自定义色</div><input className="qo-input" value={c.customColor} onChange={(e)=>updateColor(c.id,'customColor',e.target.value)} /></div>
                <button className="qo-secondary" onClick={()=>deleteColor(c.id)}>删除</button>
              </div>
            ))}
          </div>
        </div>

        {/* 其他设置 */}
        <div className="qo-section">
          <div className="qo-section-title">其他设置</div>
          <div className="qo-section-content">
            <div className="qo-row"><div className="qo-label">试戴情况</div><Select className="qo-select" value={form.trialStatus} onChange={(v)=>updateForm('trialStatus',v)} options={["试戴蜡型外形","试戴内冠","试戴颜色","试戴车瓷外形","试戴基台","试戴基台蜡冠"]} /></div>
            <div className="qo-row"><div className="qo-label">设计方案</div><button className="qo-secondary" onClick={()=>setShowDesign(true)}>选择方案</button></div>
            <div className="qo-row"><div className="qo-label">已选方案</div><div className="list" style={{flex:1}}>{Object.values(designSchemes).map(s=> <div key={s.id} className="list-item"><span>{s.name}</span><button className="qo-secondary" onClick={()=>removeDesign(s.category)}>移除</button></div>)}</div></div>
            <div className="qo-row"><div className="qo-label">选择附件</div><button className="qo-secondary" onClick={()=>setShowAttachmentSelector(true)}>选择附件</button></div>
            <div className="qo-row"><div className="qo-label">已选附件</div><div className="list" style={{flex:1}}>{attachments.map(a=> <div key={a.name} className="list-item"><span>{a.name} * {a.count}</span><button className="qo-secondary" onClick={()=>removeAttachment(a.name)}>移除</button></div>)}</div></div>
            <div className="qo-row"><div className="qo-label">文字备注</div><input className="qo-input" value={form.remark || ''} onChange={(e)=>updateForm('remark', e.target.value)} placeholder="请输入文字备注" /></div>

            <div className="qo-row"><div className="qo-label">图片上传</div>
              <div style={{flex:1}}>
                <div className="list" style={{marginBottom:8}}>
                  {uploadedImages.map((img, idx) => (
                    <div key={idx} className="list-item" style={{gap:12}}>
                      <img src={img.url} alt={img.name} style={{width:48,height:48,borderRadius:6,objectFit:'cover'}} />
                      <span style={{flex:1}}>{img.name}</span>
                      <button className="qo-secondary" onClick={()=>removeImage(idx)}>移除</button>
                    </div>
                  ))}
                </div>
                <label className="qo-secondary" style={{display:'inline-block',cursor:'pointer'}}>
                  + 图片上传
                  <input type="file" accept="image/*" multiple onChange={handleImageUpload} style={{display:'none'}} />
                </label>
              </div>
            </div>

            <div className="qo-row"><div className="qo-label">上传文件</div>
              <div style={{flex:1}}>
                <div className="list" style={{marginBottom:8}}>
                  {uploadedFiles.map((file, idx) => (
                    <div key={idx} className="list-item" style={{gap:12}}>
                      <span style={{flex:1}}>{file.name}</span>
                      <button className="qo-secondary" onClick={()=>removeFile(idx)}>移除</button>
                    </div>
                  ))}
                </div>
                <label className="qo-secondary" style={{display:'inline-block',cursor:'pointer'}}>
                  + 上传文件
                  <input type="file" multiple onChange={handleFileUpload} style={{display:'none'}} />
                </label>
              </div>
            </div>

            <div className="qo-row"><div className="qo-label">3D文件</div>
              <div style={{flex:1}}>
                <div className="list" style={{marginBottom:8}}>
                  {uploaded3DFiles.map((file, idx) => (
                    <div key={idx} className="list-item" style={{gap:12}}>
                      <span style={{flex:1}}>{file.name}</span>
                      <button className="qo-secondary" onClick={()=>remove3DFile(idx)}>移除</button>
                    </div>
                  ))}
                </div>
                <label className="qo-secondary" style={{display:'inline-block',cursor:'pointer'}}>
                  + 3D文件
                  <input type="file" multiple onChange={handle3DUpload} style={{display:'none'}} />
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="qo-actions">
        <button className="qo-primary" onClick={submit}>立即下单</button>
        <button className="qo-secondary" onClick={save}>保存</button>
        <button className="qo-secondary" onClick={reset}>重置</button>
      </div>

      {showProductSelector && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>setShowProductSelector(false)}>返回</button>
            <div className="page-title">选择产品</div>
            <button className="primary-btn" onClick={()=>setShowProductSelector(false)}>确定</button>
          </div>
          <div className="page-body">
            <div className="list">
              {[
                {id:'p1',name:'D1氧化锆全瓷牙',productCode:'D1'},
                {id:'p2',name:'全瓷贴面',productCode:'VP'},
                {id:'p3',name:'金属烤瓷冠',productCode:'PFM'},
                {id:'p4',name:'种植牙冠',productCode:'IMPLANT'}
              ].map(item=> (
                <div key={item.id} className="list-item">
                  <div>{item.name}</div>
                  <button className="qo-secondary" onClick={()=>{
                    if(activeProductId){
                      updateProduct(activeProductId,'name',item.name)
                      if (String(item.name).includes('种植')) {
                        setCurrentProductId(activeProductId)
                        setPendingProduct({ name: item.name, key: item.id, productCode: item.productCode })
                        setEditingImplantParams(null)
                        setImplantParamsVisible(true)
                      }
                    }
                  }}>选择</button>
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
            <button className="primary-btn" onClick={()=>setShowColorSelector(false)}>返回</button>
            <div className="page-title">选择颜色</div>
            <button className="primary-btn" onClick={()=>setShowColorSelector(false)}>确定</button>
          </div>
          <div className="page-body">
            <div className="list" style={{flexDirection:'row',gap:8,marginBottom:12}}>
              <button className={`grid-btn ${activeColorTab==='vita-classic'?'active':''}`} onClick={()=>setActiveColorTab('vita-classic')}>VITA Classic</button>
              <button className={`grid-btn ${activeColorTab==='vita-3d'?'active':''}`} onClick={()=>setActiveColorTab('vita-3d')}>VITA 3D MASTER</button>
              <button className={`grid-btn ${activeColorTab==='special'?'active':''}`} onClick={()=>isBaseColorField && setActiveColorTab('special')} disabled={!isBaseColorField}>特殊色</button>
              <button className={`grid-btn ${activeColorTab==='image'?'active':''}`} onClick={()=>setActiveColorTab('image')}>图片</button>
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
                  上传图片
                  <input type="file" accept="image/*" onChange={(e)=>{
                    const f = (e.target.files||[])[0]
                    if (f && colorEditing.id) {
                      updateColor(colorEditing.id, colorEditing.field, `图片:${f.name}`)
                      setShowColorSelector(false)
                      e.target.value=''
                    }
                  }} style={{display:'none'}} />
                </label>
                <p style={{fontSize:12,color:'#666',marginTop:8}}>支持 JPG、PNG 等图片格式</p>
              </div>
            )}
          </div>
        </div>
      )}

      {showDesign && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>setShowDesign(false)}>返回</button>
            <div className="page-title">选择设计方案</div>
            <button className="primary-btn" onClick={()=>setShowDesign(false)}>确定</button>
          </div>
          <div className="page-body">
            <div className="list">
              {[
                {id:'d1',name:'试戴内冠',category:'trial'},
                {id:'d2',name:'试戴颜色',category:'trial'},
                {id:'d3',name:'试戴蜡型外形',category:'trial'},
              ].map(s=> (
                <div key={s.id} className="list-item">
                  <div>{s.name}</div>
                  <button className="qo-secondary" onClick={()=> setDesignSchemes(prev=> ({...prev, [s.category]: s})) }>选择</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {showAttachmentSelector && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>setShowAttachmentSelector(false)}>返回</button>
            <div className="page-title">选择附件</div>
            <button className="primary-btn" onClick={()=>{ setAttachments(tempAttachments); setShowAttachmentSelector(false) }}>确定</button>
          </div>
          <div className="page-body">
            <div className="list" style={{marginBottom:12}}>
              {tempAttachments.map(item => (
                <div key={item.name} className="list-item">
                  <div style={{flex:1}}>{item.name}</div>
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

            <div style={{fontSize:12,color:'#666',margin:'0 0 8px 0'}}>附件（重复点击可取消选择）</div>
            <div className="grid" style={{gridTemplateColumns:'repeat(3,1fr)'}}>
              {[
                '工厂颈架','颈架垫片','螺丝附件','颊面管','托槽','螺旋','带环','取模杆','旧模','替代体','医生颈架','U盘','蜡冠','参考模','胶粒','转移杆螺丝','保证卡','基台发货单','定位器','印模帽','基台','旧牙','转移杆','取模杆螺丝'
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
                  >{name}</button>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {implantParamsVisible && (
        <div className="page-overlay">
          <div className="page-header">
            <button className="primary-btn" onClick={()=>{ setImplantParamsVisible(false); setPendingProduct(null); setEditingImplantParams(null) }}>返回</button>
            <div className="page-title">种植参数选择器</div>
            <button className="primary-btn" onClick={()=>{
              setImplantParamsVisible(false)
            }}>确定</button>
          </div>
          <div className="page-body">
            <div className="qo-product-item">
              <div className="qo-row"><div className="qo-label">种植系统</div><input id="ipt-implantSystem" className="qo-input" placeholder="输入或选择" /></div>
              <div className="qo-row"><div className="qo-label">植体型号</div><input id="ipt-implantModel" className="qo-input" placeholder="输入型号" /></div>
              <div className="qo-row"><div className="qo-label">愈合帽直径</div><input id="ipt-healingCapDiameter" className="qo-input" placeholder="如 4.5mm" /></div>
              <div className="qo-row"><div className="qo-label">取模杆</div><input id="ipt-impressionPost" className="qo-input" placeholder="输入取模杆类型" /></div>
              <div className="qo-row"><div className="qo-label">修复方式</div><Select className="qo-select" value={editingImplantParams?.params?.repairMethod || '新做'} onChange={(v)=>{
                const el = document.getElementById('ipt-repairMethod-store'); if(el) el.value = v
              }} options={["新做","返修","重做"]} /></div>
              <input id="ipt-repairMethod-store" type="hidden" defaultValue={editingImplantParams?.params?.repairMethod || '新做'} />
              <div style={{display:'flex',gap:8,marginTop:12}}>
                <button className="qo-primary" onClick={()=>{
                  const params = {
                    implantSystem: document.getElementById('ipt-implantSystem')?.value || '',
                    implantModel: document.getElementById('ipt-implantModel')?.value || '',
                    healingCapDiameter: document.getElementById('ipt-healingCapDiameter')?.value || '',
                    impressionPost: document.getElementById('ipt-impressionPost')?.value || '',
                    repairMethod: document.getElementById('ipt-repairMethod-store')?.value || '新做'
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
                }}>保存参数</button>
                <button className="qo-secondary" onClick={()=>{ setImplantParamsVisible(false); setPendingProduct(null); setEditingImplantParams(null) }}>取消</button>
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
  
