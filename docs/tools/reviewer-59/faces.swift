// 리뷰어 59 — macOS Vision 얼굴 박스(눈썹~턱 근사, 이마~턱보다 작아 하한값으로만 쓴다). 빌드: swiftc -O faces.swift -o <저장소 밖 경로> · 사용: <실행파일> <이미지>
import Foundation
import Vision
import AppKit
let path = CommandLine.arguments[1]
guard let img = NSImage(contentsOfFile: path), let cg = img.cgImage(forProposedRect: nil, context: nil, hints: nil) else { print("load fail"); exit(1) }
let W = Double(cg.width), H = Double(cg.height)
let req = VNDetectFaceRectanglesRequest()
if #available(macOS 12.0, *) { req.revision = VNDetectFaceRectanglesRequestRevision3 }
let h = VNImageRequestHandler(cgImage: cg, options: [:])
try h.perform([req])
print("size \(Int(W))x\(Int(H)) short=\(Int(min(W,H)))")
var res = (req.results ?? []).map { o -> (Double,Double,Double,Double,Double) in
  let b = o.boundingBox; return (b.minX*W, (1-b.maxY)*H, b.width*W, b.height*H, Double(o.confidence)) }
res.sort { $0.3 > $1.3 }
for r in res { print(String(format: "x=%.0f y=%.0f w=%.0f h=%.0f pct=%.1f conf=%.2f", r.0, r.1, r.2, r.3, r.3/min(W,H)*100, r.4)) }
print("count \(res.count)")
