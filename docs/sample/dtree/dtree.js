treeJson = d3.json("./data.json", function(error, treeData) {
    dTree.init(treeData,
        {
            target: "#graph",
            debug: true,
            hideMarriageNodes: true,
            marriageNodeSize: 5,
            height: 800,
            width: 1200,
            nodeWidth: 92,
            callbacks: {
                // ラッパー
                nodeRenderer: function(name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
                    let node = '';
                    node += '<div style="width:100%;height:100%;" ';
                    node += 'class="card-wrapper ';
                    if (extra && extra.inheritee) {
                        // 分配対象者
                        node += 'is-inheritee ';
                    } else if(extra && extra.deceased) {
                        // 故人
                        node += 'is-deceased ';
                    }
                    if (extra && extra.you) {
                        node += 'is-you ';
                    }
                    node += '" ';
                    node += 'id="node' + id + '">\n';
                    node += textRenderer(name, extra, textClass);
                    node += '</div>';
                    return node;
                },
                // 内容
                textRenderer: function(name, extra, textClass) {
                    let text = '';
                    // 分配割合
                    text += `<div class="card-share"><span class="card-share-num">`;
                    if (extra && extra.share) {
                        text += `${extra.share}`;
                    }
                    text += `</span><br><span class="card-share-deco"></span></div>`;

                    // 画像+続柄ラッパー
                    text += '<div class="card-person">';

                    // あなた
                    text += '<div class="card-you"><span class="card-you-tag">';
                    if (extra && extra.you) {
                        text += 'あなた';
                    }
                    text += '</span></div>';

                    // 画像
                    text += '<div class="card-image">';
                    // 故人
                    if(extra && extra.deceased) {
                        text += `<img src="./img/${extra.image}_deceased.png" alt="" width="64" height="64">`
                    } else if (extra && extra.image) {
                        text += `<img src="./img/${extra.image}.png" alt="" width="52" height="52">`
                    } else {
                        text += `<img src="./img/young-man.png" alt="" width="52" height="52">`
                    }
                    text += '</div>';

                    // 続柄
                    text += `<span class="card-relation">${name}</span>`;

                    text += '</div>';

                    return text;
                }
            }
        }
    );
});