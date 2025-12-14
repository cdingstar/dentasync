# CHANGELOG

## 2025-12-07
- Fix: 修复 Preview 无法启动的问题
  - 将开发服务器和预览服务器的端口从 3004 统一修改为 3003，以符合任务清单规范并解决潜在的端口冲突。
  - 更新了 `vite.config.js` 和 `package.json`。

## 2025-12-14
- Feat: 重新实现一键下单中的设计方案弹窗
  - 创建 `AppDesignSchemeModal` 组件，提供兼容 App 的多标签页设计方案选择界面。
  - 包含设计、颜色、形态、表面、切端、颈缘、边缘、桥体、咬合等多个维度的详细参数选择。
  - 更新 `QuickOrder` 页面，使用新组件替代原有的简单列表选择。
  - 更新 `src/locales/zh.js` 添加相关中文翻译。
- Fix: 修复国际化缺失问题
  - 在 `src/locales/zh.js` 中添加缺失的 `products.orderNow` 翻译键值。
  - 确认 `AppDesignSchemeModal` 组件已完全支持国际化。
- Feat: 登录页增加版本时间戳
  - 更新 `vite.config.js` 中的 `__BUILD_DATE__` 定义，使用 `YYYY-MM-DD HH:mm` 的详细时间格式。
  - 在 `Login.jsx` 中显示版本号及构建时间戳（例如 `V1.0 (2025-12-14 15:30)`）。

---
## Commit Log
- [2025-12-14] Feat: 重新实现设计方案弹窗 & 登录页增加版本时间戳 (Summary: Reimplemented design scheme modal, updated QuickOrder, fixed i18n, added build timestamp to login)
