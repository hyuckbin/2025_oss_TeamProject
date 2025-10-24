// src/store/useAppStore.js
import { create } from 'zustand';

// 전역 상태를 관리할 스토어를 생성합니다.
const useAppStore = create((set) => ({
  // 1. 관리할 상태: 검색어
  searchQuery: '',
  
  // 2. 상태를 변경할 함수
  setSearchQuery: (query) => set({ searchQuery: query }),
}));

export default useAppStore;
