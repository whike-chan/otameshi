/*
 * サンプルのくるくる
 */
// 要素を指定
const illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true //マウスでぐりぐり
})

// 円を追加
new Zdog.Ellipse({
  addTo: illo,
  diameter: 80, //直径
  stroke: 20, //線の太さ
  color: '#E62' //図形の色
})

// 図形を描画
illo.updateRenderGraph()

// アニメーションさせる
const animate = () => {
  illo.rotate.x += 0.03
  illo.rotate.y += 0.03
  illo.updateRenderGraph()

  requestAnimationFrame(animate)
}
animate()

/*
 * タミー
 */
// 要素を指定
const tammy = new Zdog.Illustration({
  element: '.zdog-canvas-tammy',
  dragRotate: true //マウスでぐりぐり
})
// 頭
const head = new Zdog.Shape({
  addTo: tammy,
  stroke: 200,
  color: '#975A46'
})
// 耳
const ear_left = new Zdog.Ellipse({
  addTo: tammy,
  diameter: 60,
  quarters: 2,
  stroke: 10,
  fill: true,
  rotate: { z: -Zdog.TAU / 2.8 },
  translate: { x: -60, y: -60 }
})
ear_left.copy({
  rotate: { z: -Zdog.TAU / 6 },
  translate: { x: 60, y: -60 }
})
// 目の下地
const eye_ground = new Zdog.Ellipse({
  addTo: tammy,
  width: 150,
  height: 40,
  stroke: 15,
  fill: true,
  color: 'white',
  translate: { y: -10, z: 85 }
})
// 目
const eye_left = new Zdog.Shape({
  addTo: tammy,
  stroke: 10,
  color: '#000',
  translate: { x: -40, y: -10, z: 90 }
})
eye_left.copy({
  translate: { x: 40, y: -10, z: 90 }
})
// 口
const mouth = new Zdog.Ellipse({
  addTo: tammy,
  // diameter: 40,
  width: 43,
  height: 33,
  quarters: 2,
  stroke: 1,
  fill: true,
  rotate: { z: -Zdog.TAU / 4 },
  translate: { x: 0, y: 60, z: 90 },
  color: 'red'
})
// 図形を描画
tammy.updateRenderGraph()

// アニメーションさせる
const anime_tammy = () => {
  tammy.updateRenderGraph()

  requestAnimationFrame(anime_tammy)
}
anime_tammy()
