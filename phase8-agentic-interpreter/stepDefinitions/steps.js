const { defineStep } = require("@cucumber/cucumber");

const universalHandler = async function (stepText) {
  await this.agenticExecutor.execute(stepText);
};

defineStep(/^(.*)$/, universalHandler);
