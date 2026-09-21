/**
 * 샘플 게시물용 자체 제작 플레이스홀더 이미지 생성기.
 *
 *   node docs/tools/programmer-01/make-sample-images.mjs
 *
 * 외부 이미지를 가져오지 않기 위해(샘플에 실제 사진·언론 이미지를 쓰지 않는다)
 * zlib만으로 PNG를 직접 인코딩한다. 도형·격자무늬뿐이며 글자는 넣지 않는다.
 */
import { deflateSync } from 'node:zlib'
import fs from 'node:fs'
import path from 'node:path'

function crc32(buffer) {
  let crc = 0xffffffff
  for (const byte of buffer) {
    crc ^= byte
    for (let bit = 0; bit < 8; bit += 1) {
      crc = crc & 1 ? (crc >>> 1) ^ 0xedb88320 : crc >>> 1
    }
  }
  return (crc ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const length = Buffer.alloc(4)
  length.writeUInt32BE(data.length)
  const body = Buffer.concat([Buffer.from(type, 'ascii'), data])
  const crc = Buffer.alloc(4)
  crc.writeUInt32BE(crc32(body))
  return Buffer.concat([length, body, crc])
}

function encodePng(width, height, pixelAt) {
  const raw = Buffer.alloc(height * (1 + width * 3))
  let offset = 0
  for (let y = 0; y < height; y += 1) {
    raw[offset] = 0 // filter: none
    offset += 1
    for (let x = 0; x < width; x += 1) {
      const [r, g, b] = pixelAt(x, y)
      raw[offset] = r
      raw[offset + 1] = g
      raw[offset + 2] = b
      offset += 3
    }
  }

  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(width, 0)
  ihdr.writeUInt32BE(height, 4)
  ihdr[8] = 8 // bit depth
  ihdr[9] = 2 // color type: truecolor
  ihdr[10] = 0
  ihdr[11] = 0
  ihdr[12] = 0

  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0)),
  ])
}

function mix(a, b, t) {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ]
}

/** 대각선 띠 + 옅은 격자. 사진처럼 보이지 않게 의도적으로 도형만 쓴다. */
function makePattern(from, to, stripe) {
  return (x, y) => {
    const t = (x / 1200 + y / 800) / 2
    let color = mix(from, to, t)
    const diagonal = (x + y) % 160
    if (diagonal < 26) color = mix(color, stripe, 0.55)
    if (x % 100 === 0 || y % 100 === 0) color = mix(color, [255, 255, 255], 0.18)
    return color
  }
}

const TARGETS = [
  {
    file: 'public/images/example-case-b/scene-01.png',
    pattern: makePattern([39, 39, 42], [82, 82, 91], [191, 219, 254]),
  },
  {
    file: 'public/images/example-case-c/scene-01.png',
    pattern: makePattern([24, 24, 27], [63, 63, 70], [253, 230, 138]),
  },
  {
    file: 'public/images/example-case-c/scene-02.png',
    pattern: makePattern([30, 41, 59], [71, 85, 105], [254, 202, 202]),
  },
]

for (const target of TARGETS) {
  const absolute = path.join(process.cwd(), target.file)
  fs.mkdirSync(path.dirname(absolute), { recursive: true })
  const png = encodePng(1200, 800, target.pattern)
  fs.writeFileSync(absolute, png)
  console.log(`${target.file} — ${png.length.toLocaleString()} bytes (1200x800)`)
}
