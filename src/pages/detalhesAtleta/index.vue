<template>
  <v-container class="d-flex align-center justify-center" :class="containerClass">
    <v-row justify="center" class="w-100 ma-0">
      <v-col cols="12" sm="12" md="11" lg="10" xl="9" class="pa-2 pa-sm-4">
        <v-card
          class="pa-4 pa-sm-6"
          elevation="3"
          rounded="xl"
          :style="{
            background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
          }"
        >
          <!-- Loading State -->
          <div v-if="loading" class="text-center py-6 py-sm-8">
            <v-progress-circular
              indeterminate
              color="light-blue-accent-3"
              :size="display.mobile ? 48 : 64"
            />
            <p class="text-body-2 text-sm-body-1 mt-4 text-grey px-2">
              {{ t('detalhesAtleta.loading') }}
            </p>
          </div>

          <!-- Error State -->
          <div v-else-if="error" class="text-center py-6 py-sm-8">
            <v-icon :size="display.mobile ? 60 : 80" color="error">mdi-alert-circle</v-icon>
            <h2 class="text-h6 text-sm-h5 font-weight-bold mt-3 mt-sm-4 mb-2 px-2" style="color: #f44336">
              {{ t('detalhesAtleta.errorLoading') }}
            </h2>
            <p class="text-body-2 text-sm-body-1 text-grey mb-4 px-2">
              {{ error }}
            </p>
            <v-btn
              color="light-blue-accent-3"
              variant="flat"
              rounded="lg"
              size="small"
              class="mt-2"
              @click="$router.push('/')"
            >
              {{ t('detalhesAtleta.backToHome') }}
            </v-btn>
          </div>

          <!-- Success State -->
          <div v-else-if="atletaData">
            <!-- Header -->
            <div class="text-center mb-4 mb-sm-6">
              <v-avatar
                v-if="atletaData?.avatarUrl"
                :size="display.mobile ? 80 : 120"
                class="mb-3 mb-sm-4"
              >
                <v-img :src="atletaData.avatarUrl" alt="Avatar" />
              </v-avatar>
              <v-icon
                v-else
                :size="display.mobile ? 80 : 120"
                color="light-blue-accent-3"
                class="mb-3 mb-sm-4"
              >
                mdi-account-circle
              </v-icon>
              <h2
                class="text-h6 text-sm-h5 text-md-h4 font-weight-bold mb-2 px-2"
                style="color: #42A5F5"
              >
                {{ atletaData?.usuario?.nome || t('detalhesAtleta.athlete') }}
              </h2>
              <p class="text-body-2 text-sm-body-1 text-grey px-2">
                {{ t('detalhesAtleta.completeInfo') }}
              </p>
            </div>

            <!-- Informações Pessoais -->
            <v-card
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-account</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.personalInfo') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="4">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.name') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData?.usuario?.nome || '--' }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.usuario?.email">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.email') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium" style="word-break: break-all; white-space: normal;">
                        {{ atletaData.usuario.email }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.usuario?.cpf">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.cpf') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ formatarCPF(atletaData.usuario.cpf) }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.telefone">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.phone') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.telefone }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.dataNascimento">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.birthDate') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ formatarData(atletaData.dataNascimento) }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.dataNascimento">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.age') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ calcularIdade(atletaData.dataNascimento) }} {{ t('detalhesAtleta.years') }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.genero">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.gender') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.genero }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Informações Físicas -->
            <v-card
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-human</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.physicalInfo') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.altura">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.height') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.altura }} m
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.peso">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.weight') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.peso }} kg
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.tipoSanguineo">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.bloodType') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.tipoSanguineo }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.altura && atletaData?.peso">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.bmi') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ calcularIMC(atletaData.altura, atletaData.peso) }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Status e Preferências -->
            <v-card
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-check-circle</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.statusPreferences') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="4">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.status') }}</div>
                      <v-chip
                        :color="atletaData?.ativo ? 'success' : 'error'"
                        size="small"
                        variant="flat"
                      >
                        {{ atletaData?.ativo ? t('detalhesAtleta.active') : t('detalhesAtleta.inactive') }}
                      </v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.recentCheckup') }}</div>
                      <v-chip
                        :color="atletaData?.fezCheckupUltimosMeses ? 'success' : 'default'"
                        size="small"
                        variant="flat"
                      >
                        {{ atletaData?.fezCheckupUltimosMeses ? t('detalhesAtleta.yes') : t('detalhesAtleta.no') }}
                      </v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.hasSmartwatch') }}</div>
                      <v-chip
                        :color="atletaData?.possuiSmartwatch ? 'success' : 'default'"
                        size="small"
                        variant="flat"
                      >
                        {{ atletaData?.possuiSmartwatch ? t('detalhesAtleta.yes') : t('detalhesAtleta.no') }}
                      </v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.practicesPhysicalActivity') }}</div>
                      <v-chip
                        :color="atletaData?.praticaAtividadeFisicaRegularmente ? 'success' : 'default'"
                        size="small"
                        variant="flat"
                      >
                        {{ atletaData?.praticaAtividadeFisicaRegularmente ? t('detalhesAtleta.yes') : t('detalhesAtleta.no') }}
                      </v-chip>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Histórico Esportivo -->
            <v-card
              v-if="atletaData?.historicoEsportivo"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-run</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.sportsHistory') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData.historicoEsportivo.objetivo">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.goal') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.historicoEsportivo.objetivo }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.participatedInRaces') }}</div>
                      <v-chip
                        :color="atletaData.historicoEsportivo.participouProvasAntes ? 'success' : 'default'"
                        size="small"
                        variant="flat"
                      >
                        {{ atletaData.historicoEsportivo.participouProvasAntes ? t('detalhesAtleta.yes') : t('detalhesAtleta.no') }}
                      </v-chip>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData.historicoEsportivo.ultimaProva">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.lastRace') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.historicoEsportivo.ultimaProva }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Histórico de Saúde -->
            <v-card
              v-if="atletaData?.historicoSaude"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-heart-pulse</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.healthHistory') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" v-if="atletaData.historicoSaude.tomaMedicamentoContinuo && String(atletaData.historicoSaude.tomaMedicamentoContinuo).trim() !== ''">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.continuousMedications') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.historicoSaude.tomaMedicamentoContinuo }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" v-if="atletaData.historicoSaude.outrasCondicoesMedicas && String(atletaData.historicoSaude.outrasCondicoesMedicas).trim() !== ''">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.otherMedicalConditions') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ atletaData.historicoSaude.outrasCondicoesMedicas }}
                      </div>
                    </div>
                  </v-col>
                </v-row>

                <!-- Doenças -->
                <div v-if="atletaData.historicoSaude.historicoSaudeDoencas && atletaData.historicoSaude.historicoSaudeDoencas.length > 0" class="mt-4">
                  <div class="text-caption text-grey-darken-1 mb-2 font-weight-medium">{{ t('detalhesAtleta.diseases') }}</div>
                  <v-chip
                    v-for="(doenca, index) in atletaData.historicoSaude.historicoSaudeDoencas"
                    :key="index"
                    class="ma-1"
                    color="light-blue-accent-3"
                    variant="flat"
                    size="small"
                  >
                    {{ doenca.doenca?.descricao || '--' }}
                  </v-chip>
                </div>

                <!-- Sintomas -->
                <div v-if="atletaData.historicoSaude.historicoSaudeSintoma && atletaData.historicoSaude.historicoSaudeSintoma.length > 0" class="mt-4">
                  <div class="text-caption text-grey-darken-1 mb-2 font-weight-medium">{{ t('detalhesAtleta.symptoms') }}</div>
                  <v-chip
                    v-for="(sintoma, index) in atletaData.historicoSaude.historicoSaudeSintoma"
                    :key="index"
                    class="ma-1"
                    color="light-blue-accent-3"
                    variant="flat"
                    size="small"
                  >
                    {{ sintoma.sintoma?.descricao || '--' }}
                  </v-chip>
                </div>

                <!-- Mensagem quando não há informações -->
                <div v-if="
                  (!atletaData.historicoSaude.tomaMedicamentoContinuo || String(atletaData.historicoSaude.tomaMedicamentoContinuo || '').trim() === '') &&
                  (!atletaData.historicoSaude.outrasCondicoesMedicas || String(atletaData.historicoSaude.outrasCondicoesMedicas || '').trim() === '') &&
                  (!atletaData.historicoSaude.historicoSaudeDoencas || atletaData.historicoSaude.historicoSaudeDoencas.length === 0) &&
                  (!atletaData.historicoSaude.historicoSaudeSintoma || atletaData.historicoSaude.historicoSaudeSintoma.length === 0)
                " class="text-center py-4">
                  <p class="text-body-2 text-grey">{{ t('detalhesAtleta.noHealthInfo') }}</p>
                </div>
              </v-card-text>
            </v-card>

            <!-- Consultas -->
            <v-card
              v-if="atletaData?.consultas && atletaData.consultas.length > 0"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-calendar-clock</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.appointments') }} ({{ atletaData.consultas.length }})
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-expansion-panels variant="accordion" class="mb-2">
                  <v-expansion-panel
                    v-for="(consulta, index) in atletaData.consultas"
                    :key="index"
                    class="mb-2"
                  >
                    <v-expansion-panel-title>
                      <div class="d-flex align-center justify-space-between w-100">
                        <div>
                          <div class="text-body-2 font-weight-medium">
                            {{ formatarDataHora(consulta.dataConsulta) }}
                          </div>
                          <v-chip
                            :color="getSituacaoColor(consulta.situacao)"
                            size="small"
                            variant="flat"
                            class="mt-1"
                          >
                            {{ consulta.situacao }}
                          </v-chip>
                        </div>
                      </div>
                    </v-expansion-panel-title>
                    <v-expansion-panel-text>
                      <v-row dense class="mt-2">
                        <v-col cols="12" v-if="consulta.diagnostico">
                          <div class="info-field">
                            <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.diagnosis') }}</div>
                            <div class="text-body-2 text-sm-body-1 font-weight-medium">
                              {{ consulta.diagnostico }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" v-if="consulta.medicamentosReceitados">
                          <div class="info-field">
                            <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.prescribedMedications') }}</div>
                            <div class="text-body-2 text-sm-body-1 font-weight-medium">
                              {{ consulta.medicamentosReceitados }}
                            </div>
                          </div>
                        </v-col>
                        <v-col cols="12" sm="6" v-if="consulta.createdBy">
                          <div class="info-field">
                            <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.createdBy') }}</div>
                            <div class="text-body-2 text-sm-body-1 font-weight-medium">
                              {{ consulta.createdBy }}
                            </div>
                          </div>
                        </v-col>
                      </v-row>
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-card-text>
            </v-card>

            <!-- Alergias -->
            <v-card
              v-if="atletaData?.alergiasAtleta && atletaData.alergiasAtleta.length > 0"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-alert</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.allergies') }} ({{ atletaData.alergiasAtleta.length }})
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense class="alergias-row">
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="(alergia, index) in atletaData.alergiasAtleta"
                    :key="index"
                  >
                    <v-card class="mb-3 alergia-card" rounded="lg">
                      <v-card-text class="pa-3 pa-sm-4">
                        <div class="text-body-2 font-weight-bold mb-2">{{ alergia.titulo }}</div>
                        <div class="text-caption text-grey-darken-1 mb-3" v-if="alergia.descricao" style="min-height: 32px;">
                          {{ alergia.descricao }}
                        </div>
                        <!-- Imagem -->
                        <div v-if="alergia.arquivoUrl && isImagem(alergia.arquivoUrl, alergia.contentTypeArquivo)" class="file-container">
                          <v-img
                            :src="alergia.arquivoUrl"
                            :alt="alergia.titulo"
                            cover
                            class="rounded file-image"
                          />
                        </div>
                        <!-- PDF ou outro arquivo -->
                        <div v-else-if="alergia.arquivoUrl && isPDF(alergia.arquivoUrl, alergia.contentTypeArquivo)" class="file-container file-pdf-container">
                          <div class="file-content">
                            <v-icon :size="display.mobile ? 48 : 64" color="error" class="file-icon">mdi-file-pdf-box</v-icon>
                            <div class="text-caption text-center text-grey-darken-1 file-name">
                              {{ alergia.nomeArquivo || t('detalhesAtleta.pdfDocument') }}
                            </div>
                            <v-btn
                              color="light-blue-accent-3"
                              variant="flat"
                              :size="display.mobile ? 'x-small' : 'small'"
                              :href="alergia.arquivoUrl"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="file-btn"
                            >
                              <v-icon :size="display.mobile ? 16 : 20" class="mr-1">mdi-open-in-new</v-icon>
                              {{ t('detalhesAtleta.openPdf') }}
                            </v-btn>
                          </div>
                        </div>
                        <!-- Outro tipo de arquivo -->
                        <div v-else-if="alergia.arquivoUrl" class="file-container file-other-container">
                          <div class="file-content">
                            <v-icon :size="display.mobile ? 48 : 64" color="grey" class="file-icon">mdi-file</v-icon>
                            <div class="text-caption text-center text-grey-darken-1 file-name">
                              {{ alergia.nomeArquivo || t('detalhesAtleta.file') }}
                            </div>
                            <v-btn
                              color="light-blue-accent-3"
                              variant="flat"
                              :size="display.mobile ? 'x-small' : 'small'"
                              :href="alergia.arquivoUrl"
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              class="file-btn"
                            >
                              <v-icon :size="display.mobile ? 16 : 20" class="mr-1">mdi-download</v-icon>
                              {{ t('detalhesAtleta.downloadFile') }}
                            </v-btn>
                          </div>
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Exames -->
            <v-card
              v-if="atletaData?.exameAtleta && atletaData.exameAtleta.length > 0"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-file-document</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.exams') }} ({{ atletaData.exameAtleta.length }})
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense class="exames-row">
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                    v-for="(exame, index) in atletaData.exameAtleta"
                    :key="index"
                  >
                    <v-card class="mb-3 exame-card" rounded="lg">
                      <v-card-text class="pa-3 pa-sm-4">
                        <!-- Imagem -->
                        <div v-if="exame.imagemUrl && isImagem(exame.imagemUrl, exame.contentType)" class="file-container mb-2">
                          <v-img
                            :src="exame.imagemUrl"
                            :alt="exame.nomeImagem"
                            cover
                            class="rounded file-image"
                          />
                        </div>
                        <!-- PDF ou outro arquivo -->
                        <div v-else-if="exame.imagemUrl && isPDF(exame.imagemUrl, exame.contentType)" class="file-container mb-2 file-pdf-container">
                          <div class="file-content">
                            <v-icon :size="display.mobile ? 48 : 64" color="error" class="file-icon">mdi-file-pdf-box</v-icon>
                            <div class="text-caption text-center text-grey-darken-1 file-name">
                              {{ exame.nomeImagem || t('detalhesAtleta.pdfDocument') }}
                            </div>
                            <v-btn
                              color="light-blue-accent-3"
                              variant="flat"
                              :size="display.mobile ? 'x-small' : 'small'"
                              :href="exame.imagemUrl"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="file-btn"
                            >
                              <v-icon :size="display.mobile ? 16 : 20" class="mr-1">mdi-open-in-new</v-icon>
                              {{ t('detalhesAtleta.openPdf') }}
                            </v-btn>
                          </div>
                        </div>
                        <!-- Outro tipo de arquivo -->
                        <div v-else-if="exame.imagemUrl" class="file-container mb-2 file-other-container">
                          <div class="file-content">
                            <v-icon :size="display.mobile ? 48 : 64" color="grey" class="file-icon">mdi-file</v-icon>
                            <div class="text-caption text-center text-grey-darken-1 file-name">
                              {{ exame.nomeImagem || t('detalhesAtleta.file') }}
                            </div>
                            <v-btn
                              color="light-blue-accent-3"
                              variant="flat"
                              :size="display.mobile ? 'x-small' : 'small'"
                              :href="exame.imagemUrl"
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                              class="file-btn"
                            >
                              <v-icon :size="display.mobile ? 16 : 20" class="mr-1">mdi-download</v-icon>
                              {{ t('detalhesAtleta.downloadFile') }}
                            </v-btn>
                          </div>
                        </div>
                        <!-- Mostra nome do arquivo apenas para imagens -->
                        <div class="text-caption text-grey-darken-1 mt-2" v-if="exame.nomeImagem && exame.imagemUrl && isImagem(exame.imagemUrl, exame.contentType)" style="word-break: break-word;">
                          {{ exame.nomeImagem }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Análises -->
            <v-card
              v-if="atletaData?.analisesAtleta && atletaData.analisesAtleta.length > 0"
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="border-left: 4px solid #42A5F5; border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-chart-line</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.analyses') }} ({{ atletaData.analisesAtleta.length }})
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col
                    cols="12"
                    v-for="(analise, index) in atletaData.analisesAtleta"
                    :key="index"
                  >
                    <v-card variant="outlined" class="mb-3">
                      <v-card-text>
                        <div class="text-body-2 font-weight-medium">{{ analise.titulo || `${t('detalhesAtleta.analysis')} ${index + 1}` }}</div>
                        <div class="text-caption text-grey-darken-1 mt-2" v-if="analise.createdAt">
                          {{ formatarDataHora(analise.createdAt) }}
                        </div>
                      </v-card-text>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Informações do Sistema -->
            <v-card
              variant="outlined"
              class="mb-4"
              rounded="lg"
              style="background-color: rgba(0, 198, 254, 0.05); border-color: rgba(0, 198, 254, 0.2) !important;"
            >
              <v-card-title class="pa-3 pa-sm-4 pb-2">
                <div class="d-flex align-center">
                  <v-icon :size="display.mobile ? 20 : 24" color="light-blue-accent-3" class="mr-2">mdi-information</v-icon>
                  <span class="text-subtitle-2 text-sm-subtitle-1 font-weight-bold" style="color: #42A5F5">
                    {{ t('detalhesAtleta.systemInfo') }}
                  </span>
                </div>
              </v-card-title>
              <v-card-text class="pa-3 pa-sm-4 pt-2">
                <v-row dense>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.createdAt">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.createdAt') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ formatarDataHora(atletaData.createdAt) }}
                      </div>
                    </div>
                  </v-col>
                  <v-col cols="12" sm="6" md="4" v-if="atletaData?.updatedAt">
                    <div class="info-field">
                      <div class="text-caption text-grey-darken-1 mb-1">{{ t('detalhesAtleta.lastUpdate') }}</div>
                      <div class="text-body-2 text-sm-body-1 font-weight-medium">
                        {{ formatarDataHora(atletaData.updatedAt) }}
                      </div>
                    </div>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>

            <!-- Botão Voltar -->
            <div class="text-center">
              <v-btn
                color="light-blue-accent-3"
                variant="flat"
                rounded="lg"
                size="small"
                class="mt-2"
                block
                @click="$router.push('/')"
              >
                {{ t('detalhesAtleta.backToHome') }}
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>

      <v-dialog v-model="dialogSemToken" width="500" persistent>
        <v-card rounded="lg">
          <v-card-text class="text-center pa-8">
            <v-avatar color="error" size="80" class="mb-4">
              <v-icon size="50" color="white">mdi-lock-outline</v-icon>
            </v-avatar>
            <div class="text-h5 font-weight-bold mb-3">{{ t('detalhesAtleta.accessDenied') }}</div>
            <div class="text-body-1 text-grey-darken-1 mb-6">
              {{ t('detalhesAtleta.loginRequired') }}
            </div>
            <v-btn
              color="light-blue-accent-3"
              variant="flat"
              size="large"
              rounded="lg"
              block
              @click="router.push('/login')"
            >
              <v-icon start>mdi-login</v-icon>
              {{ t('detalhesAtleta.login') }}
            </v-btn>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useDisplay } from 'vuetify'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/pt-br'
import atletaService from '@/services/atleta/atleta-service'
import { getToken } from '@/utils/auth'

const { t } = useI18n()

dayjs.extend(utc)
dayjs.extend(timezone)

const route = useRoute()
const router = useRouter()
const display = useDisplay()
const loading = ref(true)
const atletaData = ref(null)
const error = ref(null)
const dialogSemToken = ref(false)

function irParaLogin() {
  router.push('/login')
}

const containerClass = computed(() => {
  return display.mobile ? 'px-2 py-4' : 'px-4 py-8'
})

const getUserTimezone = () => {
  try {
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
    return timeZone
  } catch (e) {
    try {
      return dayjs.tz.guess()
    } catch (e2) {
      return 'America/Sao_Paulo'
    }
  }
}

// Verifica se a string de data tem timezone explícito
const temTimezone = (dataString) => {
  if (typeof dataString !== 'string') return false
  return dataString.includes('Z') ||
         dataString.match(/[+-]\d{2}:\d{2}$/) !== null ||
         dataString.match(/[+-]\d{4}$/) !== null
}

const formatarData = (data) => {
  if (!data) return '--'
  try {
    const userTimezone = getUserTimezone()
    const dataString = data.toString()
    let dataParsed

    // Se a data tem timezone explícito, dayjs já detecta automaticamente
    if (temTimezone(dataString)) {
      dataParsed = dayjs(data)
    } else {
      // Se não tem timezone, assume UTC (padrão de APIs REST)
      dataParsed = dayjs.utc(data)
    }

    // Se não é válida, tenta parse normal como fallback
    if (!dataParsed.isValid()) {
      dataParsed = dayjs(data)
    }

    // Converte para o timezone do dispositivo do usuário e formata
    if (dataParsed.isValid()) {
      return dataParsed.tz(userTimezone).format('DD/MM/YYYY')
    }

    return '--'
  } catch (e) {
    console.error('Erro ao formatar data:', e)
    // Fallback: formata sem conversão de timezone
    return dayjs(data).isValid() ? dayjs(data).format('DD/MM/YYYY') : '--'
  }
}

const formatarDataHora = (data) => {
  if (!data) return '--'
  try {
    const userTimezone = getUserTimezone()
    const dataString = data.toString()
    let dataParsed

    // Se a data tem timezone explícito, dayjs já detecta automaticamente
    if (temTimezone(dataString)) {
      dataParsed = dayjs(data)
    } else {
      // Se não tem timezone, assume UTC (padrão de APIs REST)
      dataParsed = dayjs.utc(data)
    }

    // Se não é válida, tenta parse normal como fallback
    if (!dataParsed.isValid()) {
      dataParsed = dayjs(data)
    }

    // Converte para o timezone do dispositivo do usuário e formata
    if (dataParsed.isValid()) {
      return dataParsed.tz(userTimezone).format('DD/MM/YYYY HH:mm')
    }

    return '--'
  } catch (e) {
    console.error('Erro ao formatar data/hora:', e)
    // Fallback: formata sem conversão de timezone
    return dayjs(data).isValid() ? dayjs(data).format('DD/MM/YYYY HH:mm') : '--'
  }
}

const formatarCPF = (cpf) => {
  if (!cpf) return '--'
  const cpfLimpo = cpf.replace(/\D/g, '')
  return cpfLimpo.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4')
}

const calcularIdade = (dataNascimento) => {
  if (!dataNascimento) return '--'
  try {
    const timezone = getUserTimezone()
    const hoje = dayjs().tz(timezone)
    // Para calcular idade, usamos apenas a data (sem hora), então não precisa converter timezone
    const nascimento = dayjs(dataNascimento)

    if (!nascimento.isValid()) return '--'

    let idade = hoje.diff(nascimento, 'year')
    const mes = hoje.diff(nascimento, 'month') % 12
    if (mes < 0 || (mes === 0 && hoje.date() < nascimento.date())) {
      idade--
    }
    return idade
  } catch (e) {
    console.error('Erro ao calcular idade:', e)
    // Fallback: cálculo simples sem timezone
    const hoje = dayjs()
    const nascimento = dayjs(dataNascimento)
    let idade = hoje.diff(nascimento, 'year')
    const mes = hoje.diff(nascimento, 'month') % 12
    if (mes < 0 || (mes === 0 && hoje.date() < nascimento.date())) {
      idade--
    }
    return idade
  }
}

const calcularIMC = (altura, peso) => {
  if (!altura || !peso) return '--'
  const imc = peso / (altura * altura)
  return imc.toFixed(2)
}

const getSituacaoColor = (situacao) => {
  const situacoes = {
    'Concluido': 'success',
    'Cancelada': 'error',
    'Recusado': 'warning',
    'Pendente': 'info',
  }
  return situacoes[situacao] || 'default'
}

// Verifica se o arquivo é uma imagem
const isImagem = (url, contentType) => {
  if (!url) return false

  if (contentType) {
    const contentTypeLower = contentType.toLowerCase()
    if (contentTypeLower.startsWith('image/')) {
      return true
    }
    if (contentTypeLower.includes('pdf') || contentTypeLower === 'application/pdf') {
      return false
    }
  }

  const urlLower = url.toLowerCase()
  const extensoesImagem = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg', '.jfif']

  if (urlLower.includes('.pdf')) {
    return false
  }

  return extensoesImagem.some(ext => urlLower.includes(ext))
}

const isPDF = (url, contentType) => {
  if (!url) return false

  if (contentType) {
    const contentTypeLower = contentType.toLowerCase().trim()
    if (contentTypeLower === 'application/pdf' || contentTypeLower.includes('application/pdf')) {
      return true
    }
  }

  const urlLower = url.toLowerCase()

  if (urlLower.endsWith('.pdf')) {
    return true
  }

  if (urlLower.includes('.pdf')) {
    const match = urlLower.match(/\.pdf(\?|$|#)/)
    if (match) {
      return true
    }
    const parts = urlLower.split('.')
    const lastPart = parts[parts.length - 1]
    if (lastPart && lastPart.startsWith('pdf')) {
      return true
    }
  }

  return false
}

const buscarAtletaInfos = async () => {
  try {
    loading.value = true
    error.value = null

    const atletaId = route.query.id || route.params.id

    if (!atletaId || (Array.isArray(atletaId) && atletaId.length === 0)) {
      error.value = 'ID do atleta não fornecido'
      loading.value = false
      return
    }

    const id = Array.isArray(atletaId) ? atletaId[0] : atletaId

    const response = await atletaService.getAllInfos(id)

    if (response && response.success && response.data) {
      atletaData.value = response.data
    }
  } catch (err) {
    console.error('Erro ao buscar informações do atleta:', err)
    error.value = err.response?.data?.message || 'Não foi possível carregar as informações do atleta'
    atletaData.value = null
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const token = getToken()
  if (!token) {
    dialogSemToken.value = true
    return
  }
  buscarAtletaInfos()
})
</script>

<style scoped>
.gap-4 {
  gap: 16px;
}

.w-100 {
  width: 100%;
}

.info-field {
  padding: 8px 0;
}

.v-row.alergias-row,
.v-row.exames-row {
  align-items: stretch;
}

.v-row.alergias-row .v-col,
.v-row.exames-row .v-col {
  display: flex;
}

.alergia-card,
.exame-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border-radius: 12px !important;
  border: none !important;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1) !important;
  transition: box-shadow 0.3s ease;
}

.alergia-card:hover,
.exame-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15) !important;
}

.alergia-card .v-card-text,
.exame-card .v-card-text {
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 12px;
  min-height: 0;
}

.file-container {
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  flex-shrink: 0;
}

.file-container .file-image {
  border-radius: 8px;
}

.alergia-card .file-container {
  min-height: 180px;
  max-height: 180px;
}

.exame-card .file-container {
  min-height: 200px;
  max-height: 200px;
}

.file-pdf-container {
  background-color: #f5f5f5;
}

.file-other-container {
  background-color: #f5f5f5;
}

.file-container .file-image {
  width: 100%;
  height: 100%;
}

.file-container .file-image :deep(img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-content {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
}

.file-content .file-icon {
  flex-shrink: 0;
  margin-bottom: 12px;
}

.file-content .file-btn {
  flex-shrink: 0;
  white-space: nowrap;
  min-width: auto;
  margin-top: 8px;
}

.file-name {
  word-break: break-word;
  padding: 0 8px;
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  text-align: center;
  width: 100%;
  box-sizing: border-box;
  flex-shrink: 1;
  min-height: 0;
}

@media (max-width: 599px) {
  .v-container {
    min-height: calc(100vh - 56px) !important;
  }

  .alergia-card .file-container,
  .exame-card .file-container {
    min-height: 160px;
    max-height: 160px;
  }

  .file-content {
    padding: 8px;
  }

  .file-content .file-icon {
    font-size: 48px !important;
    height: 48px !important;
    width: 48px !important;
    margin-bottom: 8px !important;
  }

  .file-name {
    font-size: 11px !important;
    line-height: 1.3;
    max-height: 36px;
    margin-bottom: 8px !important;
    padding: 0 4px;
  }

  .file-content .file-btn {
    font-size: 12px !important;
    padding: 6px 12px !important;
    height: auto !important;
    margin-top: 4px !important;
  }

  .file-content .file-btn .v-icon {
    font-size: 16px !important;
    height: 16px !important;
    width: 16px !important;
    margin-bottom: 0 !important;
    margin-right: 4px !important;
  }
}

@media (min-width: 600px) {
  .v-container {
    min-height: calc(100vh - 64px) !important;
  }
}

@media (min-width: 960px) {
  .alergia-card .file-container {
    min-height: 200px;
    max-height: 200px;
  }

  .exame-card .file-container {
    min-height: 220px;
    max-height: 220px;
  }
}
</style>

