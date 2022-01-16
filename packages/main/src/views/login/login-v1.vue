<template>
  <div>
    <div class="login-form" @keypress.enter="onSubmit">
      <h1 v-if="LOGIN_TITLE && LOGIN_TITLE !== ''" class="login-title">
        {{ LOGIN_TITLE }}
      </h1>
      <a-form ref="formRef" :model="formData" :rules="rules">
        <a-form-item name="username">
          <a-input
            v-model:value="formData.username"
            placeholder="请输入用户名"
            class="login-input-wrapper"
          >
            <template #prefix>
              <user-outlined></user-outlined>
            </template>
          </a-input>
        </a-form-item>
        <a-form-item name="password">
          <a-input-password
            v-model:value="formData.password"
            placeholder="请输入密码"
            class="login-input-wrapper"
          >
            <template #prefix>
              <lock-outlined></lock-outlined>
            </template>
          </a-input-password>
        </a-form-item>
        <a-form-item>
          <a-checkbox v-model:checked="formData.rememberMe">
            记住密码
          </a-checkbox>
        </a-form-item>
      </a-form>
      <a-button
        type="primary"
        block
        @click="onSubmit"
        :loading="btnloading"
        class="login-btn-submit"
      >
        登录
      </a-button>
      <div class="login-error-msg" v-if="!!errorMessage">
        <p>{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { LOGIN_TITLE } from '@/config/globalConfig';
import { LockOutlined, UserOutlined } from '@ant-design/icons-vue';
import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
import { userLogin } from './api/loginApi';

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
  },
  setup() {
    const formRef = ref();

    const state = reactive({
      formData: {
        type: 'account',
      },
      errorMessage: '',
      btnloading: false,
    });

    const rules = {
      username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        {
          min: 1,
          max: 20,
          message: '长度在1到20之间',
          trigger: ['blur', 'change'],
        },
      ],
      password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        {
          min: 1,
          max: 100,
          message: '长度在1到100之间',
          trigger: ['blur', 'change'],
        },
      ],
    };

    const onSubmit = async () => {
      // 调用接口登录
      await userLogin();
    };

    onMounted(() => {
      // 1.填充密码
    });

    return {
      ...toRefs(state),
      formRef,
      rules,
      LOGIN_TITLE,
      onSubmit,
    };
  },
});
</script>
<style lang="less" scoped>
@import '../../globalVar.less';

.login-title {
  color: @primary-color;
  font-weight: 600;
  text-align: center;
  margin-bottom: @margin-lg;
}
.login-form {
  width: 25vw;
  max-width: 360px;
  min-width: 290px;
  margin: 0 5vw 0 0;
  padding: 25px 30px;
  background-color: #fff;
  border-radius: 2px;
}
.login-btn-submit {
  margin-bottom: @margin-lg;
}
.login-error-msg {
  text-align: center;
  color: @error-color;
  p {
    margin: 0;
  }
}
.login-input-wrapper.@{ant-prefix}-input-affix-wrapper {
  margin: 0;
  padding: 0;
  position: relative;
  > :deep(.@{ant-prefix}-input-prefix) {
    position: absolute;
    top: 7px;
    left: 8px;
    z-index: 3;
  }
  > :deep(input) {
    padding: 5px 9px 3px 26px;
  }
  > :deep(.@{ant-prefix}-input-suffix) {
    position: absolute;
    z-index: 3;
    top: 7px;
    right: 8px;
  }
}
</style>
