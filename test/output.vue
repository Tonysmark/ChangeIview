
<template>
  	<div class="panel">
  		<div class="margin-bottom">
  			<a-button icon="left" class="goback-btn" type="text" @click="goBack">返回</a-button>
  		</div>
  		<div class="panel-header">
  			<h2>{{ type == 'edit' ? '编辑' : '新增' }}头条</h2>
  		</div>
  		<div class="panel-body">
  			<a-row :gutter="32">
  				<a-col span="18" class="base-form-container">
  					<a-form-model :label-col="{ span: 2 }" :wrapper-col="{ span: 22 }" ref="headlineForm" :model="headlineForm" :rules="headlineRule">
  						<a-form-model-item label="头条属性：" required>
  							<a-select v-model="headlineForm.headlineProperty" placeholder="选择头条属性">
  								<a-select-option :value="1">视频头条</a-select-option>

  								<a-select-option :value="2">文章头条</a-select-option>
  							</a-select>
  						</a-form-model-item>

  						<a-form-model-item label="头条标题：" prop="headlineTitle">
  							<a-input type="text" v-model.trim="headlineForm.headlineTitle" placeholder="头条标题"></a-input>
  						</a-form-model-item>

  						<a-form-model-item label="头条作者：" prop="headlineAuthor">
  							<a-input type="text" v-model.trim="headlineForm.headlineAuthor" placeholder="头条作者"></a-input>
  						</a-form-model-item>

  						<a-form-model-item label="头条类型：" prop="headlineType">
  							<a-select v-model="headlineForm.headlineType" placeholder="选择头条类型">
  								<a-select-option v-for="item in headlineTypes" :value="item.headlineTypeId" :key="item.headlineTypeId">{{ item.headlineTypeName }}</a-select-option>
  							</a-select>
  						</a-form-model-item>

  						<a-form-model-item label="头条封面：" required>
  							<div class="upload-container type-img" style="width: 50%">
  								<template v-if="!!headlineCover.url">
  									<div class="delete-bar" @click="deleteCover">
  										<Icon type="trash-a" size="26"></Icon>
  									</div>
  									<img :src="headlineCover.url"/>
  								</template>
  								<template v-else>
  									<Icon type="image" size="36" style="color: #3399ff"></Icon>
  									<p>点击选择封面图片，建议图片尺寸：332 x 200</p>
  								</template>
  								$$$2
  							</div>
  						</a-form-model-item>

  						<a-form-model-item label="头条可见机构：">
  							<a-button @click="orgTreeModal = !orgTreeModal">{{ !!headlineForm.branchIds.length ? '点击查看所选机构或重新选择' : '选择机构' }}</a-button>
  						</a-form-model-item>

  						<a-form-model-item label="头条生效期间：">
  							<DatePicker style="width: 16em" type="daterange" :value="[headlineForm.validityDateStart, headlineForm.validityDateEnd]" placement="top-start" placeholder="选择开始日期和结束日期" @on-change="pickDate"></DatePicker>
  						</a-form-model-item>

  						<a-form-model-item label="头条视频：" :required="headlineForm.headlineProperty == 1">
  							<div class="flex flex-middle">
  								<span class="margin-right file-name" v-if="!!headlineVideo.file">
  									{{ headlineVideo.file.name }}
  								</span>
  								<a-progress class="flex-1 margin-right" v-if="headlineVideo.percent > 0 && headlineVideo.percent < 100" :percent="headlineVideo.percent"></a-progress>
  								<Icon v-if="headlineVideo.percent == 100" type="ios-checkmark" class="margin-right" color="#19be6b"></Icon>
  								<template v-if="headlineVideo.percent == 0 || headlineVideo.percent == 100">
  									<span class="ivu-upload margin-right">
  										<a-tooltip title="支持的视频文件格式：mp4" placement="top">
  											<a-button type="ghost" @click="chooseFile('headlineVideo')">{{ !!headlineVideo.file ? '重新选择' : '选择视频' }}</a-button>
  										</a-tooltip>
  										$$$2
  									</span>
  									<a-button type="dashed" class="margin-right" v-if="!!headlineVideo.file" @click="deleteFile('headlineVideo')">删除</a-button>
  								</template>
  							</div>
  						</a-form-model-item>

  						<template v-if="headlineForm.headlineProperty == 2">
  							<a-form-model-item label="头条音频：">
  								<div class="flex flex-middle">
  									<span class="margin-right file-name" v-if="!!headlineVoice.file">
  										{{ headlineVoice.file.name }}
  									</span>
  									<a-progress class="flex-1 margin-right" v-if="headlineVoice.percent > 0 && headlineVoice.percent < 100" :percent="headlineVoice.percent"></a-progress>
  									<Icon v-if="headlineVoice.percent == 100" type="ios-checkmark" class="margin-right" color="#19be6b"></Icon>
  									<template v-if="headlineVoice.percent == 0 || headlineVoice.percent == 100">
  										<span class="ivu-upload margin-right">
  											<a-tooltip title="支持的音频文件格式：mp3，wav" placement="top">
  												<a-button type="ghost" @click="chooseFile('headlineVoice')">{{ !!headlineVoice.file ? '重新选择' : '选择音频' }}</a-button>
  											</a-tooltip>
  											$$$2
  										</span>
  										<a-button type="dashed" class="margin-right" v-if="!!headlineVoice.file" @click="deleteFile('headlineVoice')">删除</a-button>
  									</template>
  								</div>
  							</a-form-model-item>
  							<a-form-model-item label="头条附件：">
  								<div class="ivu-upload">
  									<a-tooltip title="支持的文件格式：png，jpg，jpeg，doc，docx，xls，xlsx，ppt，pptx，pdf" placement="top">
  										<a-button type="ghost" @click="chooseFile('attachments')">添加附件</a-button>
  									</a-tooltip>
  									$$$2
  								</div>

  								<template v-if="!!attachments.length">
  									<div v-for="(item, index) in attachments" :key="item.timestamp" class="flex flex-middle">
  										<span class="margin-right file-name">{{ item.file.name }}</span>
  										<a-progress class="flex-1" v-if="item.percent > 0 && item.percent < 100" :percent="item.percent"></a-progress>
  										<Icon v-if="item.percent == 100" type="ios-checkmark" class="margin-right" color="#19be6b"></Icon>
  										<a-button icon="delete" type="text" v-if="item.percent == 0 || item.percent == 100" size="small" @click="deleteAttachment(index)"></a-button>
  									</div>
  								</template>
  							</a-form-model-item>
  						</template>

  						<a-form-model-item v-show="headlineForm.headlineProperty == 2" label="头条内容：">
  							<div ref="articleEditor"></div>
  						</a-form-model-item>
  					</a-form-model>
  				</a-col>
  				<a-col span="6">
  					<a-form-model :model="headlineForm">
  						<a-form-model-item label="是否置顶：" prop="isSettop">
  							<i-switch :trueValue="1" :falseValue="0" v-model="headlineForm.isSettop">
  								<span slot="open">是</span>
  								<span slot="close">否</span>
  							</i-switch>
  						</a-form-model-item>

  						<a-form-model-item label="是否推送：" prop="isPush">
  							<i-switch :trueValue="1" :falseValue="0" v-model="headlineForm.isPush">
  								<span slot="open">是</span>
  								<span slot="close">否</span>
  							</i-switch>
  						</a-form-model-item>

  						<a-form-model-item label="头条默认排序号：" prop="headlineSort">
  							<a-popover placement="left" trigger="hover">
  								<strong slot="title">普通头条排序号控制规则：</strong>

  								<a-input-number :min="1" v-model="headlineForm.headlineSort" :step="1"></a-input-number>

  								<p slot="content">由大到小排列,用于控制头条的默认排序，<strong>数字越大越靠前。</strong></p>
  							</a-popover>
  						</a-form-model-item>
  					</a-form-model>
  				</a-col>
  			</a-row>
  		</div>
  		<div class="panel-footer text-center">
  			<a-button type="primary" @click="saveHeadline" :loading="saveLoading">保存</a-button>
  		</div>
  		<a-modal :width="580" :maskClosable="false" @ok="getBranchIds" v-model="orgTreeModal" title="选择机构">
  			<organizeCheckboxTree ref="branchTree" :branchIds="headlineForm.branchIds"></organizeCheckboxTree>
  		</a-modal>
  		<Spin class="transparent-spin" size="large" fix v-if="saveLoading"></Spin>
  	</div>
</template>

<script>
import E from 'wangeditor';
import organizeCheckboxTree from '../../../components/organizeCheckboxTree';
import { getHeadlineTypeList, getHeadlineDetail, createHeadline, updateHeadline } from '../../../service/zyCloud/headline';
import { uploadFilePro } from '../../../service/index';
import { getBase64Url, getBlob } from '../../../assets/js/common';
import { getFormData } from '../../../assets/js/util';

export default {
	data() {
		let validateHeadlineType = (rule, value, callback) => {
			if (!value) {
				return callback(new Error('请选择头条类型'));
			}
			callback();
		};
		let { type } = this.$route.params,
			{ id: headlineId } = this.$route.query;
		return {
			type,
			headlineTypes: [],
			orgTreeModal: false,
			headlineForm: {
				headlineId,
				headlineProperty: 1,
				headlineType: 0,
				headlineTitle: '',
				headlineAuthor: '',
				headlineCoverId: '',
				branchIds: [],
				validityDateStart: '',
				validityDateEnd: '',
				headlineVideoId: '',
				headlineVoiceId: '',
				attachments: [],
				isSettop: 0,
				isPush: 0,
				headlineSort: 1,
			},
			headlineRule: {
				headlineTitle: { required: true, message: '头条标题不能为空', trigger: 'blur' },
				headlineType: { required: true, validator: validateHeadlineType, trigger: 'blur' },
				headlineAuthor: { required: true, message: '头条作者不能为空', trigger: 'blur' },
			},
			headlineCover: {
				uploaded: false,
				url: '',
				name: '',
				type: '',
			},
			headlineVideo: {
				file: null,
				percent: 0,
			},
			headlineVoice: {
				file: null,
				percent: 0,
			},
			attachments: [],
			saveLoading: false,
		};
	},
	created() {
		this.getHeadlineTypes();
	},
	mounted() {
		this.articleEditor = new E(this.$refs.articleEditor);
		//这是控件自带的图片上传api
		this.articleEditor.customConfig.customUploadImg = (files, insert) => {
			//获取编辑器里的图片
			let allPromise = files.map(file => uploadFilePro(getFormData(file)));
			Promise.all(allPromise)
				.then(res => {
					res.forEach(item => insert(item.data.downLoadUrl));
				})
				.catch(err => this.$message.error(err));
		};
		this.articleEditor.create();
		this.getHeadlineDetail();
	},
	methods: {
		goBack() {
			window.history.go(-1);
		},
		getHeadlineDetail() {
			if (this.type == 'edit') {
				this.saveLoading = true;
				getHeadlineDetail(this.headlineForm.headlineId).then(res => {
					this.saveLoading = false;
					if (res.data) {
						console.log('1');
						console.log(res.data);
						let {
							headlineId,
							headlineType,
							headlineProperty,
							headlineTitle,
							headlineAuthor,
							headlineCoverId,
							headlineCoverUrl,
							branchIds,
							validityDateStart,
							validityDateEnd,
							headlineVideoId,
							headlineVideoName,
							headlineVoiceId,
							headlineVoiceName,
							attachments,
							headlineContent,
							isSettop,
							isPush,
							headlineSort,
						} = res.data;
						this.headlineForm = {
							headlineId,
							headlineType,
							headlineProperty,
							headlineTitle,
							headlineAuthor,
							headlineCoverId,
							branchIds: branchIds || [],
							headlineVideoId,
							headlineVoiceId,
							validityDateStart,
							validityDateEnd,
							isSettop,
							isPush,
							headlineSort,
							attachments: attachments.map(item => ({ resourceId: item.resourceId })),
						};
						if (headlineCoverId) {
							this.headlineCover = {
								uploaded: true,
								url: headlineCoverUrl,
							};
						}
						if (headlineVideoId) {
							this.headlineVideo = {
								file: { name: headlineVideoName },
								percent: 100,
							};
						}
						if (headlineVoiceId) {
							this.headlineVoice = {
								file: { name: headlineVoiceName },
								percent: 100,
							};
						}
						this.attachments = attachments.map(item => {
							return {
								id: item.resourceId,
								timestamp: new Date().getTime(),
								file: { name: item.attachmentName },
								percent: 100,
							};
						});
						!!headlineContent && this.articleEditor.txt.html(headlineContent);
					}
				});
			}
		},
		getHeadlineTypes() {
			getHeadlineTypeList().then(res => {
				if (!res.error) {
					this.headlineTypes = res.data;
				}
			});
		},
		pickDate(value) {
			this.headlineForm.validityDateStart = value[0];
			this.headlineForm.validityDateEnd = value[1];
		},
		handleCoverChange(e) {
			let file = e.target.files[0];
			if (!file) {
				return false;
			}
			let types = e.target.accept.split(','),
				type = file.type;
			if (types.indexOf(type) === -1) {
				return this.$message.error('仅支持图片格式，请检查上传文件类型');
			}
			getBase64Url(file, res => {
				this.headlineCover.url = res;
				this.headlineCover.uploaded = false;
				this.headlineCover.name = file.name;
				this.headlineCover.type = type;
				e.target.value = '';
			});
		},
		deleteCover() {
			this.headlineCover = {
				uploaded: false,
				url: '',
				name: '',
				type: '',
			};
		},
		uploadCover() {
			if (!this.headlineCover.url || this.headlineCover.uploaded) {
				return Promise.resolve();
			}
			let cover = getBlob(this.headlineCover.url, this.headlineCover.type);
			cover.name = this.headlineCover.name;
			return uploadFilePro(getFormData(cover)).then(res => {
				if (res.data) {
					this.headlineForm.headlineCoverId = res.data.id;
					this.headlineCover.uploaded = true;
				} else {
					return Promise.reject();
				}
			});
		},
		chooseFile(ref) {
			this.$refs[ref].click();
		},
		handleFileChange(e, type) {
			let file = e.target.files[0];
			if (!file) {
				return false;
			}
			let types = e.target.accept.split(','),
				maxSize = e.target.dataset.maxSize * 1024 * 1024;
			if (types.indexOf(file.type) === -1) {
				return this.$message.error(`仅支持${type == 'headlineVideo' ? '视频' : '音频'}格式，请检查上传文件类型`);
			}
			if (file.size > maxSize) {
				return this.$message.error(`${type == 'headlineVideo' ? '视频' : '音频'}文件不能超过${e.target.dataset.maxSize}M`);
			}
			this[type].file = file;
			this[type].percent = 0;
			e.target.value = null;
		},
		deleteFile(type) {
			this[type].file = null;
			this[type].percent = 0;
			this.headlineForm[type + 'Id'] = '';
		},
		uploadFile(type) {
			if (!this[type].file || this[type].percent == 100) {
				return Promise.resolve();
			}
			return uploadFilePro(getFormData(this[type].file), ({ loaded, total }) => {
				this[type].percent = Math.floor((loaded / total) * 100);
			}).then(res => {
				if (res.data) {
					this.headlineForm[type + 'Id'] = res.data.id;
					this[type].percent = 100;
				} else {
					this[type].percent = 0;
					return Promise.reject();
				}
			});
		},
		handleAttachmentChange(e) {
			let files = e.target.files;
			if (!files.length) {
				return false;
			}
			let types = e.target.accept.split(',');
			for (let i = 0, len = files.length; i < len; i++) {
				let file = files[i];
				if (types.indexOf(file.type) == -1) {
					this.$message.error('仅支持文档和图片类格式附件，请检查上传文件类型');
					continue;
				}
				this.attachments.push({
					timestamp: new Date().getTime(),
					file,
					percent: 0,
				});
			}
			e.target.value = null;
		},
		deleteAttachment(index) {
			let id = this.attachments[index].id;
			if (id) {
				this.headlineForm.attachments = this.headlineForm.attachments.filter(item => item.resourceId != id);
			}
			this.attachments.splice(index, 1);
		},
		uploadAttachments() {
			let promises = [];
			for (let i = 0, len = this.attachments.length; i < len; i++) {
				let attachment = this.attachments[i];
				if (attachment.percent < 100) {
					promises.push(
						uploadFilePro(getFormData(attachment.file), ({ loaded, total }) => {
							this.attachments[i].percent = Math.floor((loaded / total) * 100);
						}).then(res => {
							if (res.data) {
								this.attachments[i].id = res.data.id;
								this.attachments[i].percent = 100;
								this.headlineForm.attachments.push({ resourceId: res.data.id });
							} else {
								this.attachments[i].percent = 0;
								return Promise.reject();
							}
						})
					);
				}
			}
			return promises;
		},
		getBranchIds() {
			this.headlineForm.branchIds = this.$refs.branchTree.getCheckedData().map(item => item.id);
		},
		_saveHeadline() {
			if (this.headlineForm.headlineProperty == 2) {
				this.headlineForm.headlineContent = this.articleEditor.txt.html();
			}
			console.log('2');
			console.log(this.headlineForm);
			let savePromise = this.headlineForm.headlineId ? updateHeadline(this.headlineForm) : createHeadline(this.headlineForm);
			savePromise
				.then(res => {
					this.saveLoading = false;
					if (!res.error) {
						this.$Modal.success({
							title: '提示',
							content: '操作成功！',
							onOk: () => this.goBack(),
						});
					} else {
						return Promise.reject('保存头条失败，请重新保存');
					}
				})
				.catch(e => {
					this.saveLoading = false;
					this.$message.error(e);
				});
		},
		saveHeadline() {
			if (this.saveLoading) {
				return false;
			}
			this.$refs.headlineForm.validate(valid => {
				//审查规则通过
				if (valid) {
					//进一步审查
					if (!this.headlineCover.url) {
						return this.$message.warning('请选择头条封面');
					}
					if (this.headlineForm.headlineProperty == 1) {
						if (!this.headlineVideo.file) {
							return this.$message.warning('请选择头条视频');
						}
					}
					this.saveLoading = true;
					let uploadPromise =
						this.headlineForm.headlineProperty == 1
							? [this.uploadCover(), this.uploadFile('headlineVideo')]
							: [this.uploadCover(), this.uploadFile('headlineVideo'), this.uploadFile('headlineVoice'), ...this.uploadAttachments()];
					Promise.all(uploadPromise)
						.then(this._saveHeadline.bind(this))
						.catch(() => {
							this.$message.error('上传文件失败，正在保存基本信息');
							this._saveHeadline();
						});
				}
			});
		},
	},
	components: { organizeCheckboxTree },
};
</script>

<style lang="less" scoped type="text/less">
.base-form-container {
	border-right: 1px solid #e9eaec;
}
.margin-right {
	margin-right: 8px;
}
.file-name {
	overflow: hidden;
	max-width: 20em;
	white-space: normal;
	text-overflow: ellipsis;
}
.transparent-spin {
	background-color: rgba(255, 255, 255, 0);
}
</style>
