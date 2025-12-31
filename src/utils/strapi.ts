interface Props {
    endpoint: string;
    query?: Record<string, string>;
    wrappedByKey?: string;
    wrappedByList?: boolean;
  }
  
  export async function fetchStrapi(endpoint: string) {
    // .env 파일에서 주소와 토큰을 가져옵니다. (없으면 하드코딩된 값 사용)
    const STRAPI_URL = import.meta.env.STRAPI_URL || "https://strapi.humanerd.kr";
    const STRAPI_TOKEN = import.meta.env.STRAPI_TOKEN || "";
  
    // Strapi API 주소 조합 (예: https://.../api/test-pages)
    const url = new URL(`${STRAPI_URL}/api/${endpoint}`);
    
    try {
      const res = await fetch(url.toString(), {
          headers: {
              Authorization: `Bearer ${STRAPI_TOKEN}`,
              "Content-Type": "application/json",
          },
      });
  
      if (!res.ok) {
        throw new Error(`Strapi Fetch Error: ${res.status} ${res.statusText}`);
      }
      
      const json = await res.json();
      return json.data;
    } catch (error) {
      console.error("❌ Strapi Data Load Failed:", error);
      return []; // 에러 나면 빈 배열 반환해서 사이트가 멈추는 것 방지
    }
  }