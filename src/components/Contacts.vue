<template>
  <div class="contacts">
    <h1>Contacts</h1>
    <p>Здесь будет информация для связи.</p>
    <div>
      <ContactBlock v-for="contact in contactItems" :key="contact.type" :contact="contact" />
    </div>
    <p>Вы также можете связаться с нами через любые социальные сети, указанные выше.</p>
    <p>Эти данные носят тестовый характер и предназначены только для демонстрации наполнения страницы.</p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContactsStore } from '../stores/contacts'
import ContactBlock from './ContactItem.vue'

const store = useContactsStore()
const { contacts: contactItems } = storeToRefs(store)
</script>
