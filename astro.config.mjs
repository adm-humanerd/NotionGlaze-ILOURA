// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// 👇 현재 실행 모드가 '빌드(build)'인지 확인
const isBuild = process.argv.includes('build');

// https://astro.build/config
export default defineConfig({
  output: 'server', // SSR(동적 렌더링) 활성화

  // 👇 핵심: 개발(dev) 중에는 어댑터를 꺼서 에러를 방지하고, 
  //    배포(build) 할 때만 Cloudflare 어댑터를 켭니다.
  adapter: isBuild ? cloudflare({
    imageService: 'cloudflare',
  }) : undefined,

  integrations: [
    tailwind(), // 안정적인 v3 기반 통합
    react()
  ],

  // Firebase IDX 등 컨테이너 환경에서 외부 접속 허용
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
  
  // 사이트 주소 (본인 도메인)
  site: 'https://iloura.co.kr', 

  vite: {
    // 이전 종속성 충돌 방지용 설정
    server: {
      allowedHosts: ['iloura.co.kr', 'www.iloura.co.kr']
    },
    
    optimizeDeps: {
      exclude: ['@astrojs/compiler']
    }
  }
});