<template>
    <div class="contacts">
        <h1>Contacts</h1>
        <p>Здесь будет информация для связи.</p>
        <div>
            <ContactBlock v-for="contact in contactItems" :key="contact.type" :contact="contact" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useContactsStore } from '../stores/contacts'
import ContactBlock from './ContactItem.vue'

const store = useContactsStore()
const { contacts: contactItems } = storeToRefs(store)

</script>