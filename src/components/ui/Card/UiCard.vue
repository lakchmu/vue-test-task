<template>
  <div class="ui-card">
    <div class="ui-card__favorite">
      <slot name="favorite" />
    </div>

    <div class="ui-card__media">
      <slot name="media" />
    </div>

    <div class="ui-card__inner">
      <div class="ui-card__title">
        <slot name="title" />
      </div>
      <slot name="action" />
    </div>
  </div>
</template>

<style src="./UiCard.css" scoped></style>
