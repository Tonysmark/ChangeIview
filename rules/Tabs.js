module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Tabs $$$1>$$$2</Tabs>`,
            `<a-tabs $$$1>$$$2</a-tabs>`
        )
        .replace(
            `<TabPane $$$1>$$$2</TabPane>`,
            `<a-tab-pane $$$1>$$$2</a-tab-pane>`
        )
        .replace(
            `<a-tab-pane label="$_$"  $$$1>$$$2</a-tab-pane>`,
            `<a-tab-pane tab="$_$" $$$1>$$$2</a-tab-pane>`,
        )
        .replace(
            `<a-tab-pane name="$_$"  $$$1>$$$2</a-tab-pane>`,
            `<a-tab-pane key="$_$" $$$1>$$$2</a-tab-pane>`,
        )
        .root('sfc');
}