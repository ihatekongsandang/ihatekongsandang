README §3.6 yaml 블록 2개 · news 예시 caption 41자
PASS  news-verbatim errors=2 notices=0 (기대: 오류)
    E image.src: kind `news`는 근거 기사 og:image의 https URL이어야 합니다(핫링크, 저장 금지). (받은 값: https://…/og-image.jpg)
    E image.sourcePageUrl: kind `news`이면 필수이며 http(s) URL이어야 합니다(근거 기사). (받은 값: https://…)
PASS  news-filled errors=0 notices=0 (기대: 오류 없음)
    media.kind=remote credit.kind=news caption이 카드 데이터에 있음=false
PASS    EN 영어본 imageAlt·imageCaption 있음: errors=0 
PASS    EN 영어본 imageCaption 없음: errors=1 imageCaption: 한국어 원본에 image.caption이 있으므로 필수입니다(영어 캡션).
PASS    EN 영어본 imageAlt 없음: errors=1 imageAlt: 한국어 원본에 image가 있으므로 필수입니다(영어 대체 텍스트, WCAG 1.1.1).
PASS  public-verbatim errors=1 notices=0 (기대: 오류)
    E image.sourcePageUrl: kind `public`이면 필수이며 http(s) URL이어야 합니다(공공누리 마크가 있는 원 페이지). (받은 값: https://…)
PASS  public-filled errors=0 notices=0 (기대: 오류 없음)
    media.kind=local credit.kind=public caption이 카드 데이터에 있음=false
PASS    EN 영어본 imageAlt·imageCaption 있음: errors=0 
PASS    EN 영어본 imageCaption 없음: errors=1 imageCaption: 한국어 원본에 image.caption이 있으므로 필수입니다(영어 캡션).
PASS    EN 영어본 imageAlt 없음: errors=1 imageAlt: 한국어 원본에 image가 있으므로 필수입니다(영어 대체 텍스트, WCAG 1.1.1).
PASS  neg-news-license errors=1 notices=0 (기대: 오류)
    E image.license: 공공누리 유형은 kind `public`에만 씁니다 — kind `news`에서는 이 줄을 지우세요.
PASS  neg-news-no-caption errors=1 notices=0 (기대: 오류)
    E image.caption: kind `news`이면 필수입니다 — 상세 사진 아래에 나오는 사진 설명입니다. 원 기사 사진 설명 기준으로 촬영 시점·장소와 누가 무엇을 하는 모습인지 쓰세요(정책 §3.6 형식).
PASS  neg-public-blank-caption errors=1 notices=0 (기대: 오류)
    E image.caption: kind `public`이면 필수입니다 — 상세 사진 아래에 나오는 사진 설명입니다. 원 기사 사진 설명 기준으로 촬영 시점·장소와 누가 무엇을 하는 모습인지 쓰세요(정책 §3.6 형식).
PASS  neg-public-kogl2 errors=1 notices=0 (기대: 오류)
    E image.license: kind `public`이면 필수이며 kogl-1만 쓸 수 있습니다. (받은 값: kogl-2)
PASS  warn-news-161 errors=0 notices=1 (기대: 오류 없음)
    N image.caption이 161자입니다 — 160자 이내를 권합니다(정책 §3.6).
    media.kind=remote credit.kind=news caption이 카드 데이터에 있음=false
PASS  ok-news-160 errors=0 notices=0 (기대: 오류 없음)
    media.kind=remote credit.kind=news caption이 카드 데이터에 있음=false

합계 16건 · PASS 16 · FAIL 0
