module.exports = function (ast) {
    return ast
        .find('<template></template>')
        .replace(
            `<Button $$$1>$$$2</Button>`,
            `<a-button $$$1>$$$2</a-button>`
        )
        .replace(
            `<i-button $$$1>$$$2</i-button>`,
            `<a-button $$$1>$$$2</a-button>`
        )
        .replace(
            `<ButtonGroup $$$1>$$$2</ButtonGroup>`,
            `<a-button-group $$$1>$$$2</a-button-group>`
        )
        .replace(
            `<Button slot="append" $$$1>$$$2</Button>`,
            `<a-button slot="suffix" $$$1>$$$2</a-button>`
        )
        .replace(
            `<a-button icon="ios-search" $$$1>$$$2</a-button>`,
            `<a-button icon="search" $$$1>$$$2</a-button>`
        )
        .replace(
            `<a-button icon="ios-cloud-download" $$$1>$$$2</a-button>`,
            `<a-button icon="cloud-download" $$$1>$$$2</a-button>`
        )
        .replace(
            `<a-button icon="chevron-left" $$$1>$$$2</a-button>`,
            `<a-button icon="left" $$$1>$$$2</a-button>`
        )
        .replace(
            `<a-button icon="trash-a" $$$1>$$$2</a-button>`,
            `<a-button icon="delete" $$$1>$$$2</a-button>`
        )
        .replace(
            `<a-button icon="plus-round" $$$1>$$$2</a-button>`,
            `<a-button icon="plus-circle" $$$1>$$$2</a-button>`
        )
        .replace(
            `<a-button icon="ios-arrow-back" $$$1>$$$2</a-button>`,
            `<a-button icon="left" $$$1>$$$2</a-button>`
        )
        .root('sfc');
}