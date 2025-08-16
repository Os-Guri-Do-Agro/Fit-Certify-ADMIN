<template>
        <VRow>
            <VCol class="mb-10 mt-10 mt-md-0" cols="12"><h2 class="text-start text-h5 font-weight-bold" style="color: #88CE0D;">1. Informações Pessoais</h2></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="8"><label for="nomeCompleto">Nome completo:</label><VTextField density="compact" name="nomeCompleto" id="nomeCompleto" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="cpf">CPF</label><VTextField density="compact" name="cpf" id="cpf" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="telefone">Telefone:</label><VTextField density="compact" name="telefone" id="telefone" type="tel" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="email">E-mail</label><VTextField density="compact" name="email" id="email" type="email" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12" md="4"><label for="nascimento">Data de nascimento:</label><VTextField density="compact" name="nascimento" id="nascimento" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="altura">Altura (cm):</label><VTextField density="compact" name="altura" id="altura" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="6" md="12"><label for="peso">Peso (kg):</label><VTextField density="compact" name="peso" id="peso" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="telefone">Telefone:</label><VTextField density="compact" name="telefone02" id="telefone02" type="tel" variant="outlined"/></VCol>
            <VCol class="my-0 py-0 font-weight-medium" cols="12"><label for="pratica">Pratica atividade física regularmente?</label><v-select density="compact"
      v-model="select.value.value"
      :error-messages="select.errorMessage.value"
      :items="items"
      id="pratica"
      placeholder="Sim"
      variant="outlined"
    ></v-select></VCol>
    <VCol class="w-100" cols="12">
    </VCol>
                                      
        </VRow>
</template>


<script setup>
  import { ref } from 'vue'
  import { useField, useForm } from 'vee-validate'

  const { handleSubmit } = useForm({
    validationSchema: {

      select (value) {
        if (value) return true

        return 'Select an item.'
      },
    },
  })

  const select = useField('select')
 

  const items = ref([
    'Sim',
    'Não'
  ])

  const submit = handleSubmit(values => {
    alert(JSON.stringify(values, null, 2))
  })
</script>


<style scoped>
    label, h2 {
        font-family:"DM Sans", sans-serif;
    }
</style>