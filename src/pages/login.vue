<template>
  <v-container fluid class="pa-0 fill-height d-flex flex-column flex-md-row overflow-x-hidden">

    <!-- Coluna da esquerda -->
    <v-col
      cols="12"
      md="5"
      class="d-flex flex-column justify-center align-center "
      style="background-color: #22d3ee; padding: 2rem; height: 100%;"
    >
      <div style="max-width: 20rem; width: 100%;">

        <!-- Logo -->
        <div class="mb-8">
          <RouterLink to="/" class="d-flex align-center">
            <v-img
              src="../assets/Login/logo-fit.png"
              width="163"
              alt="Logo"
              cover
            ></v-img>
          </RouterLink>
        </div>

        <!-- Texto de boas-vindas -->
        <p style="color: white; margin-bottom: 1.5rem;">
          Bem-vindo! Faça seu login para acessar sua conta.
        </p>

        <!-- Formulário -->
        <v-form @submit.prevent="handleSubmit">
          <v-text-field
            v-model="email"
            type="email"
            placeholder="Email"
            hide-details
            variant="solo"
            bg-color="white"
            density="comfortable"
            class="mb-4"
            :rules="[value => !!value || 'Campo obrigatório']"
            style="border-radius: 5px; width: 100%; max-width: 362px; color: #1f2937;"
          ></v-text-field>

          <v-text-field
            v-model="password"
            type="password"
            placeholder="Senha"
            hide-details
            variant="solo"
            bg-color="white"
            density="comfortable"
            class="mb-6 w-100"
            :rules="[value => !!value || 'Campo obrigatório']"
            style="border-radius: 5px; color: #1f2937;"
          ></v-text-field>

          <RouterLink
            to="/"
            class="text-decoration-none"
          >
            <v-btn
              type="submit"
              color="lime-darken-2"
              class="text-white font-weight-bold mt-10"
              style="width: 100%; max-width: 108px; height: 47px; border-radius: 0.375rem;"
              @click="handleSubmit"
            >
              Entrar
            </v-btn>
          </RouterLink>
        </v-form>
      </div>
    </v-col>

    <!-- Coluna da direita -->
    <v-col cols="12" md="7" class="pa-0 hidden-sm-and-down" style="height: 100vh;">
      <v-img
        :width="1500"
        src="../assets/Login/login-banner.jpg"
        cover
        height="100%"
        width="100%"
      </v-img>
    </v-col>
  </v-container>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { RouterLink } from 'vue-router';

const email = ref('');
const password = ref('');

function handleSubmit() {
  console.log('Email:', email.value);
  console.log('Senha:', password.value);
}
</script>