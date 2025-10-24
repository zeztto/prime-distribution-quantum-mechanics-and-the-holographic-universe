const fs = require('fs');

let content = fs.readFileSync('./public/full-paper.md', 'utf8');

// Fix year format
content = content.replace(/1971\.1972년/g, '1971-1972년');

// Fix math operators - dot should be plus in formulas
content = content.replace(/ρ = 1\/2 \. i([tλ])/g, 'ρ = 1/2 + i$1');

// Fix Korean name separators - use middle dot (·) instead of period (.)
content = content.replace(/몽고메리\.다이슨/g, '몽고메리·다이슨');
content = content.replace(/키팅\.스네이스/g, '키팅·스네이스');
content = content.replace(/드린펠트\.라프르그/g, '드린펠트·라프르그');
content = content.replace(/베리\.킬링/g, '베리·킬링');
content = content.replace(/시에라\.타운센드/g, '시에라·타운센드');
content = content.replace(/힐베르트\.폴야/g, '힐베르트·폴야');
content = content.replace(/아인슈타인\.카르탕/g, '아인슈타인·카르탕');

// Fix concept separators - use middle dot for paired concepts
content = content.replace(/소수\.양자역학-홀로그래피/g, '소수·양자역학·홀로그래피');
content = content.replace(/국소\.전역/g, '국소·전역');
content = content.replace(/광도\.거리/g, '광도·거리');
content = content.replace(/중간\.높음/g, '중간·높음');
content = content.replace(/부모\.자식/g, '부모·자식');
content = content.replace(/특이점\.빅뱅/g, '특이점·빅뱅');
content = content.replace(/블랙홀\.우주/g, '블랙홀·우주');

// Fix space-dot-space pattern (should be just space-dash or remove)
content = content.replace(/"진화"한다 \. 블랙홀/g, '"진화"한다 - 블랙홀');
content = content.replace(/"선택"된다 \. 별/g, '"선택"된다 - 별');
content = content.replace(/"악의 축" \. 예상치/g, '"악의 축" - 예상치');
content = content.replace(/"dipole 패턴" \. 한/g, '"dipole 패턴" - 한');
content = content.replace(/세 영역 \. 소수의/g, '세 영역 - 소수의');
content = content.replace(/원리의 발전 \. 베켄슈타인/g, '원리의 발전 - 베켄슈타인');
content = content.replace(/전문가 \. 양자/g, '전문가 + 양자');
content = content.replace(/표준 모형 \. 중력/g, '표준 모형 + 중력');
content = content.replace(/언젠가 \. 아마도/g, '언젠가 - 아마도');

// Remove section ending markers
content = content.replace(/\*\.섹션 \d+ 종료[^\]]*\]\*\n*/g, '');
content = content.replace(/\*\.논문 종료\]\*\n*/g, '');

// Fix Korean name followed by English name in parentheses
content = content.replace(/위그너\.Wigner/g, '위그너(Wigner');
content = content.replace(/헤라르뒤스 '트 호프트\.Gerard/g, "헤라르뒤스 '트 호프트(Gerard");
content = content.replace(/데이터\.SDSS/g, '데이터(SDSS');
content = content.replace(/데이터\.JWST/g, '데이터(JWST');

// Fix specific parenthesis errors first (before general pattern)
content = content.replace(/랜덤 행렬 이론\.Random Matrix Theory, RMT\)/g, '랜덤 행렬 이론(Random Matrix Theory, RMT)');
content = content.replace(/\.4ℓP²\)/g, '(4ℓP²)');
content = content.replace(/\.~10-35 m\)/g, '(~10^-35 m)');
content = content.replace(/\.25,000회 이상\)/g, '(25,000회 이상)');
content = content.replace(/\.N → ∞\)/g, '(N → ∞)');
content = content.replace(/\.i = 1, \.\.\., 9\)/g, '(i = 1, ..., 9)');
content = content.replace(/\.마이클 롱고, 2011\)/g, '(마이클 롱고, 2011)');
content = content.replace(/AdS\/CFT 대응\.Maldacena, 1997\)/g, 'AdS/CFT 대응(Maldacena, 1997)');

// Fix "1 . (" pattern
content = content.replace(/\*1 \. \(/g, '*(');

// Fix incorrectly formatted parentheses - general pattern .XXX) -> (XXX)
// This handles all cases where opening parenthesis is replaced with dot
content = content.replace(/\.([a-zA-Z가-힣0-9\s\-]+)\)/g, '($1)');

// Fix specific mathematical function parentheses
content = content.replace(/ζ\.s\)/g, 'ζ(s)');
content = content.replace(/π\.x\)/g, 'π(x)');
content = content.replace(/Li\.x\)/g, 'Li(x)');
content = content.replace(/ξ\.s\)/g, 'ξ(s)');
content = content.replace(/R₂\.s\)/g, 'R₂(s)');

// Fix opening parentheses with comma (for acronyms)
content = content.replace(/\.GOE,/g, '(GOE,');
content = content.replace(/\.GUE,/g, '(GUE,');
content = content.replace(/\.GSE,/g, '(GSE,');

// Fix exp(S) pattern
content = content.replace(/exp\.S\)/g, 'exp(S)');

// Fix integral notation
content = content.replace(/∫\\?\[2,x\\?\]/g, '∫₂ˣ');

// Fix other common escape patterns
content = content.replace(/\\\+/g, '+');
content = content.replace(/\\\-/g, '-');
content = content.replace(/\\\*/g, '*');
content = content.replace(/\\\{/g, '{');
content = content.replace(/\\\}/g, '}');

// Remove section dividers (---)
content = content.replace(/^---$/gm, '');

// Replace __제N장__ with **제N장** (bold without underline)
content = content.replace(/__제(\d+)장__/g, '**제$1장**');

// Replace inline __text__ with **text** for emphasis (keep bold but remove underline marker)
// But only for emphasis words, not for headings
content = content.replace(/__([^_\n]+)__/g, '**$1**');

// Fix bold pattern with colon: **text: ** -> **text:** or **text:** -> **text:**
content = content.replace(/\*\*([^*]+): \*\*/g, '**$1:** ');
content = content.replace(/\*\*([^*]+):\*\*/g, '**$1:** ');

// Fix Chapter 6 specific parenthesis errors
content = content.replace(/표준 우주론\.ΛCDM 모델\)/g, '표준 우주론(ΛCDM 모델)');
content = content.replace(/표준 우주론\.ΛCDM\)/g, '표준 우주론(ΛCDM)');
content = content.replace(/우주론적 거리\.z > 2\)/g, '우주론적 거리(z > 2)');
content = content.replace(/초기 은하\.z ~ 10-13\)/g, '초기 은하(z ~ 10-13)');
content = content.replace(/초기 우주\.z > 5\)/g, '초기 우주(z > 5)');
content = content.replace(/초기 우주\.z > 10\)/g, '초기 우주(z > 10)');
content = content.replace(/CMB의 쿼드러폴\.ℓ=2\)/g, 'CMB의 쿼드러폴(ℓ=2)');
content = content.replace(/비정상적 \.p < 0\(001\)/g, '비정상적 (p < 0.001)');
content = content.replace(/\.차이 < 30°\)/g, '(차이 < 30°)');
content = content.replace(/\.거의 항상 ± 180° 방향\)/g, '(거의 항상 ± 180° 방향)');
content = content.replace(/\.v ~ 0\(99c\)/g, '(v ~ 0.99c)');
content = content.replace(/\.Penrose process, Blandford-Znajek mechanism\)/g, '(Penrose process, Blandford-Znajek mechanism)');
content = content.replace(/\.세차 주기는 수년~수십년\)/g, '(세차 주기는 수년~수십년)');
content = content.replace(/\.더 큰 "부모 우주"의\)/g, '(더 큰 "부모 우주"의)');
content = content.replace(/\.ℓ=2-100 다중극에서\)/g, '(ℓ=2-100 다중극에서)');
content = content.replace(/LiteBIRD 위성 \.일본, 발사 예정 2032\)/g, 'LiteBIRD 위성 (일본, 발사 예정 2032)');
content = content.replace(/Simons Observatory \.칠레, 가동 중\)/g, 'Simons Observatory (칠레, 가동 중)');
content = content.replace(/\.축 방향과 평행\/수직\)/g, '(축 방향과 평행/수직)');
content = content.replace(/SKA \.Square Kilometre Array, 2027\+\)/g, 'SKA (Square Kilometre Array, 2027+)');
content = content.replace(/\.1-10% 수준\)/g, '(1-10% 수준)');
content = content.replace(/LISA \.Laser Interferometer Space Antenna, 발사 2035\)/g, 'LISA (Laser Interferometer Space Antenna, 발사 2035)');
content = content.replace(/Einstein Telescope \.유럽, 2030년대\)/g, 'Einstein Telescope (유럽, 2030년대)');
content = content.replace(/Cosmic Explorer \.미국, 2030년대\)/g, 'Cosmic Explorer (미국, 2030년대)');
content = content.replace(/국제 컨소시엄 형성 \.유럽, 미국, 아시아\)/g, '국제 컨소시엄 형성 (유럽, 미국, 아시아)');

// Fix italic heading style - convert to bold
content = content.replace(/\*블랙홀 우주론 가설: \*/g, '**블랙홀 우주론 가설:**');

// Fix "소수.양자" pattern in Chapter 6
content = content.replace(/소수\.양자 연결/g, '소수·양자 연결');

// Fix Chapter 7 specific errors
// Fix prediction numbers in parentheses
content = content.replace(/\.1\) 은하 분포/g, '(1) 은하 분포');
content = content.replace(/\.2\) CMB/g, '(2) CMB');
content = content.replace(/\.3\) 암흑 에너지/g, '(3) 암흑 에너지');
content = content.replace(/\.4\) 대규모 구조/g, '(4) 대규모 구조');
content = content.replace(/\.5\) 중력파/g, '(5) 중력파');

// Fix operator names in parentheses
content = content.replace(/\.베리-키팅 연산자/g, '(베리-키팅 연산자');

// Fix "fifth force" parenthesis
content = content.replace(/\.제5의 힘\?\)/g, '(제5의 힘?)');

// Fix Pan-STARRS (dot should remain)
content = content.replace(/Pan\.STARRS/g, 'Pan-STARRS');

// Fix N-body simulation
content = content.replace(/N\.body/g, 'N-body');

// Fix satellite/telescope launch dates
content = content.replace(/Euclid 위성 \.발사 2023, 데이터 2025\+\)/g, 'Euclid 위성 (발사 2023, 데이터 2025+)');
content = content.replace(/Roman 우주 망원경 \(발사 2027\)/g, 'Roman 우주 망원경 (발사 2027)');
content = content.replace(/LSST\/Vera Rubin \.2025\+\)/g, 'LSST/Vera Rubin (2025+)');
content = content.replace(/SKA Phase 1 \.2027\+\)/g, 'SKA Phase 1 (2027+)');
content = content.replace(/LiteBIRD \(발사 2032\)/g, 'LiteBIRD (발사 2032)');
content = content.replace(/LISA \(발사 2035\)/g, 'LISA (발사 2035)');

// Fix percentage and angular velocity
content = content.replace(/\.현재 5-10% → 구체적 값\)/g, '(현재 5-10% → 구체적 값)');
content = content.replace(/\.각속도 ω\)/g, '(각속도 ω)');

// Fix telescope names
content = content.replace(/\.TMT, ELT, GMT\)/g, '(TMT, ELT, GMT)');

// Fix wormhole signals
content = content.replace(/\.웜홀 신호\? 우주 충돌 흔적\?\)/g, '(웜홀 신호? 우주 충돌 흔적?)');

// Fix bold pattern in section 7.5.1 - space between bold markers
content = content.replace(/\*\*수학자들은 \*\*리만/g, '**수학자들은** 리만');
content = content.replace(/\*\*이론 물리학자들은 \*\*양자역학/g, '**이론 물리학자들은** 양자역학');
content = content.replace(/\*\*관측 천문학자들은 \*\*자연/g, '**관측 천문학자들은** 자연');
content = content.replace(/\*\*철학자들은 \*\*그 의미/g, '**철학자들은** 그 의미');

// Fix quote attribution - dot should be dash
content = content.replace(/\*\. 존 폰 노이만/g, '* - 존 폰 노이만');
content = content.replace(/\*\. J\.B\.S\. 홀데인 \(J\.B\.S\( Haldane\)\*/g, '* - J.B.S. 홀데인 (J.B.S. Haldane)*');

fs.writeFileSync('./public/full-paper.md', content);

console.log('Fixed mathematical symbols, expressions, and formatting!');
