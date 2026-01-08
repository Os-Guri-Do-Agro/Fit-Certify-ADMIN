<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden">
    <!-- HEADER -->
    <VCol class="pa-0 ma-0" md="12" style="background-color: #00c6fe">
      <VRow class="pa-0 ma-0">
        <VCol class="pa-0 ma-0 d-flex justify-center" cols="12">
          <v-container class="mb-5 mb-md-10 pa-0 ma-0 px-6 px-5 px-md-10" max-width="150vh">
            <div class="d-flex align-center justify-center py-10">
              <v-img
                src="../assets/Login/logo-fit.png"
                max-width="200"
                alt="Logo"
                style="cursor: pointer"
                @click="$router.push('/')"
              ></v-img>
            </div>
            <div class="d-flex justify-center px-md-10 py-5 py-md-10">
              <h1 class="text-h5 text-md-h3 font-weight-bold text-center text-white mb-8">
                {{ $t('detalhesExclusaoConta.pageTitle') }}
              </h1>
            </div>
          </v-container>
        </VCol>
      </VRow>
    </VCol>

    <!-- CONTEÚDO -->
    <VCol class="d-flex pa-0 ma-0 justify-center" md="12">
      <v-container class="d-flex align-center justify-center mb-5 mb-md-10 pa-0 ma-0" max-width="150vh">
        <div class="d-flex">
          <div class="bg-grey-lighten-5 w-100">

            <!-- SEÇÃO 1 - INTRODUÇÃO -->
            <div class="d-flex mt-10 mx-md-10">
              <v-container class="px-6 px-5 px-md-10">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section1.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section1.p1', { company: $t('detalhesExclusaoConta.section1.company'), law: $t('detalhesExclusaoConta.section1.law') }) }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section1.p2') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 2 - COMO SOLICITAR -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section2.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section2.intro') }}
                </p>

                <ol class="pl-6 my-4 text-body-1">
                  <li class="mb-2">
                    {{ $t('detalhesExclusaoConta.section2.step1', { settings: $t('detalhesExclusaoConta.section2.settings') }) }}
                  </li>
                  <li class="mb-2">
                    {{ $t('detalhesExclusaoConta.section2.step2', { path: $t('detalhesExclusaoConta.section2.path') }) }}
                  </li>
                  <li class="mb-2">
                    {{ $t('detalhesExclusaoConta.section2.step3', { button: $t('detalhesExclusaoConta.section2.button') }) }}
                  </li>
                  <li class="mb-2">
                    {{ $t('detalhesExclusaoConta.section2.step4') }}
                  </li>
                </ol>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section2.alternative', { email: $t('detalhesExclusaoConta.section2.email') }) }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 3 - PROCESSO -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section3.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section3.intro') }}
                </p>

                <div class="my-6">
                  <h3 class="text-h6 font-weight-bold mb-3" style="color: #00c6fe">
                    {{ $t('detalhesExclusaoConta.section3.stage1Title') }}
                  </h3>
                  <p class="text-body-1 ml-4">
                    {{ $t('detalhesExclusaoConta.section3.stage1Desc') }}
                  </p>
                </div>

                <div class="my-6">
                  <h3 class="text-h6 font-weight-bold mb-3" style="color: #00c6fe">
                    {{ $t('detalhesExclusaoConta.section3.stage2Title') }}
                  </h3>
                  <p class="text-body-1 ml-4">
                    {{ $t('detalhesExclusaoConta.section3.stage2Desc') }}
                  </p>
                </div>

                <div class="my-6">
                  <h3 class="text-h6 font-weight-bold mb-3" style="color: #00c6fe">
                    {{ $t('detalhesExclusaoConta.section3.stage3Title') }}
                  </h3>
                  <p class="text-body-1 ml-4">
                    {{ $t('detalhesExclusaoConta.section3.stage3Desc') }}
                  </p>
                </div>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 4 - DADOS EXCLUÍDOS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section4.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section4.intro') }}
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>{{ $t('detalhesExclusaoConta.section4.item1') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section4.item2') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section4.item3') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section4.item4') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section4.item5') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section4.item6') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section4.item7') }}</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 5 - DADOS MANTIDOS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section5.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section5.intro') }}
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>{{ $t('detalhesExclusaoConta.section5.item1') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section5.item2') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section5.item3') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section5.item4') }}</li>
                </ul>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section5.footer') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 6 - BACKUP DOS DADOS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section6.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section6.intro') }}
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>{{ $t('detalhesExclusaoConta.section6.item1') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section6.item2') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section6.item3') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section6.item4', { email: $t('detalhesExclusaoConta.section6.email') }) }}</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 7 - CANCELAMENTO -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section7.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section7.intro') }}
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>{{ $t('detalhesExclusaoConta.section7.item1') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section7.item2', { email: $t('detalhesExclusaoConta.section7.email') }) }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section7.item3') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section7.item4') }}</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 8 - CONSEQUÊNCIAS -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section8.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  <strong>{{ $t('detalhesExclusaoConta.section8.warning') }}</strong> {{ $t('detalhesExclusaoConta.section8.intro') }}
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>{{ $t('detalhesExclusaoConta.section8.item1') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section8.item2') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section8.item3') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section8.item4') }}</li>
                  <li>{{ $t('detalhesExclusaoConta.section8.item5') }}</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 9 - CONTATO -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('detalhesExclusaoConta.section9.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section9.intro') }}
                </p>

                <div class="my-4 pa-4 bg-blue-lighten-5 rounded">
                  <p class="text-body-1 mb-2">
                    📧 <strong>{{ $t('detalhesExclusaoConta.section9.email') }}</strong> {{ $t('detalhesExclusaoConta.section9.emailAddress') }}
                  </p>
                  <p class="text-body-1 mb-2">
                    🕒 <strong>{{ $t('detalhesExclusaoConta.section9.hours') }}</strong> {{ $t('detalhesExclusaoConta.section9.hoursValue') }}
                  </p>
                  <p class="text-body-1">
                    ⏱️ <strong>{{ $t('detalhesExclusaoConta.section9.responseTime') }}</strong> {{ $t('detalhesExclusaoConta.section9.responseTimeValue') }}
                  </p>
                </div>

                <p class="my-4 text-body-1">
                  {{ $t('detalhesExclusaoConta.section9.footer') }}
                </p>
              </v-container>
            </div>

          </div>
        </div>
      </v-container>
    </VCol>
  </VRow>
</template>

<script setup>
// Página institucional - sem lógica complexa necessária
</script>
