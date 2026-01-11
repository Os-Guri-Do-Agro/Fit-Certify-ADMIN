<template>
  <VRow class="h-100 d-flex flex-column flex-md-row ma-0 pa-0 overflow-hidden">
    <!-- DIV DA ESQUERDA -->
    <VCol class="pa-0 ma-0" md="12" style="background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%)">
      <VRow class="pa-0 ma-0">
        <VCol class="pa-0 ma-0 d-flex justify-center" cols="12">
          <v-container class=" mb-5 mb-md-10 pa-0 ma-0 px-6 px-5 px-md-10"
        max-width="150vh">
          <div class="d-flex align-center justify-center py-10">
            <v-img
              src="../assets/Login/logo-fit.png"
              max-width="200"
              alt="Logo"
              style="cursor: pointer"
              @click="$router.push('/register')"
            ></v-img>
          </div>
          <!-- TÍTULO -->
          <div
            class="d-flex justify-center px-md-10 py-5 py-md-10"
          >
            <h1 class="text-h5 text-md-h3 font-weight-bold text-center text-white mb-8">
              {{ $t('politicaPrivacidade.title') }}
            </h1>
          </div>
          </v-container>
        </VCol>
      </VRow>
    </VCol>

    <VCol class="d-flex pa-0 ma-0 justify-center" md="12">
      <v-container
        class="d-flex align-center justify-center mb-5 mb-md-10 pa-0 ma-0"
        max-width="150vh"
      >
        <div class="d-flex">
          <div class="bg-grey-lighten-5 w-100">
            <!-- SEÇÃO 1 -->
            <div class="d-flex mt-10 mx-md-10">
              <v-container class="px-6 px-5 px-md-10">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section1.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section1.welcome') }} <strong>{{ $t('politicaPrivacidade.section1.company') }}</strong> {{ $t('politicaPrivacidade.section1.companyRef') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section1.termsIntro') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section1.privacyPolicy') }} <strong>{{ $t('politicaPrivacidade.section1.privacyPolicyBold') }}</strong> {{ $t('politicaPrivacidade.section1.privacyPolicyText') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section1.agreement') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section1.disagree') }}
                  <strong>{{ $t('politicaPrivacidade.section1.email') }}</strong> {{ $t('politicaPrivacidade.section1.disagreeEnd') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section1.applies') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section1.integration') }}
                  <strong>{{ $t('politicaPrivacidade.section1.appleHealth') }}</strong> {{ $t('politicaPrivacidade.section1.and') }}
                  <strong>{{ $t('politicaPrivacidade.section1.googleHealth') }}</strong>{{ $t('politicaPrivacidade.section1.integrationText') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 2 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section2.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section2.text') }} <strong>{{ $t('politicaPrivacidade.section2.email') }}</strong>.
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 3 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">{{ $t('politicaPrivacidade.section3.title') }}</h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section3.intro') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section3.declaration') }}
                </p>

                <ol class="pl-6 my-4 text-body-1">
                  <li>
                    {{ $t('politicaPrivacidade.section3.item1') }}
                  </li>
                  <li>
                    {{ $t('politicaPrivacidade.section3.item2') }}
                  </li>
                </ol>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section3.rights') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section3.ownership') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 4 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section4.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section4.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 5 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section5.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section5.intro') }}
                </p>

                <ul class="pl-6 my-4 text-body-1">
                  <li>{{ $t('politicaPrivacidade.section5.item1') }}</li>
                  <li>{{ $t('politicaPrivacidade.section5.item2') }}</li>
                  <li>{{ $t('politicaPrivacidade.section5.item3') }}</li>
                  <li>{{ $t('politicaPrivacidade.section5.item4') }}</li>
                  <li>{{ $t('politicaPrivacidade.section5.item5') }}</li>
                  <li>{{ $t('politicaPrivacidade.section5.item6') }}</li>
                </ul>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 6 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section6.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section6.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 7 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section7.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section7.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 8 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">{{ $t('politicaPrivacidade.section8.title') }}</h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section8.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 9 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section9.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section9.intro') }} <strong>{{ $t('politicaPrivacidade.section9.lgpd') }}</strong>{{ $t('politicaPrivacidade.section9.text') }}
                </p>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section9.process') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 10 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section10.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section10.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 11 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section11.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section11.text') }} <strong>{{ $t('politicaPrivacidade.section11.email') }}</strong>.
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 12 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section12.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section12.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 13 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section13.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section13.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 14 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section14.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section14.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 15 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section15.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section15.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 16 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">
                  {{ $t('politicaPrivacidade.section16.title') }}
                </h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section16.text') }}
                </p>

                <v-divider class="my-6"></v-divider>
              </v-container>
            </div>

            <!-- SEÇÃO 17 -->
            <div class="d-flex justify-center my-10 mx-md-10">
              <v-container class="px-6">
                <h2 class="text-h6 text-md-h5 font-weight-bold">{{ $t('politicaPrivacidade.section17.title') }}</h2>

                <p class="my-4 text-body-1">
                  {{ $t('politicaPrivacidade.section17.text') }} <strong>{{ $t('politicaPrivacidade.section17.email') }}</strong>
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
import logoFit from '../assets/Login/logo-fit.png'
</script>
