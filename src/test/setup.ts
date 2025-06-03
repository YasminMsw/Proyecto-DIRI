import '@testing-library/jest-dom';
import './i18n'


// Mock de ResizeObserver 
// porque recharts (la librería que usas en el DashboardPage) utiliza internamente ResizeObserver
class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
}

Object.defineProperty(global, 'ResizeObserver', {
  writable: true,
  configurable: true,
  value: ResizeObserver,
});