const Avatar = require('./Avatar');
const Badge = require('./Badge');
const Breadcrumb = require('./Breadcrumb');
const Button = require('./Button');
const Card = require('./Card');
const DatePicker = require('./DatePicker');
const Form = require('./Form');
const Input = require('./Input');
const Modal = require('./Modal');
const PopTip = require('./Poptip');
const Progress = require('./Progress');
const Select = require('./Select');
const SelectOption = require('./SelectOption');
const Spin = require('./Spin');
const Switch = require('./Switch');
const Tabs = require('./Tabs');
const Tag = require('./Tag');
const Tooltip = require('./Tooltip');
// Icon
// Table

module.exports = [
    Button,
    Badge,
    Modal,
    Input,
    Avatar,
    Select,
    SelectOption,
    Form,
    Tabs,
    PopTip,
    Tooltip,
    Progress,
    Switch,
    Tooltip,
    PopTip,
    Tag,
    Card,
    DatePicker,
    Breadcrumb,
    Spin
]

/**
 * 没做的
 * Table @on-selection-change 有 12 个
 * Page
 * Switch  注意 i-switch
 * Breadcrumb  手动修改 router 绑定
 * Upload  就一个地方
 * Checkbox  同下
 * CheckboxGroup  用于设置表格 => 需要手动替换
 * Icon  对应图标需要手动替换
 * Alert antd 跟 iview 完全不同
 * Spin  需要手动替换 跟 View 实现逻辑不一样
 * Tree  手动替换
 */