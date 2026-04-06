
## 1. Overview

# 🥬 Lettuce Disease Detection AI Web Service  
  
YOLOv11 기반 상추 질병 검출 모델을 웹 서비스 형태로 구현한 프로젝트입니다.  
  
단순 모델 실행이 아니라,  
이미지 입력부터 추론, 결과 시각화까지의 전체 AI inference 파이프라인을 구축하는 것을 목표로 합니다.

---

## 2. Key Features

- YOLOv11 기반 질병 부위 검출 (Object Detection)  
- FastAPI 기반 inference API 서버 구축  
- React 기반 결과 시각화 UI 구현  
- JSON 기반 bbox / confidence 데이터 처리  
- 정적 데모 + 실시간 inference 구조 분리

---

## 3. System Architecture

[Frontend (React)]  
- 이미지 업로드 / 결과 시각화  
  
        ↓  
  
[Backend (FastAPI)]  
- 이미지 처리  
- YOLO inference 수행  
  
        ↓  
  
[Model (YOLOv11)]  
- 질병 부위 검출 (bbox + confidence)  
  
        ↓  
  
[Response]  
- JSON 형태 결과 반환

---

## 4. Tech Stack

### Frontend  
- React (Vite + TypeScript)  
- Tailwind CSS  
- GSAP  
- Fetch API  
  
### Backend  
- FastAPI  
- Uvicorn  
- Pillow  
- python-multipart  
  
### AI Model  
- Ultralytics YOLOv11

---

## 5. Frontend Implementation

프론트엔드는 단순 UI가 아닌,  
AI 결과를 사용자에게 전달하는 인터페이스로 설계되었습니다.  
  
### 주요 기능  
  
- JSON 기반 bbox 시각화 (absolute overlay)  
- 이미지 크기 대비 좌표 스케일링 처리  
- confidence threshold 기반 필터링  
- bbox hover 및 강조 인터랙션  
- GSAP 기반 애니메이션 적용  
  
### 구조  
  
- 정적 데모: JSON 기반 샘플 결과 시각화  
- Developer Demo: FastAPI inference 검증 UI  
  
### Developer Demo  
  
- 이미지 업로드 → FastAPI API 호출  
- 실시간 inference 결과 시각화  
- threshold 조절 및 bbox 필터링  
- inference latency 표시

---

## 6. Backend Implementation

FastAPI 기반으로 YOLO inference 서버를 구축했습니다.  
  
### 주요 기능  
  
- 이미지 업로드 처리 (multipart/form-data)  
- YOLO 모델 inference 수행  
- 결과 JSON 변환 및 반환  
  
### 핵심 설계  
  
- 서버 시작 시 모델 1회 로딩  
- 메모리 기반 이미지 처리 (Disk I/O 제거)  
- inference_time 측정 및 반환  
- CORS 설정을 통한 프론트 연동

---

## 7. Model

YOLOv11 기반 단일 클래스(disease) detection 모델을 사용했습니다.  
  
### 설계 방향  
  
- multi-class → single-class로 문제 단순화  
- 질병 “종류”가 아닌 “위치 검출”에 집중

---

## 8. Demo Flow

### 정적 데모  
샘플 이미지 선택 → JSON 로드 → bbox 시각화  
  
### 실시간 데모 (Developer)  
이미지 업로드 → API 호출 → inference → 결과 표시

---

## 9. Key Insight

이 프로젝트는 모델 성능 개선이 아닌,  
  
"AI 모델을 실제 서비스에서 사용할 수 있도록 연결하는 것"  
  
에 초점을 맞춘 프로젝트입니다.

---

## 10. Future Work

- threshold 기반 후처리 개선  
- bbox filtering 및 NMS 개선  
- batch inference 지원  
- WebSocket 기반 실시간 처리  
- Edge Device 최적화