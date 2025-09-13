<template>
  <div>
    <section class="safety">
      <div class="safety-counter">
        <h2 class="safety-title">安全生产无事故天数</h2>
        <div class="counter-display">
          <span class="counter-number">1896</span>
          <span class="counter-unit">天</span>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.safety {
  background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 50%, #1e3a5f 100%);
  padding: 60px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
}

.safety-counter {
  text-align: center;
  color: white;
}

.safety-title {
  font-size: 24px;
  font-weight: 400;
  margin: 0 0 30px 0;
  color: rgba(255, 255, 255, 0.9);
  letter-spacing: 2px;
}

.counter-display {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 40px 60px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

.counter-number {
  display: block;
  font-size: 72px;
  font-weight: bold;
  line-height: 1;
  margin-bottom: 10px;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.counter-unit {
  font-size: 18px;
  color: rgba(255, 255, 255, 0.8);
  letter-spacing: 1px;
}
</style>
