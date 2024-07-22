<script setup>
import { ref } from 'vue';

const token_exist = ref('');
const token = localStorage.getItem('token')?.replace(/\s+/g, ''); // Eliminar espacios en blanco y saltos de línea
if (token) {
    token_exist.value = token;
} else {
    console.log('No token found');
}

const copyToClipboard = () => {
    if (codeBlock.value) {
        const range = document.createRange();
        range.selectNodeContents(codeBlock.value);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);

        try {
            document.execCommand('copy');
            alert('Token copied to clipboard');
        } catch (err) {
            console.error('Failed to copy token:', err);
        }
        selection.removeAllRanges();
    }
};

const codeBlock = ref(null);
</script>

<template>
    <div class="grid">
        <div class="" style="padding: 1rem">
            <div class="card mb-1" style="width: 60rem">
                <span class="hljs language-vue block text-500 font-medium mb-2">Token</span>
                <div class="copyable-code-container dark bg-gray-950 rounded-md border-[0.5px] border-token-border-medium w-full">
                    <div class="flex items-center">
                        <span data-state="closed">
                            <button class="flex gap-1 items-center" @click="copyToClipboard">
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24" class="icon-sm">
                                    <path
                                        fill="currentColor"
                                        fill-rule="evenodd"
                                        d="M7 5a3 3 0 0 1 3-3h9a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-2v2a3 3 0 0 1-3 3H5a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h2zm2 2h5a3 3 0 0 1 3 3v5h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-9a1 1 0 0 0-1 1zM5 9a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-9a1 1 0 0 0-1-1z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                                Copiar Token
                            </button>
                        </span>
                    </div>
                    <div class="overflow-y-auto p-1 max-h-10 w-full">
                        <pre class="code-block w-full" ref="codeBlock">
                                    <code class="hljs language-vue text-grey-500 font-medium w-full whitespace-nowrap overflow-hidden text-overflow-ellipsis">{{ token_exist }}</code>
                            </pre>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.code-block {
    padding: 1px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 5px;
    display: block;
    white-space: pre-wrap;
    word-wrap: break-word;
}

.code-block code {
    padding: 1px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
}

button {
    margin-left: 10px;
    padding: 5px 10px;
    border: none;
    background-color: #4caf50;
    color: white;
    border-radius: 5px;
    cursor: pointer;
}

button:hover {
    background-color: #45a049;
}

.max-h-40 {
    max-height: 8rem; /* Ajusta esta altura según sea necesario */
    overflow-y: auto;
}
</style>
