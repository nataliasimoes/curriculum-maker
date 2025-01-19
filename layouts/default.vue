<template>
  <div>
    <header
      class="flex place-content-between backdrop-blur-sm fixed top-0 left-0 w-screen z-10 py-4 px-8 border-b"
    >
      <NuxtLink to="/">
        <TheLogo class="text-xl" />
      </NuxtLink>
    </header>
    <main>
      <slot></slot>
    </main>
    <AppFooter />
  </div>
</template>
