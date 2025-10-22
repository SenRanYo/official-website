<template>
  <NuxtRouteAnnouncer />
  <NuxtLoadingIndicator color="var(--color-brand)" :height="2" />
  <UApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<style lang="scss" scoped>
:global(body) {
  background-color: $background-color;
  color: $text-color;
  font-family: $font-family-base;

  @include mobile {
    font-size: $font-size-sm;
  }
}
</style>
