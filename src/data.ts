
export interface Sample {
  id: string;
  thumbnail: string;
  image: string;
  label: string;
  json: string;
  insights: string[];
}

export interface SuccessCase {
  id: string;
  image: string;
  issue: string;
  reason: string;
}

export interface FailureCase {
  id: string;
  image: string;
  issue: string;
  behavior: string;
  cause: string;
  insight: string;
}

export const SAMPLES: Sample[] = [
  {
    id: '1',
    thumbnail: '/public/samples/images/sample1.webp',
    image: '/public/samples/images/sample1.webp',
    label: 'Sample 01',
    json: '/public/samples/labels/sample1.json',
    insights: ['상추균핵병 감지', '높은 수준의 감지', '넓은 범위'],
  },
  {
    id: '2',
    thumbnail: '/public/samples/images/sample2.webp',
    image: '/public/samples/images/sample2.webp',
    label: 'Sample 02',
    json: '/public/samples/labels/sample2.json',
    insights: ['상추노균병 감지', '중간 수준의 감지', '좁은 범위'],
  },
  {
    id: '3',
    thumbnail: '/public/samples/images/sample3.webp',
    image: '/public/samples/images/sample3.webp',
    label: 'Sample 03',
    json: '/public/samples/labels/sample3.json',
    insights: ['상추노균병 감지', '중간 수준의 탐지', '좁은 범위'],
  },
  {
    id: '4',
    thumbnail: '/public/samples/images/sample4.webp ',
    image: '/public/samples/images/sample4.webp ',
    label: 'Sample 04',
    json: '/public/samples/labels/sample4.json',
    insights: ['상추균핵병 감지', '중간 수준의 탐지', '넓은 범위'],
  },
  {
    id: '5',
    thumbnail: '/public/samples/images/Sample5.webp',
    image: '/public/samples/images/Sample5.webp',
    label: 'Sample 05',
    json: '/public/samples/labels/sample5.json',
    insights: ['상추균핵병 감지', '낮은 수준의 탐지', '매우 좁은 범위'],
  },
  {
    id: '6',
    thumbnail: '/public/samples/images/Sample6.webp',
    image: '/public/samples/images/Sample6.webp',
    label: 'Sample 06',
    json: '/public/samples/labels/sample6.json',
    insights: ['검출되지 않음', '검출등급 없음', '없음'],
  },
];

export const SUCCESS_CASES: SuccessCase[] = [
  {
    id: 's1',
    image: '/public/sucessCase/images/sucessSample1.webp',
    issue: '뚜렷한 사례를 통해 높은 bbox가 출력되는 경우',
    reason: '질병으로 예상되는 잎의 색과 주위의 색이 명백하게 다른 부분을 추론하도록 학습한 결과 색이 명확하게 다른 부분의 bbox를 높은 수준으로 탐지함',

  },
  {
    id: 's2',
    image: '/public/sucessCase/images/sucessSample2.webp',
    issue: '탐지 부분이 미세하지만 작동이 정상적으로 나온 경우',
    reason: '육안으로 집중하지 않으면 보기 힘들 정도의 미세한 병변이나 잎의 골곡진 부분, 잎의 전체 색상을 비교해 질병이라고 판단 되는 부분을 정확하게 탐지',

  },
];

export const FAILURE_CASES: FailureCase[] = [
  {
    id: 'f1',
    image: '/public/failCase/FailSample1.webp',
    issue: '질병이 없는 정상적인 상추의 이미지.',
    behavior: '모든 상추를 대상으로 넓은 범위의 bbox 출력(FP).',
    cause: '배경의 반사광으로 인해 이미지 속 상추의 잎이 다른 색으로 변한 것처럼 보이며 이것이 오탐지의 원인이 됨.',
    insight: '밝기가 높은 경우의 데이터를 증강 학습하여 배경이 밝은 경우의 오탐지를 감소해야함.',
  },
  {
    id: 'f2',
    image: '/public/failCase/FailSample2.webp',
    issue: '상추의 잎이 전체적으로 노균병에 감염된 모습.',
    behavior: '질병이 육안으로 확인됨에도 불구하고 bbox가 출력되지 않음(FN).',
    cause: '노균병이 고르게 퍼져있는 경우에 대한 데이터를 충분히 학습하지 못함.',
    insight: '노균병에 대한 다양한 상황의 데이터를 확보.',
  },
  {
    id: 'f3',
    image: '/public/failCase/FailSample3.webp',
    issue: '상추의 일정 부위가 노균병에 감염된 모습.',
    behavior: '노균병이 밀집해 있음에도 불구하고 정상적으로 탐지되지 않음(FN).',
    cause: 'conf threshold가 너무 높게 설정되어 노균병으로 판단되는 영역의 conf score가 낮게 출력됨.',
    insight: 'conf threshold를 낮춰 모델의 데이터 확신 부족인지 잘못된 데이터를 학습했는지 확인.',
  },
];


