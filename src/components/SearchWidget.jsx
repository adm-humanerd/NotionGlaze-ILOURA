import { useState, useEffect, useRef } from 'react';

export default function SearchWidget() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [posts, setPosts] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef(null);

  // 1. 검색 데이터(search-index.json) 미리 가져오기
  useEffect(() => {
    async function fetchSearchIndex() {
      try {
        const res = await fetch('/api/search-index.json');
        const data = await res.json();
        setPosts(data);
      } catch (e) {
        console.error("검색 인덱스 로딩 실패:", e);
      }
    }
    fetchSearchIndex();

    // 외부 클릭 시 검색창 닫기
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 2. 검색어 입력 시 필터링
  const handleSearch = (e) => {
    const q = e.target.value;
    setQuery(q);
    setIsOpen(true);

    if (q.length > 0) {
      const filtered = posts.filter(post => 
        post.title.toLowerCase().includes(q.toLowerCase()) || 
        (post.description && post.description.toLowerCase().includes(q.toLowerCase()))
      ).slice(0, 5); // 최대 5개만 표시
      setResults(filtered);
    } else {
      setResults([]);
    }
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => setIsOpen(true)}
          placeholder="Search..."
          // 👇 [수정] focus:ring-pink-500 -> focus:ring-primary, border-primary
          className="w-full bg-slate-100 border-none rounded-full py-2 pl-4 pr-10 text-sm text-slate-800 placeholder-slate-400 focus:ring-2 focus:ring-primary focus:bg-white transition-all outline-none"
        />
        <div className="absolute right-3 top-2.5">
          {/* 👇 [수정] 아이콘 색상도 primary로 변경 */}
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 group-focus-within:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      {/* 검색 결과 드롭다운 */}
      {isOpen && query.length > 0 && (
        <div className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden z-50">
          {results.length > 0 ? (
            <ul>
              {results.map((post) => (
                <li key={post.slug} className="border-b border-slate-50 last:border-none">
                  <a 
                    href={`/post/${post.slug}`} 
                    className="block px-4 py-3 hover:bg-slate-50 transition-colors group"
                  >
                    {/* 👇 [수정] 호버 시 제목 색상을 primary로 */}
                    <div className="text-sm font-bold text-slate-800 group-hover:text-primary truncate">
                      {post.title}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5 truncate">
                      {post.description || "내용 보기"}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="px-4 py-3 text-sm text-slate-400 text-center">
              검색 결과가 없습니다.
            </div>
          )}
        </div>
      )}
    </div>
  );
}