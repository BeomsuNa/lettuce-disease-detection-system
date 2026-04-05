from io import BytesIO

from fastapi import FastAPI, UploadFile, File, HTTPException
from PIL import Image, UnidentifiedImageError
from ultralytics import YOLO

app = FastAPI(title="Lettuce Disease Detection Demo API")

# 서버 시작 시 모델 1회 로드
try:
    model = YOLO("model/best.pt")
    model_load_error = None
except Exception as e:
    model = None
    model_load_error = str(e)


@app.get("/")
def root():
    return {"message": "Backend server is running"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    if model is None:
        raise HTTPException(
            status_code=500,
            detail=f"모델 로딩 실패: {model_load_error}"
        )

    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(
            status_code=400,
            detail="이미지 파일만 업로드할 수 있습니다."
        )

    try:
        file_bytes = await file.read()
        image = Image.open(BytesIO(file_bytes)).convert("RGB")
    except UnidentifiedImageError:
        raise HTTPException(
            status_code=400,
            detail="유효한 이미지 파일이 아닙니다."
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"이미지 처리 실패: {str(e)}"
        )

    image_width, image_height = image.size

    try:
        results = model.predict(image, verbose=False)
        result = results[0]
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"추론 실패: {str(e)}"
        )

    detections = []

    if result.boxes is not None:
        boxes_xyxy = result.boxes.xyxy.tolist()
        boxes_conf = result.boxes.conf.tolist()
        boxes_cls = result.boxes.cls.tolist()

        for xyxy, conf, cls_id in zip(boxes_xyxy, boxes_conf, boxes_cls):
            x1, y1, x2, y2 = xyxy

            detections.append({
                "class_name": result.names[int(cls_id)],
                "confidence": round(float(conf), 4),
                "bbox": {
                    "x1": round(float(x1), 2),
                    "y1": round(float(y1), 2),
                    "x2": round(float(x2), 2),
                    "y2": round(float(y2), 2),
                }
            })

    return {
        "image_width": image_width,
        "image_height": image_height,
        "detections": detections
    }