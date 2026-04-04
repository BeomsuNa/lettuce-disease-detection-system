
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
    issue: '정상인데도 질병 탐지가 되는 경우 (FP) ',
    behavior: 'No bounding box generated',
    cause: 'Model struggles with small object detection at 640px input',
    insight: 'Higher resolution or dataset balancing may improve performance',
  },
  {
    id: 'f2',
    image: '/public/failCase/FailSample2.webp',
    issue: '탐지 부분이 미세할정도로 낮아 탐지되는 경우',
    behavior: 'False positive on soil pattern',
    cause: 'Sensitivity to background patterns resembling lesions',
    insight: 'Augmenting background-only samples could reduce false positives',
  },
  {
    id: 'f3',
    image: '/public/failCase/FailSample3.webp',
    issue: 'Boundary ambiguity',
    behavior: 'Unstable bounding boxes in overlapping regions',
    cause: 'Ambiguity in distinguishing overlapping infected leaves',
    insight: 'Instance segmentation might provide better separation than bboxes',
  },
];


