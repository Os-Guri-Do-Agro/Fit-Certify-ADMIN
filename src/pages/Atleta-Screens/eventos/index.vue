<template>
    <div class="page-container">
        <v-sheet class="header-section">
            <div class="header-content">
                <div class="header-icon-wrapper">
                    <v-icon size="40" color="white">mdi-calendar-star</v-icon>
                </div>
                <h1 class="header-title">Eventos</h1>
            </div>

            <v-row class="w-100 px-5 mt-6">
                <v-col class="ma-0 pa-0 px-3" cols="12" md="4">
                    <v-text-field
                        v-model="search"
                        prepend-inner-icon="mdi-magnify"
                        variant="solo"
                        label="Título"
                        class="search-field"
                        rounded="lg"
                    />
                </v-col>
                <v-col class="ma-0 pa-0 px-3" cols="12" md="4">
                    <v-text-field
                        v-model="searchForLocalidade"
                        prepend-inner-icon="mdi-magnify"
                        variant="solo"
                        label="Localidade"
                        class="search-field"
                        rounded="lg"
                    />
                </v-col>
                <v-col class="ma-0 pa-0 px-3" cols="12" md="4">
                    <v-select
                        v-model="selectedMes"
                        :items="meses"
                        item-title="nome"
                        item-value="valor"
                        variant="solo"
                        label="Mês"
                        clearable
                        class="search-field"
                        rounded="lg"
                    />
                </v-col>
            </v-row>
        </v-sheet>

        <div class="content-section">
            <v-row v-if="loading">
                <v-col cols="12" md="4" v-for="n in pageSize" :key="n">
                    <v-skeleton-loader type="card" class="skeleton-card"></v-skeleton-loader>
                </v-col>
            </v-row>

            <div v-else-if="eventos.length === 0" class="empty-state">
                <div class="empty-icon-wrapper">
                    <v-icon size="80" color="#90CAF9">mdi-calendar-remove</v-icon>
                </div>
                <h3 class="empty-title">Nenhum evento encontrado</h3>
                <p class="empty-text">Não há eventos disponíveis no momento</p>
            </div>

            <v-row v-else>
                <v-col cols="12" md="4" v-for="evento in eventos" :key="evento.id">
                    <v-card elevation="8" rounded="xl" class="event-card">
                        <v-card-text class="pa-6">
                            <div class="d-flex align-center mb-4">
                                <v-icon size="32" class="mr-3 gradient-icon">
                                    mdi-calendar-star
                                </v-icon>
                                <h3 class="text-h5 font-weight-bold event-title gradient-text">
                                    {{ evento.titulo }}
                                </h3>
                            </div>

                            <div class="event-details">
                                <div class="d-flex align-center mb-3">
                                    <v-icon size="20" color="grey-darken-1" class="mr-2">
                                        mdi-map-marker
                                    </v-icon>
                                    <span class="text-body-1 event-text">{{ evento.local }}</span>
                                </div>

                                <div class="d-flex align-center mb-3">
                                    <v-icon size="20" color="grey-darken-1" class="mr-2">
                                        mdi-calendar
                                    </v-icon>
                                    <span class="text-body-1">{{ new Date(evento.data).toLocaleDateString('pt-BR') }}</span>
                                </div>

                                <div class="d-flex align-center mb-4">
                                    <v-icon size="20" color="grey-darken-1" class="mr-2">
                                        mdi-run
                                    </v-icon>
                                    <span class="text-body-1 event-text">{{ evento.distanciaEventos?.map(d => d.distancia + 'km').join(' / ') || 'N/A' }}</span>
                                </div>
                            </div>

                            <v-btn @click="verDetalhes(evento.id)" variant="flat" rounded="lg" block class="mt-4 gradient-btn">
                                <v-icon class="mr-2">mdi-eye</v-icon>
                                Ver Detalhes
                            </v-btn>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>

            <v-row v-if="totalPages > 1" class="justify-center mt-8 mb-4">
                <v-pagination
                    v-model="page"
                    :length="totalPages"
                    @update:model-value="bunscarEventoPagined"
                    color="#42A5F5"
                    :total-visible="5"
                    rounded="circle"
                    class="custom-pagination"
                ></v-pagination>
            </v-row>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch, computed } from 'vue'
    import { useRouter } from 'vue-router'
    import eventoService from '@/services/eventos/eventos-service';

    const router = useRouter()
    const eventos = ref([])
    const loading = ref(false)
    const search = ref('')
    const searchForLocalidade = ref('')
    const selectedMes = ref('')

    const meses = [
        { nome: 'Janeiro', valor: '01' },
        { nome: 'Fevereiro', valor: '02' },
        { nome: 'Março', valor: '03' },
        { nome: 'Abril', valor: '04' },
        { nome: 'Maio', valor: '05' },
        { nome: 'Junho', valor: '06' },
        { nome: 'Julho', valor: '07' },
        { nome: 'Agosto', valor: '08' },
        { nome: 'Setembro', valor: '09' },
        { nome: 'Outubro', valor: '10' },
        { nome: 'Novembro', valor: '11' },
        { nome: 'Dezembro', valor: '12' }
    ]
    const page = ref(1)
    const pageSize = ref(9)
    const totalPages = ref(0)


    const filtroPorTitulo = computed(() => {
        return eventos.value.filter((evento) => {
            return evento.titulo.toLowerCase().includes(search.value.toLowerCase())
        })
    })

    const eventosFiltrados = computed(() => {
        if (search.value.trim() === '') {
            return eventos.value
        } else {
            return filtroPorTitulo.value
        }
    })

    const bunscarEventoPagined = async() => {
        loading.value = true
        try {
            const response = await eventoService.findAllEventosPagined(page.value, pageSize.value, '', searchForLocalidade.value, selectedMes.value, search.value)
            eventos.value = response.data.itens
            totalPages.value = response.data.totalPages
        } catch (error) {
            console.error(error)
        } finally {
            loading.value = false
        }
    }

    watch([search, searchForLocalidade, selectedMes], () => {
        page.value = 1
        bunscarEventoPagined()
    })

    onMounted(() => {
        bunscarEventoPagined()
    })

    const verDetalhes = (eventoId) => {
        console.log('Navegando para evento:', eventoId)
        console.log('Rota:', `/Atleta-Screens/eventos/${eventoId}`)
        router.push(`/Atleta-Screens/eventos/${eventoId}`)
    }

</script>


<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.header-section {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  padding: 48px 24px;
  border-radius: 20px;
  box-shadow: 0 8px 24px rgba(66, 165, 245, 0.25);
}

.header-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin-bottom: 8px;
}

.header-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
}

.header-title {
  font-size: 2.5rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.search-field {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-field:hover {
  transform: translateY(-2px);
}

.content-section {
  padding: 0 16px;
}

.skeleton-card {
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 80px 24px;
}

.empty-icon-wrapper {
  width: 120px;
  height: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%);
  border-radius: 50%;
  margin-bottom: 24px;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: #546E7A;
  margin-bottom: 8px;
}

.empty-text {
  font-size: 1rem;
  color: #90A4AE;
}

.event-card {
  min-height: 275px;
}

.event-title {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.3;
}

.event-text {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  -webkit-box-orient: vertical;
}

.event-details {
  border-left: 3px solid;
  border-image: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) 1;
  padding-left: 16px;
  margin-left: 8px;
}

.gradient-icon {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-text {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.gradient-btn {
  background: linear-gradient(135deg, #42A5F5 0%, #1E88E5 100%) !important;
  color: white !important;
}

.custom-pagination :deep(.v-pagination__item) {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-pagination :deep(.v-pagination__item:hover) {
  transform: scale(1.1);
}

</style>
