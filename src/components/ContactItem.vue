<template>
    <div class="contact-item">
        <h2>Type: {{ contact.type }}</h2>
        <p>Value: {{ contact.value }}</p>
    </div>
</template>

<script lang="ts">
export default {
    name: 'ContactItem',
    props: {
        contact: {
            type: Object,
            required: true
        }
    }
}
</script>