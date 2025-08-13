<template>
  <v-container   style="background-color: #22d3ee;" fluid class=" pa-0 fill-height d-flex flex-column flex-md-row overflow-x-hidden">
<v-row no-gutters class="h-100">

    <!-- Coluna da esquerda -->
    <v-col
      md="4"
      class="d-flex flex-column justify-center  px-16 h-100 "
    >

        <!-- Logo -->
        <div class="mb-8">
          <RouterLink to="/" class="d-flex align-center justify-center">
            <v-img
              src="../assets/Login/logo-fit.png"
              max-width="180"
              alt="Logo"
              cover
            ></v-img>
          </RouterLink>
        </div>

        <!-- Texto de boas-vindas -->


        <!-- Formulário -->
        <p class="text-white text-center text-subtitle-1" style="margin-bottom: 1.5rem;">
                Bem-vindo! Faça seu login para acessar sua conta.
              </p>
        <v-form class=" d-flex align-center flex-column px-12 " @submit.prevent="handleSubmit">
          <v-text-field
            v-model="email"
            type="email"
            placeholder="Email"
            hide-details
            variant="solo"
            bg-color="white"
            density="comfortable"
            class="mb-4 w-100"
            :rules="[value => !!value || 'Campo obrigatório']"
            style="border-radius: 5px;  color: #1f2937;"
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
              class="text-white font-weight-bold mt-10"
              style=" height: 47px; border-radius: 0.375rem; background-color: #88CE0D;"
              @click="handleSubmit"
            >
              Entrar
            </v-btn>
          </RouterLink>
          <p>Não tem uma conta?</p>
           <RouterLink
            to="/"
            class="text-decoration-none"
          >
            <v-btn
              type="submit"
              class="text-white font-weight-bold mt-10"
              style=" height: 47px; border-radius: 0.375rem; background-color: #88CE0D;"
              @click="handleSubmit"
            >
              Cadastrar
            </v-btn>
          </RouterLink>
        </v-form>

    </v-col>

    <!-- Coluna da direita -->
    <v-col  md="8" class="pa-0 hidden-sm-and-down">
      <v-img
        src="../assets/Login/login-banner.jpg"
        cover
        height="100vh"
        width="100%"
      </v-img>
    </v-col>
</v-row>

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
