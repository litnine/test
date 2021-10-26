<script>
/* eslint-disable prefer-spread */
export default {
  functional: true,
  render(h, ctx) {
    return (
      <div class="loading" {...ctx.data}>
        {Array.apply(null, { length: 8 }).map(() => <span class="loading__spot"></span>)}
      </div>
    );
  },
};
</script>

<style lang="scss" scoped>
.loading {
  position: relative;
  margin: auto;
  width: 2em;
  height: 2em;
  @at-root .loading__spot {
    display: inline-block;
    position: absolute;
    border-radius: 50%;
    width: 20%;
    height: 20%;
    background: #999;
    animation: loading 1.04s ease infinite;
    &:nth-child(1) {
      top: 40%;
      left: 0;
      animation-delay: -1.04s;
    }
    &:nth-child(2) {
      top: 14%;
      left: 14%;
      animation-delay: -0.91s;
    }
    &:nth-child(3) {
      top: 0;
      left: 40%;
      animation-delay: -0.78s;
    }
    &:nth-child(4) {
      top: 14%;
      right: 14%;
      animation-delay: -0.65s;
    }
    &:nth-child(5) {
      top: 40%;
      right: 0;
      animation-delay: -0.52s;
    }
    &:nth-child(6) {
      right: 14%;
      bottom: 14%;
      animation-delay: -0.39s;
    }
    &:nth-child(7) {
      bottom: 0;
      left: 40%;
      animation-delay: -0.26s;
    }
    &:nth-child(8) {
      bottom: 14%;
      left: 14%;
      animation-delay: -0.13s;
    }
  }
}

@keyframes loading {
  0% {
    transform: scale(1.2);
    opacity: 1;
  }
  100% {
    transform: scale(.3);
    opacity: 0.5;
  }
}
</style>
