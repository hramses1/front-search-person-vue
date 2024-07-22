<script setup>
import { useLayout } from '@/layout/composables/layout';
import { ref, computed } from 'vue';
import AppConfig from '@/layout/AppConfig.vue';
import { useRouter } from 'vue-router';
import { loginUser } from '../../../service/apiService';

const { layoutConfig } = useLayout();
const email = ref('');
const password = ref('');
const checked = ref(false);
const passwordError = ref('');
const emailError = ref('');
const router = useRouter();

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const onclick = async () => {
    emailError.value = '';
    passwordError.value = '';

    let valid = true;

    if (!email.value) {
        emailError.value = 'Email is required';
        valid = false;
    } else if (!validateEmail(email.value)) {
        emailError.value = 'Email is not valid';
        valid = false;
    }

    if (!password.value) {
        passwordError.value = 'Password is required';
        valid = false;
    }

    if (valid) {
        const LoginUser = {
            identity: email.value,
            password: password.value
        };

        try {
            const data = await loginUser(LoginUser); // Llamar al servicio de API
            console.log('Registration successful:', data);
            const token = data.token;
            localStorage.setItem('token', token);
            router.push('/');
        } catch (error) {
            console.error('Registration failed:', error);
            router.push('/auth/access');
        }
    }
};

const logoUrl = computed(() => {
    return `/layout/images/${layoutConfig.darkTheme.value ? 'logo-white' : 'logo-dark'}.svg`;
});
</script>

<template>
    <div class="surface-ground flex align-items-center justify-content-center min-h-screen min-w-screen overflow-hidden">
        <div class="flex flex-column align-items-center justify-content-center">
            <img :src="logoUrl" alt="Sakai logo" class="mb-5 w-6rem flex-shrink-0" />
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full surface-card py-8 px-5 sm:px-8" style="border-radius: 53px">
                    <div class="text-center mb-5">
                        <img src="/demo/images/login/avatar.png" alt="Image" height="50" class="mb-3" />
                        <div class="text-900 text-3xl font-medium mb-3">Welcome!</div>
                        <span class="text-600 font-medium">Sign in to continue</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-900 text-xl font-medium mb-2">Email</label>
                        <InputText id="email1" type="text" placeholder="Email address" class="w-full md:w-30rem mb-1" style="padding: 1rem" v-model="email" />
                        <div class="mb-10">
                            <span class="block text-red-500">{{ emailError }}</span>
                        </div>

                        <label for="password1" class="block text-900 font-medium text-xl mb-2 mt-2">Password</label>
                        <Password id="password1" v-model="password" placeholder="Password" :toggleMask="true" class="w-full mb-1" inputClass="w-full" :inputStyle="{ padding: '1rem' }"></Password>
                        <div class="mb-10">
                            <span class="block text-red-500">{{ passwordError }}</span>
                        </div>
                        <div class="flex align-items-center justify-content-between mb-5 gap-5 mt-2">
                            <div class="flex align-items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Remember me</label>
                            </div>
                            <a class="font-medium no-underline ml-2 text-right cursor-pointer" style="color: var(--primary-color)">Forgot password?</a>
                        </div>
                        <Button label="Sign In" class="w-full p-3 text-xl" @click="onclick"></Button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <AppConfig simple />
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
