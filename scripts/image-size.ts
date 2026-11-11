/**
 * 저장소 이미지 파일의 가로·세로(px)를 파일 머리만 읽어 구한다(프로그래머 19 — 의존성 추가 없음).
 * JPEG(SOF 마커)·PNG(IHDR)·WebP(VP8/VP8L/VP8X)만 본다. 그 밖 형식이거나 머리가 깨졌으면 undefined.
 * `npm run validate:content`의 "public·open 저장 파일 짧은 변 400px 미만" 경고(정책 §4.5-7 · §5.3-8)에 쓴다.
 */
import fs from 'node:fs'

export interface ImageSize {
  width: number
  height: number
}

function jpegSize(buf: Buffer): ImageSize | undefined {
  if (buf.length < 4 || buf[0] !== 0xff || buf[1] !== 0xd8) return undefined
  let offset = 2
  while (offset + 4 <= buf.length) {
    if (buf[offset] !== 0xff) {
      offset += 1
      continue
    }
    const marker = buf[offset + 1] as number
    // 채움 바이트(0xFF 0xFF)·독립 마커(RST·SOI·EOI·TEM)는 길이가 없다.
    if (marker === 0xff) {
      offset += 1
      continue
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      offset += 2
      continue
    }
    if (marker === 0xd9) return undefined
    const length = buf.readUInt16BE(offset + 2)
    // SOF0~SOF15 중 DHT(C4)·JPG(C8)·DAC(CC)를 뺀 것이 프레임 머리다.
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      if (offset + 9 > buf.length) return undefined
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) }
    }
    offset += 2 + length
  }
  return undefined
}

function pngSize(buf: Buffer): ImageSize | undefined {
  const signature = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]
  if (buf.length < 24 || signature.some((byte, index) => buf[index] !== byte)) return undefined
  if (buf.toString('ascii', 12, 16) !== 'IHDR') return undefined
  return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
}

function webpSize(buf: Buffer): ImageSize | undefined {
  if (buf.length < 30 || buf.toString('ascii', 0, 4) !== 'RIFF' || buf.toString('ascii', 8, 12) !== 'WEBP') return undefined
  const chunk = buf.toString('ascii', 12, 16)
  if (chunk === 'VP8 ') {
    return { width: buf.readUInt16LE(26) & 0x3fff, height: buf.readUInt16LE(28) & 0x3fff }
  }
  if (chunk === 'VP8L') {
    const bits = buf.readUInt32LE(21)
    return { width: (bits & 0x3fff) + 1, height: ((bits >> 14) & 0x3fff) + 1 }
  }
  if (chunk === 'VP8X') {
    return { width: buf.readUIntLE(24, 3) + 1, height: buf.readUIntLE(27, 3) + 1 }
  }
  return undefined
}

/** 메모리의 이미지 바이트에서 크기를 구한다(테스트용으로도 내보낸다). */
export function imageSizeFromBuffer(buf: Buffer): ImageSize | undefined {
  return jpegSize(buf) ?? pngSize(buf) ?? webpSize(buf)
}

/** 파일 경로에서 크기를 구한다. 읽지 못하면 undefined. */
export function readImageSize(filePath: string): ImageSize | undefined {
  try {
    return imageSizeFromBuffer(fs.readFileSync(filePath))
  } catch {
    return undefined
  }
}
