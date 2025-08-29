# Acne‑Detection

Detect acne lesions on face images with a lightweight deep‑learning pipeline and an optional web demo.

> **Status**: WIP (open to issues & PRs)

---

## ✨ Features

* **Object detection** of acne lesions (bounding boxes) using YOLOv8 (Ultralytics)
* **Fast start**: run on CPU or GPU; one‑line pip install
* **Simple dataset format** (YOLO txt labels)
* **Training / validation / inference** scripts
* **Optional web app** (Streamlit) for drag‑and‑drop images

---

## 📁 Project structure

```
Acne-Detection/
├─ data/                   # your datasets (not committed)
│  ├─ images/{train,val,test}/
│  └─ labels/{train,val,test}/   # YOLO txt files (x_center y_center w h class)
├─ notebooks/              # experiments (optional)
├─ runs/                   # training logs & weights (auto-created)
├─ src/
│  ├─ train.py             # training entrypoint
│  ├─ infer.py             # image/folder/video inference
│  ├─ export.py            # export to onnx/tflite
│  └─ utils.py             # helpers
├─ app/
│  └─ app.py               # Streamlit demo
├─ data.yaml               # YOLO dataset config (paths, class names)
├─ requirements.txt
└─ README.md
```

---

## 🔧 Setup

1. **Clone**

```bash
git clone https://github.com/arpittak027/Acne-Detection.git
cd Acne-Detection
```

2. **Create env (optional)**

```bash
python -m venv .venv && source .venv/bin/activate  # (Windows) .venv\Scripts\activate
```

3. **Install deps**

```bash
pip install -r requirements.txt
# If requirements.txt isn’t present, this minimal set works:
pip install ultralytics==8.* opencv-python pillow numpy torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
```

> Adjust the PyTorch index URL above to match your CUDA/CPU setup.

---

## 📦 Dataset

* **Classes**: `acne` (single class)
* **Format**: YOLO labels per image file in `labels/.../*.txt`

  * Each line: `class x_center y_center width height` (all values normalized 0–1)
* **data.yaml** example

```yaml
path: ./data
train: images/train
val: images/val
names: [acne]
```

🗂️ **Where to get data?** You can build a small set from public dermatology sources (respect licenses) or use academic datasets if allowed. Make sure images are face‑cropped or annotate full images carefully.

---

## 🚀 Train

```bash
# from repo root
python -m ultralytics yolo detect train \
  data=data.yaml \
  model=yolov8n.pt \
  imgsz=640 \
  epochs=50 \
  batch=16 \
  name=acne_yolov8n
```

Outputs (weights, metrics) land in `runs/detect/acne_yolov8n/`.

**Tips**

* Start with `yolov8n.pt` (nano). If GPU is available and data is enough, try `yolov8s.pt`/`m.pt`.
* Use **augmentations**: `hsv`, `flip`, `mosaic` to combat data scarcity.

---

## 🔎 Inference

**Single image**

```bash
python -m ultralytics yolo detect predict \
  model=runs/detect/acne_yolov8n/weights/best.pt \
  source=path/to/image.jpg \
  conf=0.25 \
  save=True
```

**Folder / webcam / video** also supported by setting `source` to a folder path, `0` (webcam) or a video file.

If you prefer a plain Python script:

```bash
python src/infer.py --model runs/detect/acne_yolov8n/weights/best.pt --source path/to/image_or_dir
```

---

## 🌐 Web demo (optional)

```bash
pip install streamlit
streamlit run app/app.py
```

* Drag & drop an image; the app draws boxes and returns counts + confidence.

---

## 📊 Evaluation

* mAP\@0.5 and mAP\@0.5:0.95 reported after training
* Track precision/recall in `runs/.../results.png` and `results.csv`

**Recommended splits**

* train: 70%  · val: 20%  · test: 10%

---

## 🧪 Repro tips

* Fix seeds: `export PYTHONHASHSEED=0; torch.manual_seed(0)`
* Keep input size consistent (e.g., 640)
* Ensure label quality—bad boxes ⇒ bad model

---

## 🧱 Known limitations

* Small, clustered lesions are hard; confidence may be low on noisy selfies
* Skin tones, lighting, and make‑up can bias results—expand dataset diversity
* **Not medical advice**; for education/research only

---

## 🗺️ Roadmap

* [ ] Multi‑class lesions (pustule, papule, blackhead)
* [ ] Segmentation mask for severity scoring
* [ ] Mobile export (TFLite / ONNX / CoreML)
* [ ] On‑device inference demo (Android)

---

## 🤝 Contributing

1. Fork → create feature branch → PR
2. Add tests/notebooks if applicable
3. Describe data & metrics clearly

---

## 📄 License

Specify your license here (MIT recommended for research/edu). Ensure dataset terms allow redistribution.

---

## 🙌 Acknowledgements

This repo uses the excellent **Ultralytics YOLO** tooling. Consider citing relevant acne‑detection papers/datasets if you trained on them.

---

## 🧰 Quick commands (copy‑paste)

```bash
# 0) Install base deps
pip install ultralytics opencv-python pillow numpy

# 1) Train
python -m ultralytics yolo detect train data=data.yaml model=yolov8n.pt imgsz=640 epochs=50 batch=16 name=acne_yolov8n

# 2) Predict
python -m ultralytics yolo detect predict model=runs/detect/acne_yolov8n/weights/best.pt source=sample.jpg conf=0.25 save=True

# 3) Export to ONNX
python -m ultralytics yolo export model=runs/detect/acne_yolov8n/weights/best.pt format=onnx dynamic=True
```

---

## 📬 Contact

* Maintainer: Arpit Tak (GitHub: `@arpittak027`)
* Issues: please include environment, steps to reproduce, and sample images (redact personal info)

