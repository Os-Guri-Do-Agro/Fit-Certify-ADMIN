<template>
    <div class="d-flex flex-column ga-10">
        <v-sheet class="d-flex flex-column ga-5 align-center justify-center py-8 gradient-bg">
            <div class="d-flex align-center">
                            <v-icon size="48" color="white" class="mr-4">
                mdi-calendar-star
            </v-icon>
            <h1 class="text-md-h2 font-weight-bold text-white">Eventos</h1>
            </div>

            <v-row class="w-100 px-5 mt-5">
                <v-col class="ma-0 pa-0 px-5" cols="12" md="4">
                        <v-text-field v-model="search" prepend-inner-icon="mdi-magnify" variant="solo" label="Título"/>
                </v-col>
                <v-col class="ma-0 pa-0 px-5" cols="12" md="4">
                        <v-text-field v-model="searchForLocalidade" prepend-inner-icon="mdi-magnify" variant="solo" label="Localidade"/>
                </v-col>
                <v-col class="ma-0 pa-0 px-5" cols="12" md="4">
                        <v-select v-model="selectedMes" :items="meses" item-title="nome" item-value="valor" variant="solo" label="Mês" clearable/>
                </v-col>
            </v-row>
        </v-sheet>

        <div class="">
            <v-row v-if="loading" class="">
                <v-col cols="12" md="4" v-for="n in pageSize" :key="n">
                    <v-skeleton-loader type="card" elevation="8" class="rounded-xl"></v-skeleton-loader>
                </v-col>
            </v-row>



            <v-row v-else class="">
                <v-col cols="12" md="4" v-for="evento in eventos" :key="evento">
                    <v-card elevation="8" rounded="xl"  class="event-card">
                        <v-card-text class="pa-6">
                            <div class="d-flex align-center mb-4">
                                <v-icon size="32" color="light-blue-accent-3" class="mr-3">
                                    mdi-calendar-star
                                </v-icon>
                                <h3 class="text-h5 font-weight-bold" style="color: #00c6fe">
                                    {{ evento.titulo }}
                                </h3>
                            </div>
                            
                            <div class="event-details">
                                <div class="d-flex align-center mb-3">
                                    <v-icon size="20" color="grey-darken-1" class="mr-2">
                                        mdi-map-marker
                                    </v-icon>
                                    <span class="text-body-1">{{ evento.local }}</span>
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
                                    <span class="text-body-1">{{ evento.distanciaEventos.map(d => d.distancia + 'km').join(' / ') }}</span>
                                </div>
                            </div>
                            
                            <v-btn :href="`https://fitcertify365.com/#/evento/${evento.id}`" color="light-blue-accent-3" variant="flat" rounded="lg" block class="mt-4">
                                <v-icon class="mr-2">mdi-eye</v-icon>
                                Ver Detalhes
                            </v-btn>
                        </v-card-text>
                    </v-card>  
                </v-col>
            </v-row>

            <v-row class="justify-center mt-6">
                <v-pagination 
                    v-model="page" 
                    :length="totalPages"
                    @update:model-value="bunscarEventoPagined"
                    color="light-blue-accent-3"
                    :total-visible="4"
                    rounded="pill"
                ></v-pagination>
            </v-row>
        </div>
    </div>
</template>

<script setup>
    import { onMounted, ref, watch, computed } from 'vue'
    import eventoService from '@/services/eventos/eventos-service';

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
            console.log(response.data)
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

</script>


<style scoped>
.event-details {
  border-left: 3px solid #00c6fe;
  padding-left: 16px;
  margin-left: 8px;
}

.gradient-bg {
  background: linear-gradient(135deg, #00c6fe 0%, #0288d1 100%);
}
</style>