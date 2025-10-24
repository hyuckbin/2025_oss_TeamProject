import { create } from 'zustand';
// 1. [수정] 'zustand/middleware'에서 persist와 createJSONStorage를 가져옵니다.
import { persist, createJSONStorage } from 'zustand/middleware';

const useAppStore = create(
  persist(
    (set) => ({
      // --- 기존 상태 ---
      searchQuery: '',
      setSearchQuery: (query) => set({ searchQuery: query }),

      // --- 3. 로그인 상태 추가 ---
      user: null, // 로그인 안 했을 땐 null, 로그인하면 { username: 'testuser' } 형태
      
      // 4. 로그인/로그아웃 함수 추가
      login: (username) => set({ user: { username } }),
      logout: () => set({ user: null }),
    }),
    {
      name: 'bunge-market-storage',
      
      // 2. [수정] storage: localStorage가 아니라,
      // createJSONStorage로 감싸줍니다.
      storage: createJSONStorage(() => localStorage), 
      
      partialize: (state) => ({ user: state.user }),
    }
  )
);

export default useAppStore;

