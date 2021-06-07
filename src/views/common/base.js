export default {
  inject: ['refresh'],
  data () {
    return {
      dataList: [],
      pageIndex: 1,
      pageSize: 10,
      totalPage: 0,
      dataListLoading: false,
      dataListSelections: []
    }
  },
  methods: {
    // 每页数
    sizeChangeHandle (val) {
      this.pageSize = val
      this.pageIndex = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.pageIndex = val
      this.getDataList()
    },
    // 多选
    selectionChangeHandle (val) {
      this.dataListSelections = val
    },
    // 新增 / 修改
    addOrUpdateHandle (name, id) {
      router.push({name: name, params:{id: id}})
    },
    // 获取数据列表
    getDataList (is_search) {
      is_search = is_search || false

      if(is_search)
      {
        this.pageIndex = 1;
      }

      this.dataListLoading = true
      this.$http({
        url: this.$http.adornUrl('/'+this.model+'/list'),
        method: 'get',
        params: this.$http.adornParams({
          'is_search': is_search,
          'page': this.pageIndex,
          'limit': this.pageSize,
          'name': this.dataForm.name,
          'head': this.dataForm.head,
          'title': this.dataForm.title,
          'username': this.dataForm.username,
          'nickname': this.dataForm.nickname,
          'realname': this.dataForm.realname,
          'id_card_no': this.dataForm.id_card_no,
          'content': this.dataForm.content,
          'category': this.dataForm.category,
          'pid': this.dataForm.pid,
          'role_id': this.dataForm.role_id,

          'parent_id': this.dataForm.parent_id,
          'category_id': this.dataForm.category_id,

          'courseware_id': this.dataForm.courseware_id,
          'level_id': this.dataForm.level_id,
          'unit_id': this.dataForm.unit_id,

          'add_time': this.dataForm.add_time,
          'valid_time': this.dataForm.valid_time,
          'create_time': this.dataForm.create_time,
          'team_id': this.dataForm.team_id,
          'paper_id': this.dataForm.paper_id,
          'course_id': this.dataForm.course_id,
          'position_id': this.dataForm.position_id,
          'organization_id': this.dataForm.organization_id,
          'audit_status': this.dataForm.audit_status,
          'certification_status': this.dataForm.certification_status,
          'is_recommend': this.dataForm.is_recommend,
          'is_hidden': this.dataForm.is_hidden,
          'relevance_role_id': this.dataForm.relevance_role_id,
          'course_title': this.dataForm.course_title,
          'organization_title': this.dataForm.organization_title,
          'archive_weixin': this.dataForm.archive_weixin,
          'teacher_name': this.dataForm.teacher_name,

          'order_no': this.dataForm.order_no,
          'pay_status': this.dataForm.pay_status,
          'order_status': this.dataForm.order_status,
          'courseware_title': this.dataForm.courseware_title,
          'member_username': this.dataForm.member_username,
          'member_nickname': this.dataForm.member_nickname,
          'archive_age': this.dataForm.archive_age,
          'course_title': this.dataForm.course_title,
          'goods_title': this.dataForm.goods_title,
          'course_start_time': this.dataForm.course_start_time,
          'account_payment_account': this.dataForm.account_payment_account,
        })
      }).then(({data}) => {
        if (data && data.status === 200)
        {
          this.dataList = data.data.data
          this.totalPage = data.data.total
        }
        else
        {
          this.dataList = []
          this.totalPage = 0
          this.$message.error(data.message)
        }
        this.dataListLoading = false
      })
    },
    // 删除
    deleteHandle (id) {
      var ids = id ? [id] : this.dataListSelections.map(item => {
        return item.id
      })

      let message = this.$t('common.to_determine_the')
                    + this.$t('common.current_check')
                    + this.$t('common.for')
                    + `${id ? this.$t('common.delete') : this.$t('common.batch_delete')}`
                    + this.$t('common.handle')
                    + `?`

      if(this.message != undefined && this.message.error != undefined)
      {
        message = this.message.error
      }

      this.$confirm(message, this.$t('common.prompt'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        this.$http({
          url: this.$http.adornUrl('/'+this.model+'/delete'),
          method: 'post',
          data: {id: this.$http.adornData(ids, false)}
        }).then(({data}) => {
          if (data && data.status === 200) {
            this.$message({
              message: this.$t('common.handle_success'),
              type: 'success',
              duration: 1500,
              onClose: () => {
                this.getDataList()
              }
            })
          } else {
            this.$message.error(this.$t(data.message))
          }
        })
      }).catch(() => {})
    },
    // 上传头像
    handleAvatarSuccess(res, file) {
      this.dataForm.avatar = res.data;
    },
    beforeAvatarUpload(file) {
      const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt8M = file.size / 1024 / 1024 < 8;

      if (!isPicture) {
        var message = this.$t('common.rules.picture.picture_type');
        this.$message.error(this.$t(data.message))
      }
      if (!isLt8M) {
        var message = this.$t('common.rules.picture.picture_size');
        this.$message.error(this.$t(data.message))
      }

      return isPicture && isLt8M;
    },
    // 上传图片
    handlePictureSuccess(res, file) {
      this.dataForm.picture = res.data;
    },
    // 上传封面
    handleCoverSuccess(res, file) {
      this.dataForm.cover = res.data;
    },
    beforePictureUpload(file) {
      const isPicture = (file.type === 'image/jpeg' || file.type === 'image/png');
      const isLt8M = file.size / 1024 / 1024 < 8;

      if (!isPicture) {
        var message = this.$t('common.rules.picture.picture_type');
        this.$message.error(this.$t(data.message))
      }
      if (!isLt8M) {
        var message = this.$t('common.rules.picture.picture_size');
        this.$message.error(this.$t(data.message))
      }

      return isPicture && isLt8M;
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
  },
  filters: {
    formatMoney: function(value) {
      value = Number(value);
      return value.toFixed(2);
    }
  }
}
