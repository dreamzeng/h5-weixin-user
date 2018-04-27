<template>
    <div class="error-wrapper">
        <i class="icon-404"></i>

        <h1>404</h1>

        <h2>页面没找到</h2>

        <p class="page-404">
            <router-link :to="{name: 'login'}">返回</router-link>
        </p>
    </div>
</template>
