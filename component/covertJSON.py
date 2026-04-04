from pathlib import Path
import json
from ultralytics import YOLO


# =========================
# 설정
# =========================
MODEL_PATH = "runs/detect/train/weights/best.pt"
IMAGE_DIR = "samples/images"
OUTPUT_DIR = "samples/results_640"
MODEL_NAME = "lettuce_yolo_640"
INPUT_SIZE = 640
CONF_THRESHOLD = 0.25

# 클래스 이름 직접 지정 가능
CLASS_NAMES = {
    0: "disease"
}


# =========================
# 유틸 함수
# =========================
def ensure_dir(path: str):
    Path(path).mkdir(parents=True, exist_ok=True)


def convert_result_to_json(result, image_name: str, model_name: str, input_size: int):
    detections = []

    orig_h, orig_w = result.orig_shape

    if result.boxes is not None:
        for box in result.boxes:
            xyxy = box.xyxy[0].tolist()   # [x1, y1, x2, y2]
            conf = float(box.conf[0].item())
            cls_id = int(box.cls[0].item())

            detections.append({
                "class_id": cls_id,
                "class_name": CLASS_NAMES.get(cls_id, str(cls_id)),
                "confidence": round(conf, 4),
                "bbox": {
                    "x1": round(float(xyxy[0]), 2),
                    "y1": round(float(xyxy[1]), 2),
                    "x2": round(float(xyxy[2]), 2),
                    "y2": round(float(xyxy[3]), 2)
                }
            })

    return {
        "image": image_name,
        "image_width": orig_w,
        "image_height": orig_h,
        "model_name": model_name,
        "input_size": input_size,
        "detections": detections
    }


# =========================
# 메인
# =========================
def main():
    ensure_dir(OUTPUT_DIR)

    model = YOLO(MODEL_PATH)

    image_paths = []
    for ext in ["*.jpg", "*.jpeg", "*.png", "*.JPG", "*.JPEG", "*.PNG"]:
        image_paths.extend(Path(IMAGE_DIR).glob(ext))

    image_paths = sorted(image_paths)

    if not image_paths:
        print(f"[ERROR] No images found in: {IMAGE_DIR}")
        return

    print(f"[INFO] Found {len(image_paths)} images")

    for image_path in image_paths:
        results = model.predict(
            source=str(image_path),
            imgsz=INPUT_SIZE,
            conf=CONF_THRESHOLD,
            verbose=False
        )

        result = results[0]
        output_data = convert_result_to_json(
            result=result,
            image_name=image_path.name,
            model_name=MODEL_NAME,
            input_size=INPUT_SIZE
        )

        output_json_path = Path(OUTPUT_DIR) / f"{image_path.stem}.json"
        with open(output_json_path, "w", encoding="utf-8") as f:
            json.dump(output_data, f, ensure_ascii=False, indent=2)

        print(f"[SAVED] {output_json_path}")

    print("[DONE] JSON export finished")


if __name__ == "__main__":
    main()