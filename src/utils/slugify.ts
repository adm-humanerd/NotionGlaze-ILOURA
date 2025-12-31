// src/utils/slugify.ts

export function slugify(text: string): string {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')           // 공백을 -로 변경
      .replace(/[^\w\-\uAC00-\uD7A3]+/g, '') // 한글, 영문, 숫자, - 외에는 제거
      .replace(/\-\-+/g, '-');        // -가 여러 개면 하나로 줄임
  }