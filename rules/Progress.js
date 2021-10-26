module.exports = function (ast) {
    // TODO  a-progress type="dashboard" 没办法还原的跟原来一样
    return ast
        .find('<template></template>')
        .replace(
            `<Progress $$$1>$$$2</Progress>`,
            `<a-progress $$$1>$$$2</a-progress>`
        )
        .replace(
            `<i-circle $$$1>$$$2</i-circle>`,
            `<a-progress type="dashboard" status="normal" $$$1>$$$2</a-progress>`
        )
        .root('sfc');
}

/**
 * 					<a-progress type="dashboard" :percent="calPercentage(agentLossOrderCount)">
 * <!-- eslint-disable-next-line vue/no-unused-vars -->
						<template #format="percent">
							<div class="number-title">{{ agentLossOrderCount }}</div>
						</template>
					</a-progress>
					<router-link class="circle-inner" to="/policy/claimOrder/rejectBackLifePolicy">
						<a-tooltip title="点击查看" placement="top">
							<div class="sub-title">报件数据缺失</div>
						</a-tooltip>
					</router-link>
 */