<template>
  <div class="select-none explode text-green text-h6">
    <span>P</span>
    <span>a</span>
    <span>r</span>
    <span>a</span>
    <span>b</span>
    <span>é</span>
    <span>n</span>
    <span>s</span>
  </div>
</template>

<style scoped>
.explode > * {
  transition: all 400ms ease;
  display: inline-block;
}

.explode:hover > span:nth-child(1) {
  transform: translate(-2px, -2px) rotate(-11deg) scale(1);
}

.explode:hover > span:nth-child(2) {
  transform: translate(1px, 2px) rotate(-9deg) scale(1);
}

.explode:hover > span:nth-child(3) {
  transform: translate(-2px, -1px) rotate(-3deg) scale(1);
}

.explode:hover > span:nth-child(4) {
  transform: translate(2px, 3px) rotate(12deg) scale(1);
}

.explode:hover > span:nth-child(5) {
  transform: translate(-2px, -2px) rotate(7deg) scale(1);
}

.explode:hover > span:nth-child(6) {
  transform: translate(2px, -3px) rotate(-5deg) scale(1);
}

.explode:hover > span:nth-child(7) {
  transform: translate(2px, -3px) rotate(-12deg) scale(1);
}

.explode:hover > span:nth-child(8) {
  transform: translate(1px, -1px) rotate(0deg) scale(1);
}

.explode:hover > span:nth-child(9) {
  transform: translate(2px, 0px) rotate(5deg) scale(1);
  opacity: 1;
}
</style>
