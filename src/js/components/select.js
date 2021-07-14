
const selectSetup = () => 
{
  // Select multiple for the trade.
  $(".js-select-two-trade").select2({
      placeholder: "Trade",
      tags: true,
      maximumSelectionLength: 1
  });

  // Select multiple for the states
  $(".js-select-two-state").select2({
    placeholder: "State *",
    tags: true,
    maximumSelectionLength: 1
  });
}

export { selectSetup };