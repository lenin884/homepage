import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useContactsStore = defineStore('contacts', () => {
    const contacts = ref([
        {
            type: 'email',
            value: 'test@gmail.com',
        },
        {
            type: 'phone',
            value: '+1234567890',
        },
        {
            type: 'tg',
            value: '@test',
        }
    ])

    return { contacts }
})