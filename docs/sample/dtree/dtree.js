treeJson = d3.json("./data.json", function(error, treeData) {
    dTree.init(treeData,
        {
            target: "#graph",
            debug: true,
            hideMarriageNodes: true,
            marriageNodeSize: 5,
            height: 800,
            width: 1200,
            nodeWidth: 84,
            callbacks: {
                nodeRenderer: function(name, x, y, height, width, extra, id, nodeClass, textClass, textRenderer) {
                    let node = '';
                    node += '<div style="height:100%;width:100%;"><div class="card-wrapper';
                    if (extra && extra.inheritee) {
                        // 分配対象者
                        node += ' is-inheritee';
                    } else if(extra && extra.deceased) {
                        // 故人
                        node += ' is-deceased';
                    }
                    if (extra && extra.you) {
                        node += ' is-you';
                    }
                    node += '">';
                    node += textRenderer(name, extra, textClass);
                    node += '</div></div>';
                    return node;
                },
                textRenderer: function(name, extra, textClass) {
                    let text = '';
                    // 分配割合
                    if (extra && extra.share) {
                        text += `<div class="card-share">${extra.share}</div>`;
                    }
                    text += '<div class="card-bg">';

                    // 画像
                    text += '<div class="card-image">';
                    if (extra && extra.image) {
                        text += `<img src="./img/${extra.image}.png" alt="" width="64" height="64">`
                    } else {
                        text += `<img src="./img/young-man.png" alt="" width="64" height="64">`
                    }
                    text += '</div>';

                    // 続柄
                    text += `<span class="card-relation">${name}</span>`;

                    text += '</div>';
                    return text;
                },
            },
        }
    );
});