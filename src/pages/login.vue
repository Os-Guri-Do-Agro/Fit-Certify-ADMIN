<template>
  <v-container   style="background-color: #22d3ee;" fluid class=" pa-0 fill-height d-flex flex-column flex-md-row overflow-x-hidden">
<v-row no-gutters class="h-100">

    <!-- Coluna da esquerda -->
    <v-col
      md="4"
      class="d-flex flex-column justify-center px-10  px-lg-16 h-100 "
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
        <p class="text-white text-center text-subtitle-1 text-md-h6 text-lg-h5 px-lg-10" style="margin-bottom: 1.5rem;">
                Bem-vindo! Faça seu login para acessar sua conta.
              </p>
        <v-form class=" d-flex align-center flex-column px-lg-0 px-xl-12" @submit.prevent="handleSubmit">
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

          <RouterLink class="text-white w-100 d-flex justify-end" to="/register">
            <span>Esqueceu a senha?</span>
          </RouterLink>


          <VRow class="d-flex align-center w-100 mt-5">
            <VCol class="d-flex justify-space-around flex-column ga-3 flex-lg-row align-center" cols="12">
              <RouterLink to="/">
                <VBtn class="text-white" height="47px" style="background-color: #88CE0D;">Entrar</VBtn>
              </RouterLink>
              <span class="text-white font-weight-bold">Ou</span>
              <RouterLink to="/register">
                <VBtn class="text-white" height="47px" style="background-color: #88CE0D;">Cadastrar</VBtn>
              </RouterLink>
            </VCol>         
          </VRow>

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
